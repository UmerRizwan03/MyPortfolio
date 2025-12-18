"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

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
                willChange: "transform",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={styles.cardWrapper}
        >
            {/* Spotlight Effect Background */}
            <div
                className={styles.spotlight}
                style={{
                    background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.1), transparent 40%)`
                }}
            />

            <div className={styles.cardContent}>
                {/* 3D Floating Image Area */}
                <motion.div
                    className={styles.imageArea}
                    style={{ translateX: imageX, translateY: imageY, transformStyle: "preserve-3d", translateZ: "50px" }}
                >
                    {project.image.startsWith("/") ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            <span>{project.image}</span>
                        </div>
                    )}
                </motion.div>

                {/* 3D Floating Text Content */}
                <motion.div
                    className={styles.textArea}
                    style={{ translateX, translateY, transformStyle: "preserve-3d", translateZ: "30px" }}
                >
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>

                    <div className={styles.tags}>
                        {project.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Glossy Overlay */}
            <div className={styles.gloss} />
        </motion.div>
    );
};
