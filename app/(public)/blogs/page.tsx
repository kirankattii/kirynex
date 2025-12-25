"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Search,
  Zap,
  Clock,
  Calendar,
  ChevronRight,
  User,
  Tag,
  ArrowUpRight,
  Share2,
  Bookmark,
  XCircle
} from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagnaticButton';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { BackgroundBlob } from '@/components/ui/BackgroundBlob';

// --- Utility Components ---
// Using shared FadeIn component from @/components/animations/FadeIn

// --- Data ---
const categories = ["All", "Engineering", "AI & ML", "Design", "Tech News"];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  content: React.ReactNode;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of AI Agents: Beyond Chatbots",
    excerpt: "Why 2025 is the year of autonomous agents. We explore how Large Action Models (LAMs) are shifting the paradigm from 'chatting' to 'doing'.",
    category: "AI & ML",
    author: "Alex Sterling",
    role: "CTO",
    date: "Oct 24, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000",
    tags: ["Artificial Intelligence", "Automation", "Future Tech"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p className="text-xl font-light text-slate-800">
          The era of static chatbots is ending. We are witnessing the birth of "Agentic AI"—systems capable of reasoning, planning, and executing complex tasks across multiple applications without human intervention.
        </p>
        <p>
          Over the past year, we've seen a fundamental shift in how AI systems operate. No longer are they confined to generating text or answering questions. Today's AI agents can navigate web interfaces, manipulate software applications, and complete multi-step workflows autonomously. This isn't science fiction—it's happening right now in production systems.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">From LLMs to LAMs</h3>
        <p>
          While Large Language Models (LLMs) like GPT-4 mastered text generation, Large Action Models (LAMs) are designed to interact with interfaces. They understand UI structures, API calls, and authentication flows. This allows an AI agent to not just tell you how to book a flight, but to actually log in, select the seat, and process the payment.
        </p>
        <p>
          The technical breakthrough here is vision-language-action models. These systems can "see" a screen, understand its structure through computer vision, and then take actions—clicking buttons, filling forms, navigating menus. Companies like Adept AI and Google's Gemini are leading this charge, with models that can control any software application.
        </p>
        <p>
          What makes this particularly powerful is the ability to chain actions across multiple applications. An agent can read an email, extract a task, create a calendar event, set a reminder in Slack, and update a project management tool—all without human intervention. The agent maintains context across these interactions, understanding the relationships between different systems.
        </p>
        <blockquote className="border-l-4 border-brand-yellow pl-6 italic my-8 text-slate-800 bg-slate-50 py-4 pr-4 rounded-r-xl">
          "The friction between intent and action is about to disappear. The interface of the future is intent itself."
        </blockquote>
        <h3 className="text-2xl font-bold text-slate-900">The Enterprise Impact</h3>
        <p>
          For software development, this means building APIs that are "agent-friendly." We are moving away from GUI-first development towards API-first ecosystems where the primary consumer might be a neural network, not a human using a mouse. At Kirynex, we are already re-architecting our internal tools to support this shift.
        </p>
        <p>
          Consider customer support. Instead of training agents on complex internal systems, we can deploy AI agents that understand the full context of a customer's journey. These agents can pull information from CRM systems, check order status, process refunds, and escalate issues—all while maintaining a natural conversation with the customer.
        </p>
        <p>
          In software development, AI agents are already being used for code review, testing, and deployment. They can understand codebases, identify bugs, write tests, and even deploy to staging environments. The key is building systems that are predictable and observable, so these agents can operate safely at scale.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Challenges Ahead</h3>
        <p>
          However, this transition isn't without challenges. Security becomes paramount when AI systems have access to production environments. We need robust authentication, audit trails, and the ability to roll back agent actions. There's also the question of liability—who is responsible when an AI agent makes a mistake?
        </p>
        <p>
          Another challenge is the "uncanny valley" of automation. Users need to understand when they're interacting with an AI agent versus a human. Transparency is crucial. We're seeing companies implement clear indicators and the ability to escalate to human agents when needed.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Looking Forward</h3>
        <p>
          As we move into 2025, we expect to see AI agents become standard in enterprise software. The companies that embrace this shift early will have a significant competitive advantage. The question isn't whether AI agents will replace certain workflows—it's how quickly we can adapt our systems and processes to leverage this new capability.
        </p>
        <p>
          At Kirynex, we're investing heavily in agent infrastructure. We're building tools that make it easier to deploy, monitor, and iterate on AI agents. The future of software isn't just about better interfaces—it's about systems that understand intent and execute autonomously.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Next.js 15: The End of Memoization Headaches?",
    excerpt: "A deep dive into the new caching semantics, the React Compiler, and how the new partial prerendering model changes the game for dynamic apps.",
    category: "Engineering",
    author: "David K.",
    role: "Lead Engineer",
    date: "Oct 20, 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000",
    tags: ["React", "Next.js", "Web Performance"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          The release of Next.js 15 Release Candidate has sparked a massive debate in the frontend community. The biggest change? The caching defaults.
        </p>
        <p>
          After months of anticipation, the Next.js team has released version 15 RC, and it's bringing some fundamental shifts in how the framework handles data fetching, rendering, and performance optimization. Let's dive into what this means for developers.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">Fetch is no longer cached by default</h3>
        <p>
          In Next.js 14, `fetch` requests were cached by default. While performant, this led to confusion. Version 15 flips this: fetch requests are now `no-store` by default. This aligns better with standard web expectations—if you want cache, you must explicitly opt-in.
        </p>
        <p>
          This change addresses a common pain point. Many developers were surprised when their API calls weren't reflecting the latest data. The new default makes Next.js behavior more predictable and aligns with how developers expect HTTP requests to work. If you need caching, you can still use <code>{'{ cache: \'force-cache\' }'}</code> or leverage the new <code>unstable_cache</code> API for more granular control.
        </p>
        <p>
          For existing applications, this means you'll need to audit your data fetching. We recommend starting with a search for all `fetch` calls and determining which ones actually benefit from caching. Static data like blog posts? Cache it. User-specific data? Probably not.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">React Compiler Support</h3>
        <p>
          Perhaps the most exciting addition is official support for the React Compiler. No more `useMemo` or `useCallback` spam. The compiler automatically memoizes values and functions, reducing re-renders without manual overhead. We tested this on our dashboard component and saw a 40% reduction in code volume.
        </p>
        <p>
          The React Compiler uses static analysis to understand your component dependencies and automatically optimizes re-renders. This means you can write more natural React code without worrying about performance optimization. The compiler handles it for you.
        </p>
        <p>
          In our testing, we found that the compiler is particularly effective for complex components with many props and state updates. Components that previously required careful memoization now perform well with zero optimization code. This is a game-changer for developer experience.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Partial Prerendering (PPR)</h3>
        <p>
          Next.js 15 introduces Partial Prerendering, which allows you to prerender static parts of a page while keeping dynamic parts server-rendered. This gives you the best of both worlds: instant static content with fresh dynamic data.
        </p>
        <p>
          PPR works by identifying static and dynamic boundaries in your components. Static parts are prerendered at build time, while dynamic parts are rendered on-demand. This can dramatically improve Time to First Byte (TTFB) while maintaining the freshness of dynamic content.
        </p>
        <p>
          To use PPR, you'll need to mark dynamic boundaries using `unstable_noStore()` or the new `dynamic` API. The framework then automatically handles the rendering strategy. We've seen TTFB improvements of 200-300ms in our applications.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Improved TypeScript Support</h3>
        <p>
          Next.js 15 comes with significantly improved TypeScript support, including better type inference for route handlers, improved error messages, and better integration with TypeScript 5.5+. The development experience is noticeably smoother.
        </p>
        <p>
          Route handlers now have better type safety, with automatic inference of request and response types. This reduces the need for manual type annotations and catches errors earlier in development.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Migration Considerations</h3>
        <p>
          If you're planning to upgrade, here are the key things to watch out for:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li><strong>Data Fetching:</strong> Review all fetch calls and add explicit caching where needed</li>
          <li><strong>React Compiler:</strong> Test thoroughly—while it's generally safe, some edge cases may need attention</li>
          <li><strong>TypeScript:</strong> Update to TypeScript 5.5+ for the best experience</li>
          <li><strong>Dependencies:</strong> Some packages may need updates to work with React 19</li>
        </ul>
        <p>
          Overall, Next.js 15 represents a significant step forward in developer experience and performance. The changes, while breaking in some areas, make the framework more predictable and easier to work with. We're excited to see how the community adopts these new features.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: "Rust for Web: Is it finally time to switch?",
    excerpt: "We rewrote our core image processing microservice in Rust. Here are the benchmarks, the pain points, and why we aren't going back to Node.js for heavy compute.",
    category: "Engineering",
    author: "Sarah M.",
    role: "Backend Architect",
    date: "Oct 15, 2024",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=2000",
    tags: ["Rust", "Backend", "Performance"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          Node.js is fantastic for I/O bound tasks, but when it comes to CPU-intensive operations like image manipulation or complex data transformation, the V8 engine hits a ceiling.
        </p>
        <p>
          After years of building microservices in Node.js, we hit a wall. Our image processing service was struggling under load, consuming excessive memory, and becoming a bottleneck. That's when we decided to experiment with Rust—and the results were eye-opening.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">The Benchmark</h3>
        <p>
          We took a service that resizes and compresses user uploads. In Node.js (using Sharp), processing 100 images took ~4.2 seconds. In Rust, using the `image` crate, the same task took 0.8 seconds. That is a 5x improvement.
        </p>
        <p>
          But performance wasn't the only win. Under load, the Node.js service would consume 2-3GB of RAM and occasionally crash. The Rust service uses around 150MB of RAM consistently, even under heavy load. This translates to significant cost savings in cloud infrastructure.
        </p>
        <p>
          We also tested JSON parsing and transformation. For a service that processes large JSON payloads (10MB+), Rust was 8x faster. The difference becomes even more pronounced with larger datasets.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Memory Safety</h3>
        <p>
          One of Rust's biggest selling points is memory safety without garbage collection. In our Node.js services, we'd occasionally see memory leaks that were hard to track down. With Rust, the borrow checker prevents entire classes of bugs at compile time.
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
            <li><strong>Memory Safety:</strong> Zero runtime crashes due to null pointers. The compiler catches these issues before they reach production.</li>
            <li><strong>Binary Size:</strong> Our docker container shrank from 400MB to 25MB. This means faster deployments and lower storage costs.</li>
            <li><strong>Developer Experience:</strong> The borrow checker is tough, but it forces you to write better code. Once you understand ownership, your code becomes more maintainable.</li>
            <li><strong>Concurrency:</strong> Rust's ownership model makes it safe to write concurrent code. No more race conditions or deadlocks.</li>
        </ul>
        <h3 className="text-2xl font-bold text-slate-900">The Learning Curve</h3>
        <p>
          Let's be honest: Rust has a steep learning curve. The borrow checker can be frustrating at first. Concepts like ownership, borrowing, and lifetimes are unlike anything in JavaScript. But once you get past the initial hump, Rust becomes incredibly powerful.
        </p>
        <p>
          We found that developers with systems programming experience (C, C++, Go) picked up Rust faster than pure JavaScript developers. However, even our JavaScript-focused team members were productive within 2-3 weeks of focused learning.
        </p>
        <p>
          The Rust ecosystem is also growing rapidly. Libraries like `tokio` for async runtime, `serde` for serialization, and `reqwest` for HTTP clients are mature and well-maintained. You're not writing everything from scratch.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">When to Use Rust</h3>
        <p>
          Rust isn't a replacement for Node.js in all scenarios. Here's when we recommend considering Rust:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li><strong>CPU-intensive tasks:</strong> Image processing, video encoding, data transformation</li>
          <li><strong>High-throughput services:</strong> When you need to handle thousands of requests per second</li>
          <li><strong>Resource-constrained environments:</strong> Edge computing, IoT devices, embedded systems</li>
          <li><strong>Critical infrastructure:</strong> Services where reliability and performance are paramount</li>
        </ul>
        <p>
          For typical CRUD APIs, Node.js is still the better choice. The developer experience is better, the ecosystem is larger, and the development speed is faster. Use the right tool for the job.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Our Architecture</h3>
        <p>
          We're using a hybrid approach. Our main API remains in Node.js (Next.js), but we've moved CPU-intensive services to Rust. These Rust services are exposed as HTTP APIs or gRPC services, making them easy to integrate with our existing infrastructure.
        </p>
        <p>
          We're also using WebAssembly (WASM) to run Rust code in the browser for client-side image processing. This gives us the performance of Rust with the portability of JavaScript.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Verdict</h3>
        <p>
          For our use case, Rust was absolutely worth it. The performance gains, memory efficiency, and reliability improvements justify the learning curve. We're not rewriting everything in Rust, but we're strategically using it where it makes sense.
        </p>
        <p>
          If you're hitting performance bottlenecks with Node.js, especially around CPU-intensive tasks, Rust is worth exploring. Start with a small service, measure the results, and expand from there. The investment in learning Rust pays dividends in performance and reliability.
        </p>
      </div>
    )
  },
  {
    id: 4,
    title: "The Psychology of 'Skeleton' Loading Screens",
    excerpt: "Perceived performance is just as important as actual performance. Why skeletons beat spinners, and how to design them correctly.",
    category: "Design",
    author: "Elena R.",
    role: "Head of Design",
    date: "Oct 08, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
    tags: ["UX", "Psychology", "Frontend"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          When a user clicks a button, they expect immediate feedback. If the data takes 2 seconds to load, how you fill that 2-second gap determines if the app feels "fast" or "broken".
        </p>
        <p>
          Perceived performance is a critical aspect of user experience that's often overlooked. While actual performance metrics matter, what users feel matters more. A well-designed loading state can make a 3-second load feel instant, while a poor one can make 500ms feel like an eternity.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">Spinners vs. Skeletons</h3>
        <p>
          Spinners draw attention to the wait time. They say "I am working, please wait." Skeleton screens, however, mimic the layout of the content that is about to appear. They say "Here is the structure, the details are filling in." Studies show this reduces perceived wait time by up to 20%.
        </p>
        <p>
          The key difference is context. A spinner is generic—it could mean anything. A skeleton screen provides context by showing the structure of what's coming. Users can mentally prepare for the content, reducing cognitive load when it finally arrives.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Science Behind Skeletons</h3>
        <p>
          Research from Google and Facebook has shown that skeleton screens improve perceived performance. The human brain processes visual information faster than text, so showing a layout structure gives users something to process while data loads.
        </p>
        <p>
          Skeleton screens also reduce layout shift. When content loads, it appears in the same place as the skeleton, creating a smooth transition. This is especially important for Core Web Vitals, particularly Cumulative Layout Shift (CLS).
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Designing Effective Skeletons</h3>
        <p>
          Not all skeleton screens are created equal. Here are the principles we follow:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li><strong>Match the Layout:</strong> The skeleton should closely match the actual content layout</li>
          <li><strong>Use Subtle Animation:</strong> A gentle pulse or shimmer indicates loading without being distracting</li>
          <li><strong>Show Hierarchy:</strong> Use different shades or sizes to indicate content importance</li>
          <li><strong>Keep it Simple:</strong> Don't try to show every detail—just the structure</li>
        </ul>
        <p>
          We use a subtle gradient animation that pulses from left to right. This creates movement that indicates activity without being jarring. The animation should be smooth and not compete with the actual content for attention.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">When to Use Each Pattern</h3>
        <p>
          <strong>Use skeletons when:</strong> You know the layout structure, content is coming soon (under 3 seconds), and you want to reduce perceived wait time.
        </p>
        <p>
          <strong>Use spinners when:</strong> The operation is quick (under 1 second), the layout is unknown, or you're showing progress for a specific action.
        </p>
        <p>
          <strong>Use progress bars when:</strong> You can track progress (file uploads, data processing), the operation takes longer than 3 seconds, and users need to know how much is left.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Implementation Best Practices</h3>
        <p>
          In React, we create skeleton components that mirror our actual components. This ensures the skeleton matches the final layout exactly. We use CSS animations for the shimmer effect, keeping it performant and accessible.
        </p>
        <p>
          We also implement progressive loading. Show the skeleton immediately, then load critical content first, followed by secondary content. This creates a sense of progress and keeps users engaged.
        </p>
        <p>
          Accessibility is crucial. Skeleton screens should have proper ARIA labels indicating loading state. Screen readers should announce "Loading content" rather than reading skeleton placeholders.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Measuring Success</h3>
        <p>
          We track several metrics to measure the impact of skeleton screens:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li>Time to Interactive (TTI) - when users can actually interact</li>
          <li>Perceived Load Time - user-reported wait time</li>
          <li>Bounce Rate - users leaving during load</li>
          <li>Engagement - interactions during loading</li>
        </ul>
        <p>
          After implementing skeleton screens across our application, we saw a 15% reduction in bounce rate and a 25% improvement in perceived load time. Users reported feeling that the app was faster, even though actual load times remained the same.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Bottom Line</h3>
        <p>
          Loading states are not just placeholders—they're an opportunity to communicate with users and manage expectations. Well-designed skeleton screens can transform a frustrating wait into a smooth, anticipatory experience. The investment in proper loading states pays off in user satisfaction and engagement.
        </p>
      </div>
    )
  },
  {
    id: 5,
    title: "Apple Vision Pro: 6 Months Later",
    excerpt: "Is spatial computing the future of dev work? Our honest review of coding in AR, and why the keyboard isn't going away anytime soon.",
    category: "Tech News",
    author: "Alex Sterling",
    role: "Founder",
    date: "Sep 28, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1621418726588-466034f5979b?auto=format&fit=crop&q=80&w=2000",
    tags: ["AR/VR", "Hardware", "Productivity"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          We bought three Vision Pros for the team to test "Spatial Computing" workflows. The screen fidelity is incredible—text is crisp enough to code on for hours.
        </p>
        <p>
          Six months ago, Apple released the Vision Pro to much fanfare. As a development team always exploring new tools, we invested in three units to see if spatial computing could actually improve our workflow. Here's our honest, unfiltered review after half a year of daily use.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">The Setup Experience</h3>
        <p>
          Setting up the Vision Pro is surprisingly intuitive. The eye tracking and hand gesture recognition work remarkably well out of the box. Within 10 minutes, we were navigating the interface naturally. The passthrough quality is good enough that you can see your keyboard and desk clearly, which is essential for development work.
        </p>
        <p>
          However, the initial setup process is lengthy. Face scanning, eye calibration, and spatial mapping take about 20 minutes. It's a one-time thing, but worth noting for teams considering bulk deployments.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Coding in Spatial Computing</h3>
        <p>
          This is where the Vision Pro truly shines. Having multiple virtual monitors floating in space is game-changing. We set up our typical workflow: one massive screen for our code editor, another for terminal output, a third for documentation, and a fourth for browser preview.
        </p>
        <p>
          The text clarity is exceptional. We can read code comfortably even at smaller font sizes. The ability to position windows anywhere in 3D space means we can create optimal layouts that wouldn't be possible with physical monitors. Need more vertical space? Just make the window taller. Want to see multiple files side-by-side? Arrange them in a circle around you.
        </p>
        <p>
          The isolation is also powerful. With the headset on, distractions fade away. No notifications from other apps, no colleagues walking by your desk. It's like having a private office wherever you are.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Verdict</h3>
        <p>
          It's great for deep work. Having a 100-inch virtual monitor for your terminal, another for documentation, and a third for previewing is powerful. However, the weight is still an issue. After 2 hours, you feel it.
        </p>
        <p>
          The comfort factor is the biggest limitation. At 650 grams, the Vision Pro is heavy. Even with the dual-loop band, extended sessions become uncomfortable. We've found that 2-3 hour sessions are the sweet spot. Beyond that, neck strain becomes noticeable.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Battery Life and Portability</h3>
        <p>
          The external battery pack is both a blessing and a curse. It's nice not having the weight on your head, but the cable is always in the way. The 2-hour battery life means you need to be near an outlet for extended work sessions.
        </p>
        <p>
          For remote work, this is actually fine. Most of us work from home offices with power nearby. But for coffee shop coding or travel, the battery limitation is real. We've invested in multiple battery packs for longer sessions.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Software Ecosystem</h3>
        <p>
          The app ecosystem is still growing. Native Vision Pro apps are limited, but the ability to run iPad apps helps. For development, we're mostly using web-based tools and remote desktop connections to our development machines.
        </p>
        <p>
          Code editors like VS Code work well through Safari or remote desktop, but native apps would be better. We're eagerly waiting for more development tools to be optimized for spatial computing.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Collaboration Challenges</h3>
        <p>
          One unexpected challenge: collaboration. When wearing the Vision Pro, you're isolated from your team. Screen sharing is possible but awkward. Pair programming becomes difficult when one person is in VR and the other isn't.
        </p>
        <p>
          We've found it works best for individual deep work sessions rather than collaborative coding. For team meetings or pair programming, we still use traditional setups.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Cost-Benefit Analysis</h3>
        <p>
          At $3,500 per unit, the Vision Pro is expensive. Is it worth it? For our team, yes—but with caveats. The productivity gains during focused coding sessions are real. The ability to work from anywhere with a massive virtual workspace is valuable.
        </p>
        <p>
          However, it's not a replacement for traditional monitors. We still use physical displays for most work. The Vision Pro is a specialized tool for specific use cases: deep coding sessions, design reviews, and immersive presentations.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Looking Forward</h3>
        <p>
          The Vision Pro is clearly a first-generation product. The technology is impressive, but the form factor needs refinement. We're excited to see what future iterations bring—lighter weight, longer battery life, better comfort.
        </p>
        <p>
          For now, we're keeping our Vision Pros. They've become part of our workflow for specific tasks. But we're not all-in on spatial computing yet. The keyboard isn't going away, and neither are traditional monitors. The Vision Pro is a powerful addition to our toolkit, not a replacement.
        </p>
        <p>
          If you're considering the Vision Pro for development work, our advice: try it first if possible. The experience is highly personal. Some team members love it, others prefer traditional setups. But if you do get one, give it time. The workflow takes a few weeks to fully adapt to.
        </p>
      </div>
    )
  },
  {
    id: 6,
    title: "Why we killed the daily standup",
    excerpt: "Asynchronous communication is the future of remote work. Here is the framework that replaced our meetings and boosted productivity by 30%.",
    category: "Culture",
    author: "Sarah M.",
    role: "VP of Product",
    date: "Sep 15, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000",
    tags: ["Remote Work", "Productivity", "Management"],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          The daily standup was designed for collocated teams in the 90s. For a distributed global team, it's a productivity killer. It breaks flow state and often devolves into status reporting rather than problem-solving.
        </p>
        <p>
          After years of struggling with timezone conflicts, meeting fatigue, and the constant interruption of deep work, we decided to experiment with asynchronous communication. The results have been transformative.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-8">The Problem with Traditional Standups</h3>
        <p>
          Traditional daily standups have several fundamental flaws for distributed teams:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li><strong>Time Zone Conflicts:</strong> Finding a time that works for a global team means someone is always at an inconvenient hour</li>
          <li><strong>Context Switching:</strong> Interrupting deep work for a 15-minute meeting can cost hours of productivity</li>
          <li><strong>Status Theater:</strong> Meetings often become performative rather than productive</li>
          <li><strong>No Written Record:</strong> Important information shared verbally gets lost</li>
          <li><strong>One-Size-Fits-All:</strong> Not everyone needs the same level of sync</li>
        </ul>
        <p>
          We found that our engineers were spending more time preparing for standups than actually solving problems. The meeting itself became a source of stress rather than a tool for alignment.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Async Check-in</h3>
        <p>
          We replaced the 15-minute Zoom call with a Slack workflow. At 9 AM local time, a bot asks three questions: What did you ship? What are you shipping today? Are you blocked?
        </p>
        <p>
          This allows engineers to update us when they are ready, providing a written record of progress without interrupting their deep work cycles.
        </p>
        <p>
          The key innovation is local time. Each team member gets the prompt at 9 AM their time, not a shared global time. This respects individual schedules and work patterns. Early birds can respond at 6 AM, night owls at 11 AM—it doesn't matter, as long as it's within their workday.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Three Questions</h3>
        <p>
          We've refined our questions over time. The current version focuses on outcomes, not activities:
        </p>
        <ol className="list-decimal pl-6 space-y-3 marker:text-brand-blue">
          <li><strong>What did you ship?</strong> - Focus on completed work, not work in progress. This creates a sense of accomplishment and makes progress visible.</li>
          <li><strong>What are you shipping today?</strong> - Clear intent for the day. Helps with planning and sets expectations.</li>
          <li><strong>Are you blocked?</strong> - Simple yes/no with optional details. If yes, the bot automatically creates a thread for discussion.</li>
        </ol>
        <p>
          We found that limiting to three questions keeps responses concise and actionable. Longer check-ins become status reports that nobody reads.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Workflow</h3>
        <p>
          Here's how it works in practice:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li>Bot sends personalized prompt at 9 AM local time</li>
          <li>Engineer responds when convenient (usually within 2 hours)</li>
          <li>Responses are automatically formatted and posted to a dedicated channel</li>
          <li>If someone is blocked, a thread is created for async discussion</li>
          <li>Team leads review responses and follow up asynchronously</li>
        </ul>
        <p>
          The entire process takes engineers about 2 minutes, compared to 15 minutes for a traditional standup (including prep time and context switching).
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Results and Metrics</h3>
        <p>
          After six months of async standups, we've seen significant improvements:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li><strong>30% increase in productivity:</strong> Engineers report more time for deep work</li>
          <li><strong>Better documentation:</strong> Written updates create a searchable record of progress</li>
          <li><strong>Improved timezone equity:</strong> No one is forced to attend meetings at odd hours</li>
          <li><strong>Higher engagement:</strong> 95% response rate vs. 70% attendance in traditional standups</li>
          <li><strong>Faster unblocking:</strong> Blockers are identified and resolved faster through async threads</li>
        </ul>
        <h3 className="text-2xl font-bold text-slate-900">When We Still Meet</h3>
        <p>
          We haven't eliminated all meetings. We still have:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li><strong>Weekly team sync:</strong> One hour for deeper discussion and planning</li>
          <li><strong>Ad-hoc problem-solving:</strong> When async communication isn't sufficient</li>
          <li><strong>Retrospectives:</strong> Monthly reflection and improvement sessions</li>
          <li><strong>Social time:</strong> Optional coffee chats and team building</li>
        </ul>
        <p>
          The key is making meetings intentional and valuable, not routine and mandatory.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Challenges and Solutions</h3>
        <p>
          The transition wasn't without challenges. Some team members missed the social aspect of standups. We addressed this with optional weekly coffee chats and a dedicated "water cooler" channel for casual conversation.
        </p>
        <p>
          Others worried about losing visibility. We solved this with better tooling—a dashboard that aggregates all check-ins and highlights blockers. Team leads can see the full picture at a glance.
        </p>
        <p>
          There was also concern about accountability. Would people actually respond? We found that written check-ins actually increase accountability. Responses are permanent and searchable, creating natural pressure to be honest and complete.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">Tools and Implementation</h3>
        <p>
          We built our async standup system using Slack workflows and a simple bot. The bot:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
          <li>Sends personalized prompts based on timezone</li>
          <li>Formats responses consistently</li>
          <li>Creates threads for blockers</li>
          <li>Generates weekly summaries</li>
          <li>Integrates with our project management tools</li>
        </ul>
        <p>
          The entire system cost us about 40 hours of development time and has saved hundreds of hours in meeting time.
        </p>
        <h3 className="text-2xl font-bold text-slate-900">The Future of Team Communication</h3>
        <p>
          We believe async-first communication is the future for distributed teams. As tools improve and teams become more global, the traditional meeting model becomes increasingly impractical.
        </p>
        <p>
          This doesn't mean eliminating all synchronous communication. It means making it intentional and valuable. Meetings should be for collaboration and problem-solving, not status updates.
        </p>
        <p>
          If you're considering making the switch, start small. Try async standups for one team, measure the results, and iterate. The key is finding what works for your specific team and culture. For us, async standups have been a game-changer.
        </p>
      </div>
    )
  }
];

// --- Main Application Component ---

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Handle Scroll for navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle Body Lock when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPost]);

  const filteredPosts = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="bg-slate-50 text-brand-dark selection:bg-brand-yellow selection:text-brand-dark overflow-x-hidden">

      {/* --- Article Modal --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedPost(null)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full md:w-[90%] lg:w-[1000px] h-[95vh] md:h-[90vh] bg-white md:rounded-[2rem] rounded-t-[1.5rem] sm:rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
            
            {/* Modal Header Actions */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-start z-20 pointer-events-none">
              <span className="pointer-events-auto bg-white/90 backdrop-blur text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-widest shadow-sm">
                {selectedPost.category}
              </span>
              <button 
                onClick={() => setSelectedPost(null)}
                className="pointer-events-auto bg-white/90 backdrop-blur p-1.5 sm:p-2 rounded-full hover:bg-slate-100 transition-colors shadow-sm text-slate-900"
              >
                <XCircle size={24} className="sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Scrollable Area */}
            <div className="overflow-y-auto h-full custom-scrollbar">
              {/* Cover Image */}
              <div className="h-[35vh] sm:h-[40vh] md:h-[50vh] w-full relative">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              {/* Content Body */}
              <div className="px-4 sm:px-6 md:px-12 lg:px-20 pb-12 sm:pb-20 -mt-16 sm:-mt-20 relative z-10">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-slate-100 mb-6 sm:mb-8">
                     <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-brand-blue uppercase tracking-widest mb-4 sm:mb-6 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar size={12} className="sm:w-[14px] sm:h-[14px]" /> {selectedPost.date}</span>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1"><Clock size={12} className="sm:w-[14px] sm:h-[14px]" /> {selectedPost.readTime}</span>
                     </div>
                     <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 sm:mb-8 leading-tight">
                       {selectedPost.title}
                     </h1>
                     <div className="flex items-center justify-between border-t border-slate-100 pt-4 sm:pt-6 gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-base sm:text-lg">
                             {selectedPost.author.charAt(0)}
                           </div>
                           <div>
                             <p className="font-bold text-slate-900 text-sm sm:text-base">{selectedPost.author}</p>
                             <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">{selectedPost.role}</p>
                           </div>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <button className="p-1.5 sm:p-2 text-slate-400 hover:text-brand-blue transition-colors cursor-pointer"><Share2 size={18} className="sm:w-5 sm:h-5" /></button>
                          <button className="p-1.5 sm:p-2 text-slate-400 hover:text-brand-blue transition-colors cursor-pointer"><Bookmark size={18} className="sm:w-5 sm:h-5" /></button>
                        </div>
                     </div>
                  </div>

                  {/* The Actual Text Content */}
                  <div className="prose prose-sm sm:prose-base md:prose-lg prose-slate max-w-none">
                    {selectedPost.content}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
                    <h4 className="text-xs sm:text-sm font-bold uppercase text-slate-400 mb-3 sm:mb-4">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map(tag => (
                        <span key={tag} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-brand-blue hover:text-white transition-colors cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-20 px-6 overflow-hidden">
        {/* Decorative BG Elements */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-transparent pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} className="fill-current" />
              <span>Tech Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-8 leading-[0.9] text-brand-dark">
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-yellow">
                SIGNAL.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
             <div className="flex flex-col md:flex-row justify-between items-end border-b border-brand-dark/10 pb-12">
               <p className="text-xl md:text-2xl font-light text-slate-500 max-w-2xl leading-relaxed">
                 Deep dives into software architecture, AI agents, and the future of digital product design.
               </p>
               <div className="mt-8 md:mt-0 relative w-full md:w-auto group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors" size={20} />
                 <input
                   type="text"
                   placeholder="Search articles..."
                   className="w-full md:w-80 bg-white border border-slate-200 rounded-full pl-12 pr-6 py-4 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                 />
               </div>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Featured Post (Using First Item in Data) --- */}
      <section className="px-4 sm:px-6 mb-16 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={300}>
            <div 
              onClick={() => setSelectedPost(BLOG_POSTS[0])}
              className="group relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-[4/3] md:aspect-[21/9] shadow-2xl cursor-pointer ring-1 ring-slate-900/5"
            >
               <img
                 src={BLOG_POSTS[0].image}
                 alt="Featured"
                 className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
              
               <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 lg:p-16 w-full md:w-3/4">
                 <div className="flex items-center gap-2 sm:gap-4 mb-4 md:mb-6 flex-wrap">
                   <span className="bg-brand-yellow text-brand-dark px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-yellow-500/20">
                     Featured
                   </span>
                   <span className="text-white/80 text-xs sm:text-sm font-medium flex items-center gap-2 bg-black/20 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full">
                     <Clock size={12} className="sm:w-[14px] sm:h-[14px]" /> {BLOG_POSTS[0].readTime}
                   </span>
                 </div>
                
                 <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight group-hover:underline decoration-brand-yellow underline-offset-8 transition-all">
                   {BLOG_POSTS[0].title}
                 </h2>
                
                 <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center font-bold text-brand-dark text-base sm:text-lg">
                      {BLOG_POSTS[0].author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-base sm:text-lg">{BLOG_POSTS[0].author}</p>
                      <p className="text-white/60 text-xs sm:text-sm">{BLOG_POSTS[0].role}</p>
                    </div>
                 </div>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Filter & Grid --- */}
      <section className="pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <FadeIn className="mb-8 md:mb-12 overflow-x-auto pb-4 hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat
                      ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-slate-900/20'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredPosts.slice(1).map((post, i) => ( // Skip first post as it's featured
              <FadeIn key={post.id} delay={i * 100}>
                <article 
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-[1rem] sm:rounded-[1.5rem] aspect-[16/10] mb-4 sm:mb-6 shadow-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                       <span className="bg-white/90 backdrop-blur-md text-brand-dark px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-sm">
                         {post.category}
                       </span>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg text-brand-blue">
                       <ArrowUpRight size={16} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col px-1 sm:px-2 pb-2">
                    <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 flex-wrap">
                      <span className="flex items-center gap-1"><Calendar size={10} className="sm:w-3 sm:h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} className="sm:w-3 sm:h-3" /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-50">
                       <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-600">
                          {post.author.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] sm:text-xs font-bold text-slate-900">{post.author}</span>
                           <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase">{post.role}</span>
                        </div>
                       </div>
                       <div className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">
                          <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                       </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12 md:mt-20 text-center px-4">
            <button className="px-6 sm:px-10 py-3 sm:py-4 rounded-full border border-slate-200 font-bold text-sm sm:text-base text-slate-600 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all flex items-center gap-2 mx-auto cursor-pointer">
              Load More Articles <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Newsletter CTA */}
      <FadeIn delay={400}>
                 <div className="mx-4 sm:mx-6 md:m-10 my-6 md:my-10 bg-brand-dark rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-24 text-center relative overflow-hidden group">
                     <BackgroundBlob color="blue" position="top-right" size="lg" opacity={0.2} />
                     <div className="relative z-10 max-w-2xl mx-auto">
                         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">Stay ahead of the curve.</h2>
                         <p className="text-base sm:text-lg text-white/60 mb-6 sm:mb-8 md:mb-10">
                             Join 10,000+ founders and engineers receiving our bi-weekly deep dives into software excellence.
                         </p>
                         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                             <input
                               type="email"
                               placeholder="Enter your email"
                               className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-glass-white-10 border border-glass-white-20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-blue focus:bg-glass-white-20 transition-all text-sm sm:text-base"
                             />
                             <MagneticButton className="bg-brand-yellow text-brand-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white transition-colors text-sm sm:text-base">
                                 Subscribe
                             </MagneticButton>
                         </div>
                         <p className="text-xs text-white/30 mt-4 sm:mt-6">No spam. Unsubscribe anytime.</p>
                     </div>
                 </div>
             </FadeIn>

    </div>
  );
}