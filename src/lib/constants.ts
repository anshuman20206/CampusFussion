import { Users, Calendar, MessageCircle, Twitter, Linkedin, Github, Rocket, BrainCircuit, Lightbulb, PenTool, Rss, Code, Paintbrush, BookOpen } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/announcements", label: "Announcements" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
];

export const TEAM_MEMBERS = [
  {
    name: "Anshuman Singh",
    role: "GDG Lead & Organizer",
    image: "/anshuman.jpg",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/anshumansinghsdd/",
  },
  {
    name: "Aahana Soni",
    role: "GDG Co-Organiser",
    image: "/aahana.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/aahana-soni-342865332/",
  },
  {
    name: "Hifza Arif",
    role: "Campus Secretary",
    image: "/hifza.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/hifza-arif-4b3243302/",
  },
  {
    name: "Suhani Goel",
    role: "Campus Secretary",
    image: "/suhani.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/suhani-goel-019b90253/",
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

export const COMMUNITY_CLUBS = [
  {
    id: 'gdg',
    name: 'GDG Community',
    description: 'Discussions about Google technologies, events, and general announcements.',
    icon: Users,
  },
  {
    id: 'tech',
    name: 'Tech Club',
    description: 'Dive deep into programming, web development, AI/ML, and all things technical.',
    icon: Code,
  },
  {
    id: 'design',
    name: 'Design Hub',
    description: 'Share your UI/UX designs, get feedback, and talk about creative tools.',
    icon: Paintbrush,
  },
  {
    id: 'writing',
    name: 'Writers\' Corner',
    description: 'For bloggers, technical writers, and storytellers to share their work and ideas.',
    icon: BookOpen,
  }
];

export const EVENTS = [
  {
    date: "2025-10-20",
    name: "Google Cloud Study Jams",
    description: "A month-long study jam from Oct 20 to Nov 19, covering various aspects of Google Cloud.",
    location: "Online",
    icon: BrainCircuit,
  },
  {
    date: "2025-09-26",
    name: "Info Session",
    description: "An insightful session with Anshuman Singh discussing the latest trends in technology.",
    location: "IEC College of Engineering & Tech",
    icon: Users,
  },
  {
    date: "2025-07-25",
    name: "India OnChain Builders' Series",
    description: "Launch Your Career in Web3 & AI with speaker Lakhshay Gupta. Includes a live Q&A session.",
    location: "Online",
    icon: Users,
    link: "https://lu.ma/kdn7hlye",
  },
  {
    date: "2025-05-02",
    name: "Web3 Unchained: Web 3 se judo yatra",
    description: "Dive into the future of the internet with insights on Web3 & Blockchain technology! A collaboration with CrewSphere ICP INDIA.",
    location: "F Block Seminar Hall, IEC College of Engineering & Technology",
    icon: Lightbulb,
  },
  {
    date: "2025-04-25",
    name: "HACKEMON: The Ultimate 36-Hour Hackathon!",
    description: "A 36-hour hackathon with prize categories for AI/ML, Social Impact, Women-Led, and Beginner-Friendly hacks. Hosted by GDG IEC x SheBuilds.",
    location: "Hosted by GDG IEC x SheBuilds",
    icon: Rocket,
  },
  {
    date: "2025-04-19",
    name: "Vibe Coding Hackathon",
    description: "The new-aged coding with AI for all! No coding skills or laptop required—make anything you like with mobile tools and get featured on our social platforms.",
    location: "GDG-IEC",
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
    date: "2025-01-30",
    name: "Web and Flutter Development Workshop",
    description: "An insightful workshop covering Next-Gen Web Innovation with Gemini, Dart, Flutter, CSS, and Interactive Web Design.",
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
    date: "2024-12-23",
    name: "DevByte: A Web Development Odyssey",
    description: "Dive deep into web development with sessions on essentials, frameworks, and tools. Showcase your own projects and connect with fellow enthusiasts.",
    location: "Online",
    icon: PenTool,
  },
  {
    date: "2024-12-06",
    name: "Tech Winter Break: Solution Challenge Q&A",
    description: "Join the Q&A for the Tech Winter Break: Solution Challenge! This session will cover web development fundamentals and details about the global challenge.",
    location: "Online",
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
    date: "2024-10-04",
    name: "Info Session x Gen AI Study Jam",
    description: "GDG IEC's first-ever event was a grand success thanks to the relentless efforts of our amazing core team.",
    location: "IEC Campus",
    icon: Lightbulb,
  },
];

export const ANNOUNCEMENTS = [
    {
      date: '2025-07-23',
      title: 'Upcoming: India OnChain Builders\' Series',
      content: 'Just two days until the "India OnChain Builders\' Series"! Join us online on July 25, 2025, to hear from Lakhshay Gupta and kickstart your career in Web3 & AI.',
      pinned: true,
    },
    {
      date: '2025-04-30',
      title: 'Web3 Unchained: Web 3 se judo yatra',
      content: 'Get ready for "Web3 Unchained"! Join us at the F Block Seminar Hall on May 2, 2025, to dive into the future of the internet with Web3 and Blockchain.',
      pinned: false,
    },
    {
      date: '2025-04-23',
      title: 'Get Ready for HACKEMON!',
      content: 'The ultimate 36-hour hackathon, HACKEMON, is just two days away! Join us on April 25, 2025. Hosted by GDG IEC x SheBuilds.',
      pinned: false,
    },
    {
      date: '2025-04-17',
      title: 'Vibe Coding Hackathon is Coming!',
      content: 'The Vibe Coding Hackathon is just around the corner on April 19, 2025! No coding skills or laptop required. Get ready to create!',
      pinned: false,
    },
    {
      date: '2025-04-10',
      title: 'GSoC Unlocked: Crack the Code!',
      content: 'Don\'t miss "GSoC Unlocked" on April 12, 2025. Get insider tips on succeeding in Google Summer of Code with expert Ayush Srivastava.',
      pinned: false,
    },
    {
      date: '2025-01-28',
      title: 'Web and Flutter Development Workshop',
      content: 'Our Web and Flutter Development Workshop is happening in two days on January 30, 2025. Join us online to learn about Next-Gen Web Innovation.',
      pinned: false,
    },
    {
      date: '2024-12-26',
      title: 'Dev December: Flutter Your Way to Android',
      content: 'Get ready to dive into Flutter for Android development! Our Dev December session is happening on December 28, 2024.',
      pinned: false,
    },
    {
      date: '2024-12-21',
      title: 'DevByte: A Web Development Odyssey',
      content: 'Join our Web Development Odyssey with DevByte on December 23, 2024. A deep dive into web essentials, frameworks, and tools awaits!',
      pinned: false,
    },
    {
      date: '2024-12-04',
      title: 'Solution Challenge Q&A Session',
      content: 'Have questions about the Tech Winter Break: Solution Challenge? Join our Q&A session on December 6, 2024, to get all the details.',
      pinned: false,
    },
    {
      date: '2024-11-23',
      title: 'Full Stack Development Speaker Session',
      content: 'Join us on November 25, 2024, for an insightful session on Full Stack Development with speaker Dhruv Panjali.',
      pinned: false,
    },
    {
      date: '2024-10-02',
      title: 'Info Session x Gen AI Study Jam Reminder',
      content: 'Our first-ever event, the Info Session x Gen AI Study Jam, is happening in two days on October 4, 2024, at the IEC Campus. See you there!',
      pinned: false,
    },
];

export const GALLERY_IMAGES = [
    { src: "/Info Session Group.jpg", dataAiHint: "group photo", alt: "Group photo of the event organizers and volunteers.", title: "The Team" },
    { src: "/Info Session 8.jpg", dataAiHint: "team posing", alt: "The organizing team posing for a photo.", title: "Team Photo" },
    { src: "/Info Session 7.jpg", dataAiHint: "audience attention", alt: "Attendees focused on the presentation.", title: "Focused Attendees" },
    { src: "/Info Session 6.jpg", dataAiHint: "full house", alt: "A wide angle view of the packed seminar hall.", title: "Full House" },
    { src: "/Info Session 5.jpg", dataAiHint: "students networking", alt: "Students networking and talking before the session.", title: "Networking" },
    { src: "/Info Session 4.jpg", dataAiHint: "event crowd", alt: "Another view of the attendees in the hall.", title: "Crowd Shot" },
    { src: "/Info Session 3.jpg", dataAiHint: "attendees seated", alt: "A section of the audience during the event.", title: "Audience Section" },
    { src: "/Info Session 2.jpg", dataAiHint: "presentation stage", alt: "A speaker on stage during the presentation.", title: "On Stage" },
    { src: "/Info Session 1.jpg", dataAiHint: "event audience", alt: "Students listening to the speaker during the info session.", title: "Info Session Moment" },
    { src: "/IMG_20250926_163312.jpg", dataAiHint: "students interacting", alt: "Students interacting with each other during the session.", title: "Student Interaction" },
    { src: "/IMG_20250926_163250.jpg", dataAiHint: "event hall", alt: "Wide shot of the event hall with attendees seated.", title: "Session Hall" },
    { src: "/IMG_20250926_162822.jpg", dataAiHint: "students listening", alt: "Close-up of students listening attentively.", title: "Engaged Audience" },
    { src: "/IMG_20250926_162728.jpg", dataAiHint: "audience listening", alt: "View of the audience from the front of the hall.", title: "Audience View" },
    { src: "/IMG_20250926_162713.jpg", dataAiHint: "event audience", alt: "Students and attendees entering the session hall.", title: "Arrivals" },
    { src: "/IMG_20250926_162314.jpg", dataAiHint: "speaker presentation", alt: "Speaker presenting during the info session.", title: "Info Session" },
    { src: "/gdgiec.png", dataAiHint: "logo abstract", alt: "CampusConnect's official logo featuring an abstract design.", title: "Official Logo" },
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

    
