import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API) {
      console.error('GEMINI_API environment variable is not set');
      return NextResponse.json(
        { error: 'AI service configuration missing', details: 'GEMINI_API must be set in environment variables' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid request', details: 'Prompt is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API.trim());
    
    // Try gemini-2.5-flash first, fallback to gemini-1.5-flash if unavailable
    const modelNames = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

    // Create a structured prompt for project analysis
    const systemPrompt = `You are an expert software architect and project consultant. Analyze the following software project concept and provide a detailed technical analysis in JSON format.

Project Concept: "${prompt}"

Please provide your analysis in the following JSON structure (be precise and realistic):
{
  "techStack": ["Technology1", "Technology2", "Technology3", "Technology4"],
  "complexity": {
    "score": 8.5,
    "level": "High|Medium|Low",
    "description": "Brief explanation of complexity"
  },
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4"
  ],
  "timeline": {
    "weeks": 12,
    "phases": [
      {
        "title": "Discovery",
        "weeks": "Wk 1-2",
        "status": "Planning"
      },
      {
        "title": "MVP Dev",
        "weeks": "Wk 3-8",
        "status": "Development"
      },
      {
        "title": "QA & Testing",
        "weeks": "Wk 9-10",
        "status": "Refinement"
      },
      {
        "title": "Launch",
        "weeks": "Wk 11-12",
        "status": "Deployment"
      }
    ]
  }
}

Important:
- techStack: Provide 4 relevant technologies (frameworks, languages, databases, etc.)
- complexity.score: A number between 1-10
- complexity.level: "High", "Medium", or "Low"
- features: Provide 4 core features/requirements
- timeline.weeks: Total estimated weeks
- timeline.phases: Exactly 4 phases with proper week ranges
- Return ONLY valid JSON, no markdown, no code blocks, no explanations`;

    console.log('Calling Gemini API for project analysis...');
    console.log('Using model:', modelNames[0]);

    let result;
    let response;
    let text;
    
    // Try the primary model first, with fallback to alternatives
    let lastError;
    for (const modelName of modelNames) {
      try {
        const currentModel = genAI.getGenerativeModel({ model: modelName });
        console.log(`Attempting to use model: ${modelName}`);
        result = await currentModel.generateContent(systemPrompt);
        response = await result.response;
        text = response.text();
        console.log(`Successfully used model: ${modelName}`);
        break; // Success, exit loop
      } catch (modelError: any) {
        console.warn(`Model ${modelName} failed:`, modelError.message);
        lastError = modelError;
        // Continue to next model
      }
    }
    
    // If all models failed, throw the last error
    if (!text) {
      throw lastError || new Error('All model attempts failed');
    }

    // Extract JSON from response (handle cases where Gemini wraps it in markdown)
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse the JSON response
    let analysis;
    try {
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', jsonText);
      // Fallback: try to extract JSON object from text
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON response from AI');
      }
    }

    // Validate and structure the response
    const structuredResponse = {
      techStack: Array.isArray(analysis.techStack) && analysis.techStack.length > 0
        ? analysis.techStack.slice(0, 4)
        : ['React.js', 'Node.js', 'PostgreSQL', 'AWS'],
      complexity: {
        score: typeof analysis.complexity?.score === 'number' 
          ? Math.min(10, Math.max(1, analysis.complexity.score))
          : 7.5,
        level: analysis.complexity?.level || 'Medium',
        description: analysis.complexity?.description || 'Standard complexity project'
      },
      features: Array.isArray(analysis.features) && analysis.features.length > 0
        ? analysis.features.slice(0, 4)
        : ['User Authentication', 'Database Integration', 'API Development', 'Deployment Setup'],
      timeline: {
        weeks: typeof analysis.timeline?.weeks === 'number' ? analysis.timeline.weeks : 12,
        phases: Array.isArray(analysis.timeline?.phases) && analysis.timeline.phases.length === 4
          ? analysis.timeline.phases
          : [
              { title: 'Discovery', weeks: 'Wk 1-2', status: 'Planning' },
              { title: 'MVP Dev', weeks: 'Wk 3-8', status: 'Development' },
              { title: 'QA & Testing', weeks: 'Wk 9-10', status: 'Refinement' },
              { title: 'Launch', weeks: 'Wk 11-12', status: 'Deployment' }
            ]
      }
    };

    console.log('Gemini API success:', { prompt: prompt.substring(0, 50) + '...' });

    return NextResponse.json(
      { success: true, data: structuredResponse },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    // Handle specific Gemini API errors
    let errorMessage = 'Failed to generate analysis';
    let details = error.message || 'Unknown error';
    
    if (error.message?.includes('API_KEY')) {
      errorMessage = 'Invalid API key';
      details = 'GEMINI_API key is invalid or expired';
    } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded';
      details = 'API quota exceeded. Please try again later';
    } else if (error.message?.includes('safety')) {
      errorMessage = 'Content blocked';
      details = 'The prompt was blocked by safety filters';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: details,
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

