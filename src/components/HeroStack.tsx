"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
    Code,
    Server,
    Database,
    Cpu,
    Layers,
    Globe,
    Terminal,
    Zap,
    Layout,
    ArrowRight,
    MousePointer2,
    Sparkles,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';

// --- Background Pattern ---
const GridPattern = () => (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
);

// --- Floating Decorative Shapes ---
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

// --- 3D Card Component ---
interface TechCardProps {
    title: string;
    icon: React.ElementType;
    items: { name: string; icon: React.ElementType }[];
    colorTheme: 'purple' | 'cyan' | 'emerald';
    index: number;
    position: number;
    total: number;
}

const TechCard = React.forwardRef<HTMLDivElement, TechCardProps>(({ title, icon: Icon, items, colorTheme, index, position, total }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const isFront = position === 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isFront) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPct = (e.clientX - rect.left) / width - 0.5;
        const mouseYPct = (e.clientY - rect.top) / height - 0.5;
        x.set(mouseXPct);
        y.set(mouseYPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const themes = {
        purple: {
            gradient: "from-[#2a1b3d]/90 to-[#432371]/90",
            border: "border-purple-400/50",
            accent: "text-purple-300",
            highlight: "bg-purple-400",
            shadow: "shadow-[0_20px_60px_-10px_rgba(168,85,247,0.5)]",
            sticker: "bg-[#d4b3ff] text-purple-900",
        },
        cyan: {
            gradient: "from-[#0f303d]/90 to-[#164e63]/90",
            border: "border-cyan-400/50",
            accent: "text-cyan-300",
            highlight: "bg-cyan-400",
            shadow: "shadow-[0_20px_60px_-10px_rgba(34,211,238,0.5)]",
            sticker: "bg-[#a5f3fc] text-cyan-900",
        },
        emerald: {
            gradient: "from-[#064e3b]/90 to-[#065f46]/90",
            border: "border-emerald-400/50",
            accent: "text-emerald-300",
            highlight: "bg-emerald-400",
            shadow: "shadow-[0_20px_60px_-10px_rgba(52,211,153,0.5)]",
            sticker: "bg-[#6ee7b7] text-emerald-900",
        }
    };

    const theme = themes[colorTheme];
    const zIndex = 30 - position * 10;
    // Increase random rotation for "messy stack" look
    const randomRotate = index % 2 === 0 ? 4 : -4;

    return (
        <motion.div
            ref={ref}
            layout
            animate={{
                y: position * -40, // Increased spacing
                x: position * 20,
                scale: 1 - position * 0.05,
                opacity: position === 0 ? 1 : 0.6,
                zIndex: zIndex,
                rotateZ: position === 0 ? 0 : randomRotate,
                // Removed blur filter as it causes high paint costs
                // filter: position === 0 ? 'blur(0px)' : 'blur(4px)',
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
                rotateX: isFront ? rotateX : 0,
                rotateY: isFront ? rotateY : 0,
                transformStyle: "preserve-3d",
                position: 'absolute' as const,
                willChange: "transform, opacity" // Hint browser to promote layer
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`w-full max-w-[450px] aspect-[16/10] rounded-3xl backdrop-blur-2xl border-2 ${theme.border} bg-gradient-to-br ${theme.gradient} ${theme.shadow} cursor-pointer origin-center isolate overflow-hidden`}
        >
            {/* --- GLASS SHINE EFFECT --- */}
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_40%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_100%)] pointer-events-none" />

            {/* --- NOISE TEXTURE --- */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

            {/* --- BACKGROUND WATERMARK --- */}
            <div className="absolute -bottom-12 -right-12 select-none pointer-events-none opacity-10 transform -rotate-12 translate-z-0">
                <span className={`text-[180px] font-black leading-none ${theme.accent} font-display`}>{index + 1}</span>
            </div>

            {/* --- CONTENT CONTAINER --- */}
            <div className="absolute inset-0 p-8 transform-style-3d">

                {/* TOP HEADER ROW */}
                <div className="flex justify-between items-start transform translate-z-20">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${theme.highlight} text-black shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}>
                            <Icon size={26} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">Sector 0{index + 1}</span>
                            <h3 className="text-3xl font-black text-white font-display tracking-wide">{title}</h3>
                        </div>
                    </div>

                    {/* "Sticker" Element */}
                    <div className={`px-3 py-1 rounded-sm rotate-3 transform shadow-md border border-black/10 ${theme.sticker}`}>
                        <span className="text-[10px] font-black font-mono tracking-tighter uppercase">AUTHORIZED</span>
                    </div>
                </div>

                {/* MIDDLE DECORATION */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-z-10" />

                {/* BOTTOM TECH TAGS */}
                <div className="absolute bottom-6 left-8 right-8 flex flex-wrap gap-2 transform translate-z-30">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className="relative group cursor-none"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (i * 0.05) }}
                        >
                            <div className={`px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/15 transition-colors cursor-crosshair shadow-sm`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${theme.highlight}`}></div>
                                    <span className="text-xs font-bold text-white font-body tracking-wide">{item.name}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* MOCK BARCODE */}
                <div className="absolute top-1/2 right-4 w-1 h-12 flex flex-col gap-0.5 opacity-30 transform -translate-y-1/2 translate-z-10">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`w-full bg-white rounded-full ${i % 2 === 0 ? 'h-2' : 'h-0.5'}`} />
                    ))}
                </div>

            </div>

            {/* BORDER GLOW */}
            <div className={`absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ring-2 ring-white/20 pointer-events-none`} />
        </motion.div>
    );
});

TechCard.displayName = "TechCard";

const HeroStack = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 1200);
        return () => clearInterval(interval);
    }, [isHovering]);

    const cards: (TechCardProps & { key?: number })[] = [
        {
            title: "Frontend",
            icon: Layout,
            colorTheme: "purple",
            items: [
                { name: "React & Next.js", icon: Code },
                { name: "Tailwind CSS", icon: Zap },
                { name: "Three.js", icon: Globe },
                { name: "Framer Motion", icon: Layers }
            ],
            index: 0,
            position: 0,
            total: 3
        },
        {
            title: "Backend",
            icon: Server,
            colorTheme: "cyan",
            items: [
                { name: "Node.js", icon: Terminal },
                { name: "Python / Django", icon: Code },
                { name: "GraphQL", icon: Layers },
                { name: "Docker", icon: Cpu }
            ],
            index: 1,
            position: 0,
            total: 3
        },
        {
            title: "Database",
            icon: Database,
            colorTheme: "emerald",
            items: [
                { name: "PostgreSQL", icon: Database },
                { name: "MongoDB", icon: Layers },
                { name: "Redis", icon: Zap },
                { name: "Prisma ORM", icon: Code }
            ],
            index: 2,
            position: 0,
            total: 3
        }
    ];

    const getPosition = (index: number) => {
        const diff = (index - activeIndex + cards.length) % cards.length;
        return diff;
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-transparent text-slate-900 dark:text-slate-200 font-body selection:bg-lime-400 selection:text-black">

            {/* Playful Font Injection */}
            <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Space Grotesk', sans-serif; }
        .text-outline { 
            -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
            color: transparent;
        }
        .dark .text-outline { 
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
            color: transparent;
        }
        .text-outline-lime {
            -webkit-text-stroke: 1px #a3e635;
            color: transparent;
        }
      `}</style>

            <GridPattern />

            {/* --- Vibrant Background Blobs --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-lime-500/10 dark:bg-lime-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            {/* --- Main Interface --- */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 h-screen flex flex-col justify-center py-20 md:py-0">

                {/* Floating Stickers/Elements - Hidden on mobile to reduce clutter */}
                <FloatingShape className="hidden md:block top-20 right-[40%] text-lime-600/30 dark:text-lime-400/20" delay={0}>
                    <Sparkles size={64} />
                </FloatingShape>
                <FloatingShape className="hidden md:block bottom-32 left-10 text-purple-600/30 dark:text-purple-400/20" delay={2}>
                    <div className="w-16 h-16 border-4 border-dashed border-current rounded-full" />
                </FloatingShape>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">

                    {/* LEFT: Playful Typography */}
                    <div className="lg:col-span-7 relative z-20 flex flex-col items-start">

                        {/* Tag */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-6 md:mb-8 backdrop-blur-md"
                        >
                            <div className="w-2 h-2 rounded-full bg-lime-500 dark:bg-lime-400 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-white">Available for work</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="relative space-y-2 w-full"
                        >
                            <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-extrabold text-slate-900 dark:text-white leading-[0.9] md:leading-[0.85] tracking-tighter">
                                BUILDING
                            </h1>
                            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                                <span className="text-3xl sm:text-4xl md:text-6xl font-display italic font-semibold text-lime-600 dark:text-lime-400">the digital</span>
                                <div className="h-[2px] flex-grow bg-slate-900/20 dark:bg-white/20 rounded-full hidden md:block"></div>
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-extrabold leading-[0.9] md:leading-[0.85] tracking-tighter">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-lime-500 dark:from-purple-400 dark:via-pink-400 dark:to-lime-400">FUTURE</span>
                            </h1>
                            <h1 className="absolute top-0 left-0 text-5xl sm:text-7xl md:text-9xl font-display font-extrabold text-outline opacity-30 leading-[0.9] md:leading-[0.85] tracking-tighter pointer-events-none translate-x-1 translate-y-1">
                                BUILDING
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 md:mt-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg font-light leading-relaxed"
                        >
                            I craft immersive web experiences that merge <span className="text-slate-900 dark:text-white font-semibold underline decoration-lime-400 decoration-2 underline-offset-4">art</span> with <span className="text-slate-900 dark:text-white font-semibold underline decoration-purple-400 decoration-2 underline-offset-4">engineering</span>.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mt-8 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto"
                        >
                            {/* Primary Funky Button */}
                            <Link href="#projects" className="flex-1 md:flex-none">
                                <button className="w-full md:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-lime-400 text-black font-bold rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(163,230,53,0.4)]">
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-2 font-display uppercase tracking-wider text-sm">
                                        View Projects <ArrowRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                    </span>
                                </button>
                            </Link>

                            {/* Secondary Outline Button */}
                            <Link href="#contact" className="flex-1 md:flex-none">
                                <button className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-slate-900/20 dark:border-white/20 text-slate-900 dark:text-white font-bold font-display uppercase tracking-wider text-sm hover:bg-slate-900/5 dark:hover:bg-white/10 hover:border-slate-900/40 dark:hover:border-white/40 transition-all flex items-center justify-center gap-2">
                                    <MessageCircle size={18} />
                                    Contact Me
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT: Floating Stack */}
                    <div className="lg:col-span-5 relative h-[350px] md:h-[500px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0 order-first lg:order-last">
                        {/* Spinning Badge - Smaller on mobile */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20px] right-[0px] md:top-[-40px] md:right-[-20px] z-0 pointer-events-none opacity-50 scale-75 md:scale-100"
                        >
                            <svg viewBox="0 0 100 100" width="160" height="160">
                                <defs>
                                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                </defs>
                                <text fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white" fontWeight="bold" letterSpacing="2">
                                    <textPath xlinkHref="#circle">
                                        FULL STACK DEVELOPER • CREATIVE CODER •
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>

                        <div
                            className="relative w-full max-w-[85vw] md:max-w-[500px] h-[220px] md:h-[300px]"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onTouchStart={() => setIsHovering(true)}
                            onTouchEnd={() => setIsHovering(false)}
                        >
                            <AnimatePresence mode='popLayout'>
                                {cards.map((card, index) => {
                                    const position = getPosition(index);
                                    return (
                                        <TechCard
                                            {...card}
                                            key={index}
                                            index={index}
                                            position={position}
                                            total={cards.length}
                                        />
                                    );
                                })}
                            </AnimatePresence>

                            {/* Cursor Hint */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="absolute -bottom-16 md:-bottom-20 left-0 right-0 flex justify-center items-center gap-2 text-[10px] md:text-xs text-lime-600 dark:text-lime-400 font-mono tracking-widest uppercase"
                            >
                                <MousePointer2 size={14} className="animate-bounce" />
                                <span>Hover stack to pause</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Footer - Hidden on very small screens if needed, layout adjusted */}
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-6 right-4 md:right-6 flex justify-between items-end text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-widest pointer-events-none">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-900 dark:text-white">Based in Kochi, India</span>
                        <span className="hidden md:inline">Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex gap-4 md:gap-8 pointer-events-auto">
                        <Link href="https://github.com/UmerRizwan03" target="_blank" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors cursor-pointer text-slate-900 dark:text-white">Github</Link>
                        <Link href="https://linkedin.com/in/" target="_blank" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors cursor-pointer text-slate-900 dark:text-white">LinkedIn</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroStack;
