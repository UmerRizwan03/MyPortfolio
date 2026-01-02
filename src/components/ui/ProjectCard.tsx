"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Project } from "../../data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick?: (project: Project) => void;
}

export const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for tilt
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Parallax effects for inner content (floating feel)
    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

    // Image parallax (moves opposite to content for depth)
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["15px", "-15px"]);

    // Spotlight gradient position
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate normalized position (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        setSpotlightPos({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick(project);
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick && onClick(project)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                cursor: "pointer",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative w-full h-full rounded-3xl bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md shadow-2xl overflow-hidden touch-none flex flex-col"
        >
            {/* Spotlight Effect Background */}
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(163, 230, 53, 0.15), transparent 40%)`
                }}
            />

            <div className="relative z-20 h-full flex flex-col p-5 gap-4">
                {/* 3D Floating Image Area */}
                <motion.div
                    className="relative w-full h-52 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-black/20"
                    style={{ translateX: imageX, translateY: imageY, transformStyle: "preserve-3d", translateZ: "50px" }}
                >
                    {project.image.startsWith("/") ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-slate-800 text-zinc-500 dark:text-slate-400 font-medium">
                            <span>{project.image}</span>
                        </div>
                    )}

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply opacity-50 dark:opacity-100" />
                </motion.div>

                {/* 3D Floating Text Content */}
                <motion.div
                    className="flex flex-col flex-grow"
                    style={{ translateX, translateY, transformStyle: "preserve-3d", translateZ: "30px" }}
                >
                    <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 font-body">{project.description}</p>

                    <div className="mt-auto flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-slate-300 transform transition-transform duration-300 hover:scale-105 hover:bg-lime-400/10 hover:border-lime-400/30 hover:text-lime-600 dark:hover:text-lime-400"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        </motion.div>
    );
};
