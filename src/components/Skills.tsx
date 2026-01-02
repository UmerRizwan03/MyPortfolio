"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
    SiFirebase, SiGit,
    SiTypescript, SiNodedotjs, SiNextdotjs, SiMongodb, SiPostgresql,
    SiFramer, SiDocker, SiFigma
} from "react-icons/si";
import { Sparkles, Zap, Code, Database, Layout } from "lucide-react";
import Container from "./ui/Container";
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
        <section id="skills" className="relative py-24 overflow-hidden">
            {/* Fonts Injection (REMOVED: Loaded globally in layout.tsx) */}

            <GridPattern />

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] bg-lime-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Floating Elements */}
            <FloatingShape className="top-20 right-[15%] text-lime-600/20 dark:text-lime-400/20" delay={0}>
                <Code size={48} />
            </FloatingShape>
            <FloatingShape className="bottom-32 left-[10%] text-purple-600/20 dark:text-purple-400/20" delay={2}>
                <Database size={56} />
            </FloatingShape>
            <FloatingShape className="top-40 left-[5%] text-cyan-600/20 dark:text-cyan-400/20" delay={4}>
                <Layout size={40} />
            </FloatingShape>


            <Container>
                <ScrollSection>
                    <div className="relative z-10 flex flex-col items-center">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-20 text-center relative"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-6 backdrop-blur-md">
                                <Zap size={14} className="text-lime-600 dark:text-lime-400 fill-lime-600 dark:fill-lime-400" />
                                <span className="text-xs font-bold font-mono uppercase tracking-widest text-lime-600 dark:text-lime-400">Tech Stack</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-zinc-900 dark:text-white leading-[0.9] tracking-tighter relative z-10">
                                TOOLS OF THE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-purple-500 dark:from-lime-400 dark:to-purple-400">TRADE</span>
                            </h2>
                            <h2 className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-outline opacity-30 leading-[0.9] tracking-tighter pointer-events-none translate-x-1 translate-y-1 w-full">
                                TOOLS OF THE <br />
                                TRADE
                            </h2>
                        </motion.div>

                        {/* Grid */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl">
                            {skills.map((skill, index) => (
                                <Magnetic key={skill.label} strength={0.2}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: index * 0.05
                                        }}
                                        className="group relative flex flex-col items-center"
                                    >
                                        <div
                                            className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-lime-400/50 dark:group-hover:border-white/20"
                                            style={{
                                                background: "var(--background-card)" /* Using style for complex gradient if needed, else rely on classes */
                                            }}
                                        >
                                            {/* Glow on hover */}
                                            <div
                                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                                style={{ backgroundColor: `${skill.color}40` }} // 25% opacity hex
                                            />

                                            {/* Icon */}
                                            <skill.icon
                                                size={40}
                                                className="relative z-10 transition-colors duration-300 text-zinc-500 dark:text-slate-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                                                style={{ filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }} // Reset drop shadow
                                            />

                                            {/* Inner border/shine */}
                                            <div className="absolute inset-0 rounded-3xl border border-white/20 dark:border-white/5 group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-colors pointer-events-none" />
                                        </div>

                                        {/* Label */}
                                        <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                            <span
                                                className="px-3 py-1 text-xs font-bold font-mono tracking-wider uppercase rounded-full bg-white dark:bg-black/80 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 backdrop-blur-lg whitespace-nowrap shadow-lg"
                                                style={{ color: skill.color }}
                                            >
                                                {skill.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                </Magnetic>
                            ))}
                        </div>
                    </div>
                </ScrollSection>
            </Container>
        </section >
    );
}

// Ensure these are available if not imported from a shared location
const GridPattern = () => (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
);

const FloatingShape = ({ className, delay, children }: { className?: string, delay: number, children?: React.ReactNode }) => (
    <motion.div
        className={`absolute ${className} pointer-events-none`}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        {children}
    </motion.div>
);
