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
    date: "2024-10-04",
    name: "Info Session x Gen AI Study Jam",
    description: "GDG IEC's first-ever event was a grand success thanks to the relentless efforts of our amazing core team.",
    location: "IEC Campus",
    icon: Lightbulb,
  },
  {
    date: "2024-11-25",
    name: "Full Stack Development Speaker Session",
    description: "Join a speaker session with Dhruv Panjali to dive into Full Stack Development, from front-end to back-end technologies.",
    location: "IEC College Of Engineering & Technology, Greater Noida",
    icon: Users,
  },
  {
    date: "2024-12-06",
    name: "Tech Winter Break: Solution Challenge Q&A",
    description: "Join the Q&A for the Tech Winter Break: Solution Challenge! This session will cover web development fundamentals and details about the global challenge.",
    location: "Online",
    icon: Lightbulb,
  },
  {
    date: "2024-12-23",
    name: "DevByte: A Web Development Odyssey",
    description: "Dive deep into web development with sessions on essentials, frameworks, and tools. Showcase your own projects and connect with fellow enthusiasts.",
    location: "Online",
    icon: PenTool,
  },
  {
    date: "2024-12-28",
    name: "Dev December: Flutter Your Way to Android",
    description: "Dive into the world of Flutter and unlock its potential for Android development! Don't miss this opportunity to learn, grow, and connect with fellow tech enthusiasts.",
    location: "Online",
    icon: PenTool,
  },
  {
    date: "2025-01-30",
    name: "Web and Flutter Development Workshop",
    description: "An insightful workshop covering Next-Gen Web Innovation with Gemini, Dart, Flutter, CSS, and Interactive Web Design.",
    location: "Online",
    icon: PenTool,
  },
  {
    date: "2025-04-25",
    name: "HACKEMON: The Ultimate 36-Hour Hackathon!",
    description: "A 36-hour hackathon with prize categories for AI/ML, Social Impact, Women-Led, and Beginner-Friendly hacks. Hosted by GDG IEC x SheBuilds.",
    location: "Hosted by GDG IEC x SheBuilds",
    icon: Rocket,
  },
  {
    date: "2025-04-12",
    name: "GSoC Unlocked: Crack the Code!",
    description: "Get insider tips on succeeding in Google Summer of Code, from finding projects to crafting a winning proposal, with expert Ayush Srivastava.",
    location: "Online",
    icon: Users,
  },
  {
    date: "2025-04-19",
    name: "Vibe Coding Hackathon",
    description: "The new-aged coding with AI for all! No coding skills or laptop required—make anything you like with mobile tools and get featured on our social platforms.",
    location: "GDG-IEC",
    icon: Rocket,
  },
  {
    date: "2025-05-02",
    name: "Web3 Unchained: Web 3 se judo yatra",
    description: "Dive into the future of the internet with insights on Web3 & Blockchain technology! A collaboration with CrewSphere ICP INDIA.",
    location: "F Block Seminar Hall, IEC College of Engineering & Technology",
    icon: Lightbulb,
  },
  {
    date: "2025-07-25",
    name: "India OnChain Builders' Series",
    description: "Launch Your Career in Web3 & AI with speaker Lakhshay Gupta. Includes a live Q&A session.",
    location: "Online",
    icon: Users,
    link: "https://lu.ma/kdn7hlye",
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
    { src: "/6.jpeg", dataAiHint: "networking people", alt: "Networking session in progress.", title: "Networking" },
    { src: "/8.jpg", dataAiHint: "team discussion", alt: "Team members discussing during an event.", title: "Collaboration" },
    { src: "/1.jpg", dataAiHint: "event audience", alt: "A picture from one of our events.", title: "Community Event" },
    { src: "/2.jpg", dataAiHint: "speaker presentation", alt: "A speaker presenting to the audience.", title: "Speaker Session" },
    { src: "/3.jpg", dataAiHint: "students collaborating", alt: "Students working together during a workshop.", title: "Workshop" },
    { src: "/4.jpg", dataAiHint: "group photo", alt: "A group photo of event attendees.", title: "Group Photo" },
    { src: "/5.jpg", dataAiHint: "coding hackathon", alt: "Participants focused on coding during a hackathon.", title: "Hackathon Fun" },
    { src: "/7.jpg", dataAiHint: "event group", alt: "A picture from one of our events.", title: "Community Gathering" },
    { src: "/9.jpeg", dataAiHint: "presentation stage", alt: "A presenter on stage at a tech talk.", title: "Tech Talk" },
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
