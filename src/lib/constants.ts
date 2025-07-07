import { Code2, Users, Calendar, Mic, MessageCircle, Twitter, Linkedin, Github, Home, Bot, Image as ImageIcon, Megaphone, Users2, LayoutDashboard } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chatbot", label: "Chatbot", icon: Bot },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/announcements", label: "Announcements", icon: Megaphone },
  { href: "/community", label: "Community", icon: Users2 },
];

export const TEAM_MEMBERS = [
  {
    name: "Alex Johnson",
    role: "GDG Lead & Organizer",
    image: "https://placehold.co/300x300.png",
    dataAiHint: "man portrait",
    linkedin: "https://linkedin.com/in/alexjohnson",
  },
  {
    name: "Maria Garcia",
    role: "Frontend Developer & Mentor",
    image: "https://placehold.co/300x300.png",
    dataAiHint: "woman portrait",
    linkedin: "https://linkedin.com/in/mariagarcia",
  },
  {
    name: "Sam Chen",
    role: "Backend Specialist",
    image: "https://placehold.co/300x300.png",
    dataAiHint: "person portrait",
    linkedin: "https://linkedin.com/in/samchen",
  },
  {
    name: "Jessica Brown",
    role: "Community Manager",
    image: "https://placehold.co/300x300.png",
    dataAiHint: "woman smiling",
    linkedin: "https://linkedin.com/in/jessicabrown",
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
      link: "#",
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
      link: "#",
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
    icon: Code2,
  },
  {
    date: "2024-10-02",
    name: "Firebase for Web Developers",
    description: "Learn how to build powerful web apps with Firebase.",
    location: "Campus Auditorium",
    registrationLink: "#",
    icon: Code2,
  },
  {
    date: "2024-10-20",
    name: "Fall Hackathon 2024",
    description: "A 24-hour coding competition with exciting prizes.",
    location: "Tech Hub",
    registrationLink: "#",
    icon: Code2,
  },
  {
    date: "2024-11-05",
    name: "Speaker Session: Life at Google",
    description: "Hear from a Google engineer about their career journey.",
    location: "Online",
    registrationLink: "#",
    icon: Users,
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
    { src: "https://placehold.co/600x400.png", dataAiHint: "students coding", alt: "Students collaborating at a hackathon.", title: "Hackathon 2023" },
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
    icon: Code2,
    title: "Phase 3: Hackathons & Projects",
    description: "Organizing large-scale hackathons and collaborative projects to apply skills and build innovative solutions.",
  },
];
