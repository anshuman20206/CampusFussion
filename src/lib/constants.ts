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
  Bell,
  Globe,
  Home
} from "lucide-react";
import images from "@/app/lib/placeholder-images.json";

export const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/internships", label: "Internships", icon: Briefcase },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/announcements", label: "News", icon: Bell },
];

export const ADMIN_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard", label: "Overview", icon: Globe },
  { href: "/admin/add-internship", label: "Add Internship", icon: PlusCircle },
  { href: "/admin/manage-internships", label: "Manage Internships", icon: Briefcase },
  { href: "/admin/add-event", label: "Add Event", icon: PlusCircle },
  { href: "/admin/manage-events", label: "Manage Events", icon: Calendar },
  { href: "/admin/add-announcement", label: "Add News", icon: Bell },
  { href: "/admin/manage-announcements", label: "Manage News", icon: MessageCircle },
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
    image: images.team.anshuman.src,
    dataAiHint: images.team.anshuman.dataAiHint,
    linkedin: "https://www.linkedin.com/in/anshumansinghsdd/",
    description: "Driving innovation and community growth through technology."
  },
  {
    name: "Aahana Soni",
    role: "GDG Co-Organiser",
    image: images.team.aahana.src,
    dataAiHint: images.team.aahana.dataAiHint,
    linkedin: "https://www.linkedin.com/in/aahana-soni-342865332/",
    description: "Empowering students to build impactful digital solutions."
  },
  {
    name: "Hifza Arif",
    role: "Campus Secretary",
    image: images.team.hifza.src,
    dataAiHint: images.team.hifza.dataAiHint,
    linkedin: "https://www.linkedin.com/in/hifza-arif-4b3243302/",
    description: "Coordinating opportunities and fostering campus engagement."
  },
  {
    name: "Ankit",
    role: "Core Team Member",
    image: images.team.ankit.src,
    dataAiHint: images.team.ankit.dataAiHint,
    linkedin: "#",
    description: "Bridging the gap between theory and real-world application."
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

export const GALLERY_IMAGES = images.gallery.map(img => ({
  src: img.src,
  title: img.title,
  alt: img.title,
  dataAiHint: img.hint
}));
