"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Circle, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";



export default function HeroGeometric({
    badge = "Umer Rizwan",
}: {
    badge?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const y = useTransform(scrollY, [0, 300], [0, -100]); // Parallax effect: move up by 100px

    return (
        <div id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background removed to show global DottedSurface */}

            <motion.div
                style={{ opacity, y }}
                className="relative z-10 container mx-auto px-4 md:px-6"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 dark:bg-white/[0.03] border border-border dark:border-white/[0.08] mb-8 md:mb-12"
                    >
                        <Circle className="h-2 w-2 fill-rose-500/80" />
                        <span className="text-sm text-foreground/60 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="font-bold mb-6 md:mb-8 tracking-tight">
                            <div className="mb-2">
                                <TypewriterEffect
                                    words={[
                                        { text: "Web", className: "text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-white/80 dark:to-white/40" },
                                        { text: "Developer", className: "text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-white/80 dark:to-white/40" }
                                    ]}
                                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
                                    cursorClassName="hidden"
                                />
                            </div>
                            <TypewriterEffect
                                words={[
                                    { text: "Enhanced", className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary" },
                                    { text: "by", className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary" },
                                    { text: "AI,", className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary" },
                                    { text: "driven", className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary" },
                                    { text: "by", className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary" },
                                    { text: "expertise", className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary" }
                                ]}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none mt-2"
                                initialDelay={1.5}
                            />
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-foreground/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            Specializing in AI integration, real-world system implementation, and building scalable, user-centric applications.
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center justify-center gap-4"
                    >
                        <Link href="#contact" className="px-8 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors">
                            Contact Me
                        </Link>
                        <Link
                            href="https://github.com/UmerRizwan03"
                            target="_blank"
                            className="p-3 rounded-full bg-secondary dark:bg-white/10 hover:bg-accent dark:hover:bg-white/20 transition-colors text-foreground dark:text-white"
                            aria-label="GitHub Profile"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/"
                            target="_blank"
                            className="p-3 rounded-full bg-secondary dark:bg-white/10 hover:bg-accent dark:hover:bg-white/20 transition-colors text-foreground dark:text-white"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="hidden lg:flex absolute right-12 bottom-0 flex-col items-center gap-6 z-20"
            >
                <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-foreground/20 to-foreground/10 dark:via-white/20 dark:to-white/40" />
                <div className="flex flex-col gap-6 mb-12">
                    <Link
                        href="https://github.com/UmerRizwan03"
                        target="_blank"
                        className="text-foreground/40 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                        aria-label="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/"
                        target="_blank"
                        className="text-foreground/40 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </Link>
                    <Link
                        href="mailto:contact@example.com"
                        className="text-foreground/40 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" />
                    </Link>
                    <Link
                        href="#home"
                        className="text-foreground/40 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                        aria-label="My Logo"
                    >
                        <Image src="/logo.png" alt="Logo" width={24} height={24} className="w-6 h-6 object-contain" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

