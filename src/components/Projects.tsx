"use client";

import { motion } from "framer-motion";
import Container from "./ui/Container";
import styles from "./Projects.module.css";
import { ProjectCard } from "./ui/ProjectCard";

const projects = [
    {
        id: "1",
        title: "Cloud-Based Biometric Attendance",
        description: "Real-time biometric attendance solution using ZKTeco F22 devices and Lantime Cloud.",
        tags: ["IoT", "Cloud", "Biometrics", "Automation"],
        image: "/biometric_attendance.PNG",
        demoLink: "https://syasta.lanatime.in/",
        repoLink: "",
    },
    {
        id: "2",
        title: "Personal Web Portfolio",
        description: "Custom Next.js + TypeScript portfolio to highlight skills and freelance projects.",
        tags: ["Next.js", "TypeScript", "React"],
        image: "/portfolio_website.jpg",
        demoLink: "https://umerrizwan.netlify.app",
        repoLink: "#",
    },
    {
        id: "3",
        title: "Bewegens Elevators Website",
        description: "Responsive website for an elevator company featuring project showcases.",
        tags: ["Next.js", "Tailwind CSS", "Firebase"],
        image: "/bewegen_website.jpg",
        demoLink: "https://www.bewegens.com",
        repoLink: "https://github.com/UmerRizwan03/BeewegenElevators",
    },
    {
        id: "4",
        title: "Golden Hour Photography",
        description: "WordPress-based portfolio showcasing photography work with optimized galleries.",
        tags: ["WordPress", "Photography", "Portfolio"],
        image: "/goldenhour_photography_website.png",
        demoLink: "https://goldenhourpic.wordpress.com",
        repoLink: "",
    },
];

import { ScrollSection } from "./ui/ScrollSection";

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <Container>
                <ScrollSection>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={styles.header}
                    >
                        <h2 className="headline-future">Things I’ve Built</h2>
                        <div className={styles.line}></div>
                    </motion.div>

                    <div className={styles.grid}>
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </ScrollSection>
            </Container>
        </section>
    );
}
