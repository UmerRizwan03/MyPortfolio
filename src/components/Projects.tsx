"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "./ui/Container";
import styles from "./Projects.module.css";
import { ProjectCard } from "./ui/ProjectCard";

import { projects } from "../data/projects";

import { ScrollSection } from "./ui/ScrollSection";
import { ProjectDetailsModal } from "./ui/ProjectDetailsModal";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={(p) => setSelectedProject(p)}
                            />
                        ))}
                    </div>
                </ScrollSection>
            </Container>

            <ProjectDetailsModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
