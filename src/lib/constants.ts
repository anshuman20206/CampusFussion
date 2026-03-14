
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Twitter, 
  Linkedin, 
  Github, 
  Rocket, 
  BrainCircuit, 
  Lightbulb, 
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  FileText,
  Zap,
  Globe
} from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home", icon: Rocket },
  { href: "/internships", label: "Internships", icon: Briefcase },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/announcements", label: "News", icon: MessageCircle },
];

export const ADMIN_NAV_LINKS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/add-internship", label: "Add Internship", icon: PlusCircle },
  { href: "/admin/manage-internships", label: "Manage Internships", icon: Briefcase },
  { href: "/admin/add-event", label: "Add Event", icon: PlusCircle },
  { href: "/admin/manage-events", label: "Manage Events", icon: Calendar },
  { href: "/admin/view-applications", label: "Applications", icon: FileText },
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

export const TEAM_MEMBERS = [
  {
    name: "Anshuman Singh",
    role: "GDG Lead & Organizer",
    image: "/images/anshuman.jpg",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/anshumansinghsdd/",
  },
  {
    name: "Aahana Soni",
    role: "GDG Co-Organiser",
    image: "/images/aahana.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/aahana-soni-342865332/",
  },
  {
    name: "Hifza Arif",
    role: "Campus Secretary",
    image: "/images/hifza.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/hifza-arif-4b3243302/",
  },
  {
    name: "Suhani Goel",
    role: "Campus Secretary",
    image: "/images/suhani.jpg",
    dataAiHint: "woman portrait",
    linkedin: "https://www.linkedin.com/in/suhani-goel-019b90253/",
  },
];

export const ROADMAP_PHASES = [
  {
    title: "Phase 1: Foundation",
    description: "Establishing the core community hub, member registration, and event management systems.",
    icon: Rocket,
  },
  {
    title: "Phase 2: Innovation",
    description: "Launching student projects, hackathons, and integrating AI-powered learning assistants.",
    icon: BrainCircuit,
  },
  {
    title: "Phase 3: Career Growth",
    description: "Expanding the internship portal, connecting with industry partners, and hosting job fairs.",
    icon: Lightbulb,
  },
  {
    title: "Phase 4: Scaling",
    description: "Expanding to neighboring campuses and creating a cross-college collaborative network.",
    icon: Globe,
  },
];

export const ANNOUNCEMENTS = [
  {
    title: "Welcome to CampusFusion",
    content: "We are excited to launch the new version of our student community platform. Explore internships and upcoming events now!",
    date: "2024-05-20",
    pinned: true,
  },
  {
    title: "Internship Season is Live",
    content: "Several new internships have been posted in the Web Dev and AI domains. Make sure your profile is ready and start applying today!",
    date: "2024-05-18",
    pinned: false,
  },
  {
    title: "Upcoming Hackathon: FusionHack 2024",
    content: "Get ready for the biggest campus hackathon of the year. Registration starts next week. Form your teams now!",
    date: "2024-05-15",
    pinned: false,
  },
];

export const GALLERY_IMAGES = [
  {
    src: "https://picsum.photos/seed/event1/800/600",
    title: "Last Workshop",
    alt: "Students working together during a Flutter workshop",
    dataAiHint: "students workshop",
  },
  {
    src: "https://picsum.photos/seed/event2/800/600",
    title: "GDG Cloud Session",
    alt: "Speaker presenting about Google Cloud Platform",
    dataAiHint: "tech seminar",
  },
  {
    src: "https://picsum.photos/seed/event3/800/600",
    title: "Hackathon Team",
    alt: "Winning team of the last 24-hour hackathon",
    dataAiHint: "team celebration",
  },
  {
    src: "https://picsum.photos/seed/event4/800/600",
    title: "Networking Tea",
    alt: "Students and industry experts talking during a break",
    dataAiHint: "business networking",
  },
  {
    src: "https://picsum.photos/seed/event5/800/600",
    title: "AI Demo Day",
    alt: "Student showcasing their LLM-based project",
    dataAiHint: "project showcase",
  },
  {
    src: "https://picsum.photos/seed/event6/800/600",
    title: "Annual Meetup",
    alt: "Group photo of all community members",
    dataAiHint: "large group",
  },
];
