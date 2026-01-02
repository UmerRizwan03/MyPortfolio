"use client";

import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import Image from "next/image";
import Container from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";


import { ScrollSection } from "./ui/ScrollSection";

export default function About() {
    return (
        <section id="about" className="relative py-20 overflow-hidden">
            {/* Playful Font Injection (REMOVED: Loaded globally in layout.tsx) */}

            <GridPattern />

            {/* --- Vibrant Background Blobs --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-lime-500/10 dark:bg-lime-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Floating Decorative Elements */}
            <FloatingShape className="top-10 left-[10%] text-lime-600/20 dark:text-lime-400/20" delay={0}>
                <Sparkles size={48} />
            </FloatingShape>
            <FloatingShape className="bottom-20 right-[5%] text-purple-600/20 dark:text-purple-400/20" delay={1.5}>
                <div className="w-12 h-12 border-4 border-dashed border-current rounded-full" />
            </FloatingShape>

            <Container>
                <ScrollSection>
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="mb-12 relative z-20"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[2px] w-12 bg-lime-500 dark:bg-lime-400 rounded-full"></div>
                                <span className="text-lime-600 dark:text-lime-400 font-mono tracking-widest uppercase text-sm">Who I Am</span>
                            </div>

                            <div className="relative">
                                <h2 className="text-5xl sm:text-7xl md:text-9xl font-display font-extrabold text-transparent text-outline leading-[0.8] tracking-tighter">
                                    BEHIND
                                </h2>
                                <div className="absolute top-[45%] left-[10px] sm:left-[20px] md:left-[40px] rotate-[-5deg] bg-lime-400 px-3 py-1 md:px-8 md:py-2 transform transition-transform hover:rotate-3 hover:scale-105 duration-300 origin-center">
                                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold text-black leading-none tracking-tighter">
                                        THE CODE
                                    </h2>
                                </div>
                            </div>

                            {/* Decorative hidden code element */}
                            <div className="absolute -top-10 -right-10 opacity-10 text-slate-900 dark:text-white font-mono text-xs hidden md:block rotate-12 pointer-events-none">
                                &lt;Developer /&gt;
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <GlassCard className="w-full p-8 md:p-12 relative overflow-hidden border-zinc-200 dark:border-white/10 mx-auto">
                                {/* Mac Window Controls */}
                                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2 z-20">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner"></div>
                                </div>

                                {/* Decorative gradient inside card */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-500/10 blur-3xl rounded-full pointer-events-none"></div>

                                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 font-body text-zinc-600 dark:text-slate-300">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="flex-1 space-y-6"
                                    >
                                        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
                                            Simple ideas, <span className="text-lime-600 dark:text-lime-400 italic font-display">beautifully</span> engineered.
                                        </h3>
                                        <p className="text-lg leading-relaxed font-light">
                                            I’m Umer, a Full-Stack Developer who enjoys turning simple ideas into <strong className="text-zinc-900 dark:text-white font-medium">fast, scalable</strong> and <strong className="text-zinc-900 dark:text-white font-medium">thoughtful</strong> digital products. I work with modern tools like Next.js, TypeScript and cloud platforms, focusing on clean architecture and smooth user experience.
                                        </p>
                                        <p className="text-lg leading-relaxed font-light">
                                            I love the mix of <span className="text-purple-600 dark:text-purple-400 font-medium">logic</span> and <span className="text-lime-600 dark:text-lime-400 font-medium">creativity</span> that comes with building for the web. Whether it’s designing interfaces or engineering backend systems, I care about the details and how everything feels when it all comes together.
                                        </p>

                                        <div className="pt-4">
                                            <a
                                                href="/Umer-Rizwan-Resume.pdf"
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-lime-400 text-black font-bold rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(163,230,53,0.4)]"
                                            >
                                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                                <Download size={20} className="relative z-10" />
                                                <span className="relative z-10 font-display uppercase tracking-wider text-sm">Download Resume</span>
                                            </a>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                        className="relative h-[500px] md:h-[600px] flex-1 w-full"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-end group">
                                            {/* Glow effect behind the image - Updated to match theme */}
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

                                            <Image
                                                src="/profile.png"
                                                alt="Umer Rizwan"
                                                fill
                                                className="object-contain drop-shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500 ease-out hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority
                                                style={{
                                                    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                                                    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
                                                }}
                                            />

                                        </div>
                                    </motion.div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </ScrollSection>
            </Container>
        </section>
    );
}

// --- Background Pattern (Shared) ---
const GridPattern = () => (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
);

// --- Floating Decorative Shapes (Shared) ---
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
