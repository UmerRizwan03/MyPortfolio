"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
    SiFirebase, SiGit,
    SiTypescript, SiNodedotjs, SiNextdotjs, SiMongodb, SiPostgresql,
    SiFramer, SiDocker, SiFigma
} from "react-icons/si";
import Container from "./ui/Container";
import styles from "./Skills.module.css";
import { ScrollSection } from "./ui/ScrollSection";
import { Magnetic } from "./ui/Magnetic";

const skills = [
    // Frontend
    { icon: SiReact, label: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
    { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    { icon: SiFramer, label: "Framer", color: "#0055FF" },
    { icon: SiFigma, label: "Figma", color: "#F24E1E" },

    // Backend & Core
    { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
    { icon: SiPostgresql, label: "Postgres", color: "#4169E1" },
    { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
    { icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
    { icon: SiDocker, label: "Docker", color: "#2496ED" },

    // Foundation
    { icon: SiGit, label: "Git", color: "#F05032" },
    { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
    { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
    { icon: SiCss3, label: "CSS3", color: "#1572B6" },
];

export default function Skills() {
    return (
        <section id="skills" className={styles.skillsSection}>
            <Container>
                <ScrollSection>
                    <h2 className="headline-tools text-center mb-24 block w-full">
                        <span>Tools</span> of the Trade
                    </h2>

                    <div className={styles.magneticGrid}>
                        {skills.map((skill, index) => (
                            <Magnetic key={skill.label} strength={0.4}>
                                <motion.div
                                    className={styles.skillItem}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        duration: 0.5,
                                        delay: index * 0.05
                                    }}
                                >
                                    <div
                                        className={styles.iconWrapper}
                                        style={{
                                            "--brand-color": skill.color
                                        } as React.CSSProperties & { "--brand-color": string }}
                                    >
                                        <skill.icon size={40} className={styles.icon} />
                                    </div>
                                    <div className={styles.label}>{skill.label}</div>
                                </motion.div>
                            </Magnetic>
                        ))}
                    </div>
                </ScrollSection>
            </Container>
        </section >
    );
}
