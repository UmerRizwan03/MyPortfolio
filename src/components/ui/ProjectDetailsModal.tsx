"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Layers, Calendar, Tag as TagIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Project } from "@/data/projects";
import { Magnetic } from "@/components/ui/Magnetic";

interface ProjectDetailsModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && project && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Card */}
                    <motion.div
                        className="relative w-full max-w-6xl h-[100dvh] md:h-[85vh] bg-white/95 dark:bg-zinc-900/95 border-0 md:border border-zinc-200 dark:border-white/10 rounded-none md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row will-change-transform"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* --- DECORATIVE NOISE TEXTURE --- */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />

                        {/* --- CLOSE BUTTON --- */}
                        <div className="absolute top-4 right-4 z-50">
                            <Magnetic strength={0.3}>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-white/50 dark:bg-black/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-full text-zinc-700 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-black/80 transition-all group shadow-sm"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </Magnetic>
                        </div>

                        {/* --- LEFT COLUMN: VISUALS --- */}
                        <div className="relative w-full md:w-[45%] h-[30vh] md:h-full bg-zinc-100 dark:bg-zinc-950 flex-shrink-0 overflow-hidden">
                            {/* Sticker Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20, rotate: -5 }}
                                animate={{ opacity: 1, y: 0, rotate: -5 }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-6 left-6 z-20 px-3 py-1 bg-lime-400 text-black font-mono text-[10px] font-bold tracking-widest uppercase rounded-sm shadow-lg border border-white/20"
                            >
                                Case Study .0{project.id}
                            </motion.div>

                            <div className="w-full h-full relative group">
                                {project.image.startsWith("/") ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-mono text-sm">
                                        [Asset Missing]
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-zinc-900 dark:via-transparent dark:to-transparent opacity-80 md:opacity-40" />
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: CONTENT --- */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-white/50 dark:bg-zinc-900/50">
                            <div className="p-6 md:p-10 pb-32 space-y-6 md:space-y-8">

                                {/* Header */}
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-medium tracking-wide border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white leading-tight tracking-tight">
                                        {project.title}
                                    </h2>
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-gradient-to-r from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-transparent" />

                                {/* Main Description/Content */}
                                <div className="prose prose-base md:prose-lg max-w-none text-zinc-600 dark:text-zinc-300 font-light leading-relaxed prose-headings:text-zinc-900 dark:prose-headings:text-white prose-strong:text-zinc-900 dark:prose-strong:text-white">
                                    {project.details ? project.details : (
                                        <p>{project.description}</p>
                                    )}
                                </div>

                                {/* Actions / Footer */}
                                <div className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-4">
                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[160px] group relative px-6 py-4 bg-lime-400 text-black font-bold rounded-xl overflow-hidden transition-transform hover:-translate-y-1 text-center flex items-center justify-center gap-2"
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                            <span className="relative z-10 flex items-center gap-2 font-display uppercase tracking-wider text-sm">
                                                Live Demo <ArrowUpRight size={18} />
                                            </span>
                                        </a>
                                    )}

                                    {project.repoLink && (
                                        <a
                                            href={project.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[160px] group px-6 py-4 rounded-xl border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white font-bold font-display uppercase tracking-wider text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Github size={18} />
                                            <span>View Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- DECORATIVE BOTTOM BAR --- */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-purple-500 to-lime-400 opacity-50" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
