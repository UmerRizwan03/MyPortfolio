import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import styles from "./page.module.css";

const projects = [
    {
        id: "1",
        title: "Cloud-Based Biometric Attendance",
        description: "Real-time biometric attendance solution using ZKTeco F22 devices and Lantime Cloud.",
        fullDescription: "Implemented a real-time biometric attendance solution across mobile company buses using ZKTeco F22 devices and Lantime Cloud, enabling automated reporting and centralized tracking for 250+ employees across three organizations. Reduced attendance processing time by 90%, eliminated proxy attendance, and improved payroll accuracy to 100%, contributing to faster HR operations and full compliance with labor regulations.",
        tags: ["IoT", "Cloud", "Biometrics", "Automation"],
        image: "Biometric System",
        demoLink: "#",
        repoLink: "#",
        challenges: "Integrating hardware devices with a cloud-based system in a mobile environment (buses) presented connectivity and synchronization challenges.",
        solution: "Utilized Lantime Cloud for centralized data management and ensured robust offline data buffering on the devices.",
    },
    {
        id: "2",
        title: "Bewegens Elevators Website",
        description: "Responsive website for an elevator company featuring project showcases.",
        fullDescription: "Designed and developed a responsive website for an elevator company, featuring project showcases, testimonials, and a modern interface using Next.js, Tailwind CSS, and Firebase.",
        tags: ["Next.js", "Tailwind CSS", "Firebase"],
        image: "Bewegens Website",
        demoLink: "https://www.bewegens.com",
        repoLink: "#",
        challenges: "Creating a modern, high-performance site that effectively showcases the company's portfolio.",
        solution: "Leveraged Next.js for static site generation and fast load times, with Tailwind CSS for rapid and consistent styling.",
    },
    {
        id: "3",
        title: "Golden Hour Photography",
        description: "WordPress-based portfolio showcasing photography work with optimized galleries.",
        fullDescription: "Created a WordPress-based portfolio to showcase photography work with optimized galleries and intuitive navigation.",
        tags: ["WordPress", "Photography", "Portfolio"],
        image: "Golden Hour",
        demoLink: "https://goldenhourpic.wordpress.com",
        repoLink: "#",
        challenges: "Optimizing high-resolution images for web performance without sacrificing quality.",
        solution: "Implemented lazy loading and image optimization techniques to ensure fast page loads.",
    },
    {
        id: "4",
        title: "Personal Web Portfolio",
        description: "Custom Next.js + TypeScript portfolio to highlight skills and freelance projects.",
        fullDescription: "Built and deployed a custom Next.js + TypeScript portfolio to highlight skills, freelance projects, and contact information.",
        tags: ["Next.js", "TypeScript", "React"],
        image: "Portfolio",
        demoLink: "https://umerrizwan.netlify.app",
        repoLink: "#",
        challenges: "Designing a unique and personal brand identity.",
        solution: "Focused on clean typography, smooth animations, and a dark mode aesthetic to create a professional presence.",
    },
];

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Container>
                    <Link href="/#projects" className={styles.backLink}>
                        <ArrowLeft size={20} />
                        Back to Projects
                    </Link>

                    <div className={styles.header}>
                        <h1 className={styles.title}>{project.title}</h1>
                        <div className={styles.tags}>
                            {project.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.imagePlaceholder}>
                        <span>{project.image} Hero</span>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.description}>
                            <h2>Overview</h2>
                            <p>{project.fullDescription}</p>

                            <h3>Challenges</h3>
                            <p>{project.challenges}</p>

                            <h3>Solution</h3>
                            <p>{project.solution}</p>
                        </div>

                        <div className={styles.sidebar}>
                            <div className={styles.links}>
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.primaryBtn}
                                >
                                    <ExternalLink size={18} />
                                    Live Demo
                                </a>
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.secondaryBtn}
                                >
                                    <Github size={18} />
                                    View Code
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
