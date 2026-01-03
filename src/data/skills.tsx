import { IconType } from "react-icons";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFirebase,
    SiReacthookform,
    SiZod,
    SiFramer,
    SiTwilio,
    SiGithub,
    SiVercel,
    SiOpenai,
    SiShadcnui
} from "react-icons/si";
import {
    Box,
    Mail,
    Search,
    Activity,
    Cpu,
    Shapes,
    Atom
} from "lucide-react";

export type Skill = {
    name: string;
    icon: IconType | React.ElementType;
    usage: string;
};

export type SkillCategory = {
    title: string;
    skills: Skill[];
};

export const skillsData: SkillCategory[] = [
    {
        title: "Core tools used in production",
        skills: [
            {
                name: "Next.js",
                icon: SiNextdotjs,
                usage: "Used for production-grade websites and portfolio projects with proper routing, layouts, and SEO."
            },
            {
                name: "React",
                icon: SiReact,
                usage: "Primary UI layer across your projects. Hooks, component-based architecture, and state-driven UI."
            },
            {
                name: "TypeScript",
                icon: SiTypescript,
                usage: "Used in real projects, including handling types, fixing build errors, and maintaining safer codebases."
            },
            {
                name: "Tailwind CSS",
                icon: SiTailwindcss,
                usage: "Main styling system. Utility-first, responsive layouts, modern UI consistency."
            },
            {
                name: "ShadCN UI",
                icon: SiShadcnui, // If this fails, we'll swap to a Lucide icon
                usage: "Component foundation for clean, accessible UI. Used intentionally, not as a template dump."
            },
            {
                name: "Firebase",
                icon: SiFirebase,
                usage: "Core backend replacement. Used for authentication, real-time data, file storage, and hosting."
            },
            {
                name: "Firebase Hosting",
                icon: Box, // Lucide icon for hosting/deploy
                usage: "Actual deployment target for your projects, not just theoretical knowledge."
            }
        ]
    },
    {
        title: "Supporting tools and services",
        skills: [
            {
                name: "React Hook Form",
                icon: SiReacthookform,
                usage: "Used for structured form handling and validation flows."
            },
            {
                name: "Zod",
                icon: SiZod,
                usage: "Schema validation paired with forms and TypeScript for safer input handling."
            },
            {
                name: "Lucide React",
                icon: Shapes,
                usage: "Icon system used consistently across UI instead of random SVGs."
            },
            {
                name: "Framer Motion",
                icon: SiFramer,
                usage: "Used for animations, scroll-based effects, and interaction polish."
            },
            {
                name: "Matter.js",
                icon: Atom, // Physics-like icon
                usage: "Used for physics-based visual interactions in your portfolio."
            },
            {
                name: "Twilio",
                icon: SiTwilio,
                usage: "Used for WhatsApp notifications and messaging in real projects."
            },
            {
                name: "Resend",
                icon: Mail, // Using Mail as Resend icon fallback
                usage: "Evaluated and used as a secure email-sending solution for contact forms."
            },
            {
                name: "Git & GitHub",
                icon: SiGithub,
                usage: "Used for version control, repo management, README documentation, and deployment workflows."
            }
        ]
    },
    {
        title: "Experimenting and learning",
        skills: [
            {
                name: "Vercel",
                icon: SiVercel,
                usage: "Explored as a hosting option and compared against Firebase Hosting."
            },
            {
                name: "SEO",
                icon: Search,
                usage: "Metadata, JSON-LD, indexing considerations, and performance checks."
            },
            {
                name: "Performance & Linting",
                icon: Activity,
                usage: "ESLint reviews, build warnings, and production-readiness checks."
            },
            {
                name: "AI Workflows",
                icon: SiOpenai,
                usage: "Using AI to accelerate development, refactor code, and debug issues."
            },
            {
                name: "3D & Interactive Web",
                icon: Cpu,
                usage: "Ongoing exploration of combining animation, physics, and UI."
            }
        ]
    }
];
