"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";
import Container from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
import styles from "./About.module.css";

import { ScrollSection } from "./ui/ScrollSection";

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <Container>
                <ScrollSection>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={styles.header}
                    >
                        <h2 className="headline-code">Behind the Code</h2>
                        <div className={styles.line}></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <GlassCard className="w-full p-8 md:p-12 relative overflow-hidden">
                            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                    className={`${styles.text} flex-1`}
                                >
                                    <h3 className={styles.subheading}>
                                        Simple ideas, beautifully engineered.
                                    </h3>
                                    <p>
                                        I’m Umer, a Full-Stack Developer who enjoys turning simple ideas into fast, scalable and thoughtful digital products. I work with modern tools like Next.js, TypeScript and cloud platforms, focusing on clean architecture and smooth user experience.
                                    </p>
                                    <p>
                                        I love the mix of logic and creativity that comes with building for the web. Whether it’s designing interfaces or engineering backend systems, I care about the details and how everything feels when it all comes together.
                                    </p>
                                    <div className="mt-8">
                                        <a
                                            href="/Umer-Rizwan-Resume.pdf"
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
                                        >
                                            <Download size={20} />
                                            Download Resume
                                        </a>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                    className="relative h-[600px] flex-1"
                                >
                                    <div className="absolute inset-0 flex items-center justify-end">
                                        {/* Glow effect behind the image */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

                                        <Image
                                            src="/profile.png"
                                            alt="Umer Rizwan"
                                            fill
                                            className="object-contain drop-shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                            style={{
                                                maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                                                WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
                                            }}
                                        />

                                        {/* Overlay for color grading/blending */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-20 pointer-events-none mix-blend-overlay" />
                                    </div>
                                </motion.div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </ScrollSection>
            </Container>
        </section>
    );
}
