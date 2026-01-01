"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "./ui/Container";
import { ProjectCard } from "./ui/ProjectCard";
import { projects } from "../data/projects";
import { ScrollSection } from "./ui/ScrollSection";
import { ProjectDetailsModal } from "./ui/ProjectDetailsModal";
import { Layers, Cpu, Laptop } from "lucide-react";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="relative py-24 overflow-hidden">
            {/* Fonts Injection (if not already global, ensures they load) */}
            <style suppressHydrationWarning>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                .font-display { font-family: 'Syne', sans-serif; }
                .font-body { font-family: 'Space Grotesk', sans-serif; }
                .text-outline { 
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                    color: transparent;
                }
            `}</style>

            <GridPattern />

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-lime-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Floating Elements */}
            <FloatingShape className="top-20 right-[10%] text-lime-400/20" delay={0}>
                <Layers size={48} />
            </FloatingShape>
            <FloatingShape className="bottom-40 left-[5%] text-purple-400/20" delay={2}>
                <Cpu size={56} />
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-md">
                                <span className="text-purple-400 font-mono font-bold animate-pulse">&gt;_</span>
                                <span className="text-xs font-bold font-mono uppercase tracking-widest text-white">System.Portfolio</span>
                            </div>

                            <div className="relative inline-block">
                                <div className="flex flex-col items-center">
                                    <h2 className="text-6xl md:text-8xl font-display font-black text-white tracking-tight relative z-10" style={{ textShadow: "4px 4px 0px #9333ea" }}>
                                        SELECTED
                                    </h2>
                                    <h2 className="text-6xl md:text-8xl font-mono font-bold text-transparent text-outline tracking-tight -mt-4 md:-mt-8 hover:text-lime-400 hover:text-outline-none transition-colors duration-300 cursor-default">
                                        WORKS
                                    </h2>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -left-12 top-1/2 w-8 h-8 border-l-2 border-t-2 border-white/30 hidden md:block"></div>
                                <div className="absolute -right-12 top-1/2 w-8 h-8 border-r-2 border-b-2 border-white/30 hidden md:block"></div>
                            </div>

                            {/* Loading Bar */}
                            <div className="mt-8 mx-auto w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-lime-500 rounded-full" />
                            </div>
                        </motion.div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onClick={(p) => setSelectedProject(p)}
                                />
                            ))}
                        </div>
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

// Background Components
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
