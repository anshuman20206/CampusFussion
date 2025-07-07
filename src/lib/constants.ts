import { Users, Calendar, MessageCircle, Twitter, Linkedin, Github, Rocket, BrainCircuit, Lightbulb, PenTool, Rss } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/announcements", label: "Announcements" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
  { href: "/chatbot", label: "AI Assistant" },
];

export const TEAM_MEMBERS = [
  {
    name: "Ankit Kumar",
    role: "GDG Lead & Organizer",
    image: "/ankit.png",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/ankit-kumar-a20478230",
  },
  {
    name: "Aahana Soni",
    role: "Campus Secretary",
    image: "/aahana.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/aahana-soni-342865332",
  },
  {
    name: "Anshuman Singh",
    role: "Competitive Programming Lead",
    image: "/anshuman.jpg",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/anshuman-singh-388056206",
  },
  {
    name: "Animesh Shrivastava",
    role: "GDG Co-Organiser",
    image: "/animesh.png",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/animeshkumar143",
  },
];

export const COMMUNITY_LINKS = [
    {
      name: "Discord",
      description: "Join our active community for real-time discussions, help, and fun.",
      link: "#",
      icon: MessageCircle,
      cta: "Join Discord",
    },
    {
      name: "LinkedIn",
      description: "Follow our professional network for updates and career opportunities.",
      link: "https://www.linkedin.com/groups/14523414",
      icon: Linkedin,
      cta: "Follow on LinkedIn",
    },
    {
      name: "GitHub",
      description: "Collaborate on projects and explore our open-source initiatives.",
      link: "#",
      icon: Github,
      cta: "Explore on GitHub",
    },
    {
      name: "Twitter",
      description: "Get the latest news, announcements, and tech insights.",
      link: "https://x.com/GdgIec4414",
      icon: Twitter,
      cta: "Follow on Twitter",
    },
];

export const EVENTS = [
  {
    date: "2024-09-15",
    name: "Intro to AI with Gemini",
    description: "An introductory workshop on building with Google's Gemini.",
    location: "Online",
    registrationLink: "#",
    icon: BrainCircuit,
  },
  {
    date: "2024-10-02",
    name: "Firebase for Web Developers",
    description: "Learn how to build powerful web apps with Firebase.",
    location: "Campus Auditorium",
    registrationLink: "#",
    icon: PenTool,
  },
  {
    date: "2024-10-20",
    name: "Fall Hackathon 2024",
    description: "A 24-hour coding competition with exciting prizes.",
    location: "Tech Hub",
    registrationLink: "#",
    icon: Rocket,
  },
  {
    date: "2024-11-05",
    name: "Speaker Session: Life at Google",
    description: "Hear from a Google engineer about their career journey.",
    location: "Online",
    registrationLink: "#",
    icon: Users,
  },
  {
    date: "2024-10-04",
    name: "Info Session x Gen AI Study Jam",
    description: "GDG IEC's first-ever event was a grand success thanks to the relentless efforts of our amazing core team.",
    location: "IEC Campus",
    registrationLink: "#",
    icon: Lightbulb,
  },
];

export const ANNOUNCEMENTS = [
    {
      date: '2024-08-01',
      title: 'Welcome to CampusConnect!',
      content: 'We are excited to launch CampusConnect, your new hub for developer activities, learning, and community building. Explore the platform and get ready for an amazing year!',
      pinned: true,
    },
    {
      date: '2024-07-28',
      title: 'Fall Hackathon Registration is Open',
      content: 'Ready to build something amazing? Registration for our annual Fall Hackathon is now officially open. Sign up now to secure your spot. Limited slots available!',
      pinned: false,
    },
    {
      date: '2024-07-25',
      title: 'Call for Mentors',
      content: 'We are looking for experienced developers to join our mentorship program. If you are passionate about guiding the next generation of tech talent, apply today.',
      pinned: false,
    },
];

export const GALLERY_IMAGES = [
    { src: "/gdgiec.png", dataAiHint: "students coding", alt: "Students collaborating at a hackathon.", title: "Hackathon 2023" },
    { src: "https://placehold.co/600x400.png", dataAiHint: "speaker presentation", alt: "Guest speaker presenting at a tech talk.", title: "Tech Talk: AI" },
    { src: "https://placehold.co/600x400.png", dataAiHint: "group workshop", alt: "Attendees at a Firebase workshop.", title: "Firebase Workshop" },
    { src: "https://placehold.co/600x400.png", dataAiHint: "team discussion", alt: "Team members planning an event.", title: "Event Planning" },
    { src: "https://placehold.co/600x400.png", dataAiHint: "networking event", alt: "Students networking at a community mixer.", title: "Community Mixer" },
    { src: "https://placehold.co/600x400.png", dataAiHint: "award ceremony", alt: "Winners of the coding competition.", title: "Code Competition" },
];

export const ROADMAP_PHASES = [
  {
    icon: Users,
    title: "Phase 1: Community Formation",
    description: "Establishing the core community, setting up social channels, and onboarding initial members.",
  },
  {
    icon: Calendar,
    title: "Phase 2: Events & Engagement",
    description: "Launching our first series of workshops, speaker sessions, and regular meetups to foster learning and collaboration.",
  },
  {
    icon: Rocket,
    title: "Phase 3: Hackathons & Projects",
    description: "Organizing large-scale hackathons and collaborative projects to apply skills and build innovative solutions.",
  },
];
