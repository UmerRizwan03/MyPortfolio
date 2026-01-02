"use client";

import { motion } from "framer-motion";
import Container from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
import { ScrollSection } from "./ui/ScrollSection";
import { Briefcase, Calendar, Clock, MapPin } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "Full-Stack Developer (Freelance)",
        company: "Self-Employed",
        period: "2025 - Present",
        description: "Designed and developed responsive web applications using Next.js, React, and TypeScript. Integrated AI-driven features to automate workflows. Built and deployed projects using Firebase.",
        color: "text-lime-400"
    },
    {
        id: 2,
        role: "Design Supervisor",
        company: "TBT Engineering",
        period: "04/2023 – 11/2024",
        description: "Managed construction processes, coordinated workers, and enforced safety regulations. Designed floor plans and basic 3D models.",
        color: "text-purple-400"
    },
    {
        id: 3,
        role: "Maintenance Worker",
        company: "Impala Canada",
        period: "05/2022 – 03/2023",
        description: "Inspected equipment and buildings, performed repairs, and maintained vehicles.",
        color: "text-cyan-400"
    },
    {
        id: 4,
        role: "Custodial Staff",
        company: "Ras Maintenance Services",
        period: "06/2020 – 04/2022",
        description: "Performed routine maintenance, ensured building security, and provided customer service.",
        color: "text-emerald-400"
    },
];

export default function Experience() {
    return (
        <section id="experience" className="relative py-24 overflow-hidden">
            <GridPattern />

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[40%] right-[-5%] w-[35vw] h-[35vw] bg-lime-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>

            {/* Floating Elements */}
            <FloatingShape className="top-10 left-[5%] text-purple-400/20" delay={0}>
                <Briefcase size={40} />
            </FloatingShape>
            <FloatingShape className="bottom-20 right-[10%] text-lime-400/20" delay={2}>
                <Clock size={48} />
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
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime-400/10 text-lime-400 rounded-full mb-6 ring-1 ring-lime-400/50">
                                <MapPin size={14} className="fill-current" />
                                <span className="text-xs font-bold font-mono uppercase tracking-widest">My Path</span>
                            </div>

                            <div className="relative">
                                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-zinc-900 dark:text-white mb-2">
                                    CAREER
                                </h2>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent to-black/50 dark:to-white/50"></div>
                                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-body font-light text-zinc-500 dark:text-slate-400 italic">
                                        Timeline
                                    </h2>
                                    <div className="h-px w-8 md:w-24 bg-gradient-to-l from-transparent to-black/50 dark:to-white/50"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Timeline */}
                        <div className="relative w-full max-w-4xl mx-auto pl-8 md:pl-0">
                            {/* Vertical Line */}
                            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/20 dark:via-white/20 to-transparent -translate-x-1/2 hidden md:block" />
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/20 dark:via-white/20 to-transparent md:hidden" />

                            <div className="space-y-12">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Center Dot */}
                                        <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-900 dark:bg-slate-900 border-2 border-lime-500 dark:border-lime-400 z-10 shadow-[0_0_10px_rgba(132,204,22,0.5)]">
                                            <div className="absolute inset-0 rounded-full bg-lime-500 dark:bg-lime-400 animate-ping opacity-20"></div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="w-full md:w-1/2 pl-8 md:pl-0">
                                            <GlassCard className="p-6 md:p-8 hover:bg-white/70 dark:hover:bg-white/5 transition-colors border-zinc-200 dark:border-white/5 group">
                                                <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-slate-400">
                                                    <Calendar size={14} className="text-lime-600 dark:text-lime-400" />
                                                    <span>{exp.period}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">{exp.role}</h3>
                                                <h4 className={`text-lg font-medium mb-4 ${exp.color} font-display`}>{exp.company}</h4>
                                                <p className="text-zinc-600 dark:text-slate-400 font-light leading-relaxed font-body">
                                                    {exp.description}
                                                </p>
                                            </GlassCard>
                                        </div>

                                        {/* Empty Side for alignment */}
                                        <div className="hidden md:block w-1/2" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollSection>
            </Container>
        </section>
    );
}

// Global Components (could be imported)
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
