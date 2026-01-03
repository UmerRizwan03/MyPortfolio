"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Container from "./ui/Container";
import { ScrollSection } from "./ui/ScrollSection";
import { skillsData, Skill, SkillCategory } from "@/data/skills";
import { Sparkles, Zap, Code, Database, Layout, Cpu } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

// Chunk skills into groups of 3
const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunked: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
};

const ScrollableSkillGroup = ({ category }: { category: SkillCategory }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Chunk skills into pages of 3
    const pages = chunkArray(category.skills, 3);
    const totalPages = pages.length;

    // Scroll progress mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"] // Tracking full passage of the container through viewport
    });

    // Map scroll progress to page index
    // We want the changes to happen while the element is "sticky" in the center.
    // So we need to map the "sticky" portion of the scroll to the index.
    // However, simplest robust way is to map the entire container scroll progress.
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Calculate relevant scroll segment roughly
        // 0.2 - 0.8 is the main "active" window usually if centered
        // But with a sticky container, we can use simple linear mapping if the height is correct.

        // Simple mapping: 
        const newIndex = Math.min(
            Math.floor(latest * totalPages),
            totalPages - 1
        );
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    });

    if (prefersReducedMotion) {
        return (
            <div className="relative py-12">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                        {category.title}
                    </h3>
                    <div className="h-[1px] flex-1 bg-zinc-300 dark:bg-white/20"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
            </div>
        );
    }

    if (totalPages <= 1) {
        return (
            <div className="relative py-12">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                        {category.title}
                    </h3>
                    <div className="h-[1px] flex-1 bg-zinc-300 dark:bg-white/20"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages[0].map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
            </div>
        )
    }

    // Determine height:
    // We want enough height to scroll through all pages.
    // 100vh = 1 viewport height.
    // We need (totalPages) * scrollDistance.
    // Let's say 50vh scroll distance per page change.
    const scrollDistance = 50;
    const totalHeight = 100 + (totalPages - 1) * scrollDistance;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${totalHeight}vh` }}
        >
            {/* The visible container sticks */}
            <div className="sticky top-[20vh] h-[60vh] flex flex-col justify-start">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                        {category.title}
                    </h3>
                    <div className="h-[1px] flex-1 bg-zinc-300 dark:bg-white/20"></div>

                    {/* Scroll Hint */}
                    {activeIndex === 0 && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="text-xs uppercase tracking-widest text-zinc-400 font-mono"
                        >
                            Scroll to explore
                        </motion.span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {/* Render the 3 placeholders */}
                    {Array.from({ length: 3 }).map((_, slotIndex) => {
                        const skill = pages[activeIndex]?.[slotIndex];

                        // Keep layout stable even if empty (though logic handles this)
                        if (!skill) return <div key={`empty-${slotIndex}`} className="hidden lg:block h-full" />;

                        return (
                            <motion.div
                                key={`${activeIndex}-${skill.name}`}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25, ease: "linear" }}
                                className="h-full w-full"
                            >
                                <SkillCard skill={skill} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Extracted Card Component to ensure exact design preservation
const SkillCard = ({ skill }: { skill: Skill }) => (
    <GlassCard
        className="p-6 h-full group hover:border-lime-500/30 dark:hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1"
    >
        <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 group-hover:bg-lime-500/10 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">
                    <skill.icon size={28} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles size={16} className="text-purple-500" />
                </div>
            </div>

            <h4 className="font-display font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                {skill.name}
            </h4>

            <p className="font-body text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {skill.usage}
            </p>
        </div>
    </GlassCard>
);

export default function Skills() {
    return (
        <section id="skills" className="relative py-32">
            <GridPattern />

            {/* --- Vibrant Background Blobs --- */}
            {/* Wrapper with overflow-hidden to clip blobs without breaking sticky children */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[30%] left-[-10%] w-[40vw] h-[40vw] bg-lime-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] bg-purple-600/10 rounded-full blur-[100px]" />

                {/* Floating Decorative Elements - Moved inside clipped container */}
                <FloatingShape className="top-20 right-[15%] text-lime-600/20 dark:text-lime-400/20" delay={0}>
                    <Code size={48} />
                </FloatingShape>
                <FloatingShape className="bottom-32 left-[10%] text-purple-600/20 dark:text-purple-400/20" delay={2}>
                    <Database size={56} />
                </FloatingShape>
                <FloatingShape className="top-40 left-[5%] text-cyan-600/20 dark:text-cyan-400/20" delay={4}>
                    <Layout size={40} />
                </FloatingShape>
            </div>

            <Container>
                {/* Header is wrapped in ScrollSection for entrance animation */}
                <ScrollSection>
                    <div className="relative z-10 flex flex-col items-center">
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
                            {/* Outline Text Effect */}
                            <h2 className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-outline opacity-30 leading-[0.9] tracking-tighter pointer-events-none translate-x-1 translate-y-1 w-full">
                                TOOLS OF THE <br />
                                TRADE
                            </h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mt-8 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
                            >
                                My preferred weaponry for building <span className="font-medium text-lime-600 dark:text-lime-400">scalable</span>, <span className="font-medium text-purple-600 dark:text-purple-400">beautiful</span>, and <span className="font-medium text-zinc-900 dark:text-white">robust</span> applications.
                            </motion.p>
                        </motion.div>
                    </div>
                </ScrollSection>

                {/* Main Content is OUTSIDE ScrollSection to allow sticky positioning to work */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-full max-w-6xl">
                        {skillsData.map((category) => (
                            <ScrollableSkillGroup key={category.title} category={category} />
                        ))}
                    </div>

                    {/* AI Note - Playful */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-24"
                    >
                        <GlassCard className="px-6 py-3 rounded-full flex items-center gap-3 bg-gradient-to-r from-purple-500/5 to-lime-500/5 border-purple-200/20">
                            <Cpu size={18} className="text-purple-500" />
                            <span className="text-sm font-body text-zinc-600 dark:text-zinc-300">
                                AI is my <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-lime-500">co-pilot</span>, not my autopilot.
                            </span>
                        </GlassCard>
                    </motion.div>
                </div>
            </Container>
        </section>
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
