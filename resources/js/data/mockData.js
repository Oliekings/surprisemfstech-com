export const settings = {
  site_name: "Surprise-MFs Tech",
  hero_text: "We build digital experiences that defy expectations.",
  about_text: "A collective of developers, designers, and creators who pour their hearts into pushing the boundaries of the web. We build every project with a relentless love for perfection.",
  contact_email: "surprisemfstech@gmail.com"
};

export const skills = [
  { id: 1, name: "React", category: "Frontend" },
  { id: 2, name: "Laravel", category: "Backend" },
  { id: 3, name: "Framer Motion", category: "Animation" },
  { id: 4, name: "UI/UX Design", category: "Design" },
  { id: 5, name: "Video Editing", category: "Media" },
];

export const teamMembers = [
  {
    id: 1,
    name: "Alex Vance",
    role: "Lead Developer",
    bio: "Architecting scalable systems and crafting seamless interfaces.",
    avatar_path: "https://picsum.photos/seed/alex/400/400",
    skills: [1, 2],
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Graphic Designer",
    bio: "Translating complex ideas into intuitive visual languages.",
    avatar_path: "https://picsum.photos/seed/sarah/400/400",
    skills: [4],
  },
  {
    id: 3,
    name: "Marcus Cole",
    role: "Video Editor",
    bio: "Telling compelling stories through motion and sound.",
    avatar_path: "https://picsum.photos/seed/marcus/400/400",
    skills: [5],
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Ads Specialist",
    bio: "Maximizing reach and engagement through data-driven campaigns.",
    avatar_path: "https://picsum.photos/seed/elena/400/400",
    skills: [],
  }
];

export const projects = [
  {
    id: 1,
    title: "Aura E-Commerce",
    slug: "aura-ecommerce",
    summary: "A seamless, high-performance commerce experience designed to maximize conversions.",
    detailed_description: "We completely redesigned Aura's online store focusing on speed and user experience. The result? A lightning-fast website that loads instantly, leading to a massive 40% increase in sales. Pixel-perfect design meets flawless execution.",
    featured_image: "https://picsum.photos/seed/aura/1200/800",
    gallery: [
      "https://picsum.photos/seed/aura1/800/600",
      "https://picsum.photos/seed/aura2/800/600"
    ],
    client_name: "Aura Lifestyle",
    completion_date: "2025-10-15",
    team_members: [1, 2],
    process: [
      { step: "01", title: "Discovery", description: "Analyzed performance bottlenecks and user drop-off points." },
      { step: "02", title: "Architecture", description: "Migrated to a headless Next.js frontend with Shopify backend." },
      { step: "03", title: "Execution", description: "Implemented edge caching and optimized checkout flow." },
      { step: "04", title: "Results", description: "Achieved sub-second loads and a 40% conversion bump." }
    ]
  },
  {
    id: 2,
    title: "Nexus Dashboard",
    slug: "nexus-dashboard",
    summary: "A powerful, easy-to-use platform that turns complex business data into clear insights.",
    detailed_description: "Enterprise data doesn't have to be confusing. We built a custom, real-time dashboard that helps the Nexus team make faster, smarter decisions. Every interaction was crafted to feel intuitive and responsive.",
    featured_image: "https://picsum.photos/seed/nexus/1200/800",
    gallery: [
      "https://picsum.photos/seed/nexus1/800/600",
      "https://picsum.photos/seed/nexus2/800/600"
    ],
    client_name: "Nexus Corp",
    completion_date: "2026-01-20",
    team_members: [1],
    process: [
      { step: "01", title: "Complexity Mapping", description: "Mapped millions of data points to find actionable patterns." },
      { step: "02", title: "UI/UX Design", description: "Created an intuitive, dark-mode dashboard tailored for analysts." },
      { step: "03", title: "Engineering", description: "Built custom WebGL charts to render large datasets smoothly." },
      { step: "04", title: "Deployment", description: "Seamlessly integrated with their existing enterprise data pipelines." }
    ]
  },
  {
    id: 3,
    title: "Echo Brand Identity",
    slug: "echo-brand",
    summary: "A stunning visual rebrand that captures the true essence of the company.",
    detailed_description: "We gave Echo a complete visual overhaul. From a striking new logo to a cohesive color palette and smooth digital animations, we ensured their brand stands out beautifully in a crowded market.",
    featured_image: "https://picsum.photos/seed/echo/1200/800",
    gallery: [
      "https://picsum.photos/seed/echo1/800/600",
      "https://picsum.photos/seed/echo2/800/600"
    ],
    client_name: "Echo Systems",
    completion_date: "2025-11-05",
    team_members: [2, 3],
    process: [
      { step: "01", title: "Brand Audit", description: "Evaluated their outdated visual identity and market positioning." },
      { step: "02", title: "Visual Language", description: "Developed a modern, high-contrast palette and custom typography." },
      { step: "03", title: "Motion Identity", description: "Created a comprehensive motion graphics system for all digital touchpoints." },
      { step: "04", title: "Rollout", description: "Delivered a complete brand book and asset library for their internal teams." }
    ]
  }
];

export const services = [
  { slug: "ui-ux-design", title: "Flawless UI/UX Design", description: "We craft intuitive, beautiful interfaces that your users will actually enjoy using." },
  { slug: "custom-web-apps", title: "Custom Web Applications", description: "Scalable, high-performance web apps built specifically for your unique business needs." },
  { slug: "e-commerce", title: "E-Commerce Solutions", description: "Blazing fast online stores designed to maximize conversions and drive revenue." },
  { slug: "animations", title: "Seamless Animations", description: "Engaging micro-interactions and smooth page transitions that bring your brand to life." }
];
