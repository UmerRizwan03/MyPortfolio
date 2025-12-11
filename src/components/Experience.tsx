"use client";

import { motion } from "framer-motion";
import Container from "./ui/Container";
import styles from "./Experience.module.css";
import { GlassCard } from "./ui/GlassCard";

const experiences = [
    {
        id: 1,
        role: "Full-Stack Developer (Freelance)",
        company: "Self-Employed",
        period: "2025 - Present",
        description: "Designed and developed responsive web applications using Next.js, React, and TypeScript. Integrated AI-driven features to automate workflows. Built and deployed projects using Firebase.",
    },
    {
        id: 2,
        role: "Design Supervisor",
        company: "TBT Engineering",
        period: "04/2023 – 11/2024",
        description: "Managed construction processes, coordinated workers, and enforced safety regulations. Designed floor plans and basic 3D models.",
    },
    {
        id: 3,
        role: "Maintenance Worker",
        company: "Impala Canada",
        period: "05/2022 – 03/2023",
        description: "Inspected equipment and buildings, performed repairs, and maintained vehicles.",
    },
    {
        id: 4,
        role: "Custodial Staff",
        company: "Ras Maintenance Services",
        period: "06/2020 – 04/2022",
        description: "Performed routine maintenance, ensured building security, and provided customer service.",
    },
];

import { ScrollSection } from "./ui/ScrollSection";

export default function Experience() {
    return (
        <section id="experience" className={styles.experience}>
            <Container>
                <ScrollSection>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={styles.header}
                    >
                        <h2 className="headline-timeline">Timeline of My Work</h2>
                        <div className={styles.line}></div>
                    </motion.div>

                    <div className={styles.timeline}>
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
                                className={styles.item}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                                    className={styles.dot}
                                ></motion.div>
                                <GlassCard className={styles.content}>
                                    <span className={styles.period}>{exp.period}</span>
                                    <h3 className={styles.role}>{exp.role}</h3>
                                    <h4 className={styles.company}>{exp.company}</h4>
                                    <p className={styles.description}>{exp.description}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </ScrollSection>
            </Container>
        </section>
    );
}
