export type Job = {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
};

export const JOBS: Job[] = [
  {
    id: 1,
    slug: "business-development-executive-it-services",
    title: "Business Development Executive (IT Services)",
    department: "Sales",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Generate and close new business opportunities for web development, app development, and software services. Lead generation and client conversion, pitch IT services and solutions, and coordinate with technical teams.",
    requirements: [
      "Lead generation and client conversion",
      "Pitch IT services and solutions",
      "Coordinate with technical teams",
      "Strong communication and negotiation skills",
      "Experience in IT services sales preferred"
    ]
  },
  {
    id: 2,
    slug: "it-sales-executive-web-app-development",
    title: "IT Sales Executive – Web & App Development",
    department: "Sales",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Sell web and mobile application development services to startups and businesses. Handle outbound and inbound sales activities, understand client needs, and close deals.",
    requirements: [
      "Outbound and inbound sales activities",
      "Understand client needs and close deals",
      "Experience in web and app development sales",
      "Excellent presentation and communication skills"
    ]
  },
  {
    id: 3,
    slug: "client-acquisition-executive",
    title: "Client Acquisition Executive",
    department: "Sales",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Bring new clients and confirmed projects through calls, emails, and online channels. Focus on lead qualification, follow-ups, and converting inquiries into projects.",
    requirements: [
      "Lead qualification and follow-ups",
      "Convert inquiries into projects",
      "Proficiency in cold calling and email outreach",
      "Strong persistence and follow-up skills"
    ]
  },
  {
    id: 4,
    slug: "online-bidding-executive-upwork-freelancer-fiverr",
    title: "Online Bidding Executive (Upwork / Freelancer / Fiverr)",
    department: "Sales",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Acquire international projects by bidding on freelancing platforms. Write compelling proposals, communicate with clients, and close web and software projects.",
    requirements: [
      "Proposal writing and client communication",
      "Close web and software projects",
      "Experience with Upwork, Freelancer, or Fiverr",
      "Excellent written communication skills"
    ]
  },
  {
    id: 5,
    slug: "digital-marketing-executive-lead-generation",
    title: "Digital Marketing Executive – Lead Generation",
    department: "Marketing",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Generate inbound leads for software development services using digital channels. Create and manage lead generation campaigns and improve conversion rates.",
    requirements: [
      "Lead generation campaigns",
      "Improve conversion rates",
      "Experience with digital marketing tools",
      "Knowledge of SEO, SEM, and social media marketing"
    ]
  },
  {
    id: 6,
    slug: "linkedin-lead-generation-specialist",
    title: "LinkedIn Lead Generation Specialist",
    department: "Sales",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Reach founders and decision-makers via LinkedIn to secure software projects. Conduct LinkedIn outreach, follow-ups, and book meetings for the sales team.",
    requirements: [
      "LinkedIn outreach and follow-ups",
      "Book meetings for sales team",
      "Strong LinkedIn networking skills",
      "Experience with LinkedIn Sales Navigator preferred"
    ]
  },
  {
    id: 7,
    slug: "partnership-alliances-executive",
    title: "Partnership & Alliances Executive",
    department: "Business Development",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Build partnerships and referral networks to bring consistent projects. Identify and manage partners, and generate referral-based business.",
    requirements: [
      "Identify and manage partners",
      "Generate referral-based business",
      "Strong relationship-building skills",
      "Experience in partnership development"
    ]
  },
  {
    id: 8,
    slug: "account-manager-software-services",
    title: "Account Manager – Software Services",
    department: "Account Management",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Manage existing clients and generate repeat business. Focus on client relationship management, upselling, and renewals.",
    requirements: [
      "Client relationship management",
      "Upselling and renewals",
      "Strong customer service skills",
      "Experience in account management"
    ]
  },
  {
    id: 9,
    slug: "international-sales-executive-it-solutions",
    title: "International Sales Executive (IT Solutions)",
    department: "Sales",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Handle international clients for web and software development projects. Manage client calls, handle proposals, and close international deals.",
    requirements: [
      "Client calls and proposal handling",
      "Close international deals",
      "Excellent English communication skills",
      "Experience with international clients preferred"
    ]
  },
  {
    id: 10,
    slug: "growth-revenue-executive-technology-services",
    title: "Growth & Revenue Executive – Technology Services",
    department: "Business Development",
    location: "Remote",
    type: "Full Time / Part Time",
    salary: "Up to ₹25,000 / month",
    description: "Drive revenue growth through new sales channels and strategies. Explore new markets and improve sales performance.",
    requirements: [
      "Explore new markets",
      "Improve sales performance",
      "Analytical and strategic thinking",
      "Experience in revenue growth and business development"
    ]
  }
];

export function getJobById(id: number): Job | undefined {
  return JOBS.find(job => job.id === id);
}

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find(job => job.slug === slug);
}

