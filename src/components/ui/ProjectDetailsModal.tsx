"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./ProjectDetailsModal.module.css";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    demoLink: string;
    repoLink: string;
    details?: React.ReactNode;
}

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
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{ zIndex: 1000 }} // Ensure it's on top
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                            <X size={20} />
                        </button>

                        <div className={styles.imageContainer}>
                            {project.image.startsWith("/") ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 900px) 100vw, 900px"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                                    {project.image}
                                </div>
                            )}
                        </div>

                        <div className={styles.content}>
                            <div className={styles.header}>
                                <div>
                                    <h2 className={styles.title}>{project.title}</h2>
                                    <div className={styles.tags}>
                                        {project.tags.map((tag) => (
                                            <span key={tag} className={styles.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {project.details ? (
                                <div className={styles.richText}>
                                    {project.details}
                                </div>
                            ) : (
                                <p className={styles.description}>{project.description}</p>
                            )}

                            <div className={styles.links}>
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.linkButton} ${styles.primaryLink}`}
                                    >
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                )}
                                {project.repoLink && (
                                    <a
                                        href={project.repoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.linkButton} ${styles.secondaryLink}`}
                                    >
                                        <Github size={18} /> View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
