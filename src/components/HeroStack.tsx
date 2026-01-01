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
    icon: any;
    items: { name: string; icon: any }[];
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

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

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
            gradient: "from-purple-500/20 to-indigo-500/20",
            border: "border-purple-500/30",
            text: "text-purple-100",
            iconBg: "bg-purple-500 text-white",
            shadow: "shadow-[0_20px_50px_-12px_rgba(168,85,247,0.4)]"
        },
        cyan: {
            gradient: "from-cyan-500/20 to-blue-500/20",
            border: "border-cyan-500/30",
            text: "text-cyan-100",
            iconBg: "bg-cyan-500 text-black",
            shadow: "shadow-[0_20px_50px_-12px_rgba(6,182,212,0.4)]"
        },
        emerald: {
            gradient: "from-emerald-500/20 to-teal-500/20",
            border: "border-emerald-500/30",
            text: "text-emerald-100",
            iconBg: "bg-emerald-500 text-black",
            shadow: "shadow-[0_20px_50px_-12px_rgba(16,185,129,0.4)]"
        }
    };

    const theme = themes[colorTheme];
    const zIndex = 30 - position * 10;
    const randomRotate = index % 2 === 0 ? 6 : -6;

    return (
        <motion.div
            ref={ref}
            layout
            animate={{
                y: position * -30,
                x: position * 15,
                scale: 1 - position * 0.05,
                opacity: position === 0 ? 1 : 0.5,
                zIndex: zIndex,
                rotateZ: position === 0 ? 0 : randomRotate,
                filter: position === 0 ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
                rotateX: isFront ? rotateX : 0,
                rotateY: isFront ? rotateY : 0,
                transformStyle: "preserve-3d",
                position: 'absolute' as any,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`w-full max-w-[480px] aspect-video rounded-3xl backdrop-blur-xl border ${theme.border} bg-gradient-to-br ${theme.gradient} ${theme.shadow} cursor-pointer origin-center`}
        >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <div className="relative h-full grid grid-cols-5 p-6 gap-4 transform-style-3d items-center">
                <div className="col-span-2 flex flex-col justify-center items-start transform translate-z-20 h-full border-r border-white/5 pr-4">
                    <div className={`w-14 h-14 rounded-full ${theme.iconBg} flex items-center justify-center mb-4 border-4 border-white/5 shadow-xl`}>
                        <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-wide font-display uppercase italic">{title}</h3>
                    <div className="mt-2 px-2 py-1 rounded bg-white/5 text-[10px] text-white/60 font-mono tracking-widest border border-white/5">0{index + 1}</div>
                </div>

                <div className="col-span-3 flex flex-col justify-center space-y-2 transform translate-z-10 pl-2">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (i * 0.05) }}
                        >
                            <div className={`w-2 h-2 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-300 ${theme.iconBg.split(' ')[0]}`} />
                            <span className={`font-medium text-sm md:text-base ${theme.text} font-body tracking-tight`}>{item.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent ${isFront ? 'opacity-0 hover:opacity-100' : 'opacity-0'}`} />
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
        }, 2500);
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
        <div className="relative w-full min-h-screen overflow-hidden bg-transparent text-slate-200 font-body selection:bg-lime-400 selection:text-black">

            {/* Playful Font Injection */}
            <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Space Grotesk', sans-serif; }
        .text-outline { 
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
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-lime-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            {/* --- Main Interface --- */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 h-screen flex flex-col justify-center">

                {/* Floating Stickers/Elements */}
                <FloatingShape className="top-20 right-[40%] text-lime-400/20" delay={0}>
                    <Sparkles size={64} />
                </FloatingShape>
                <FloatingShape className="bottom-32 left-10 text-purple-400/20" delay={2}>
                    <div className="w-16 h-16 border-4 border-dashed border-current rounded-full" />
                </FloatingShape>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* LEFT: Playful Typography */}
                    <div className="lg:col-span-7 relative z-20">

                        {/* Tag */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                        >
                            <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Available for work</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="relative space-y-2"
                        >
                            <h1 className="text-7xl md:text-9xl font-display font-extrabold text-white leading-[0.85] tracking-tighter">
                                BUILDING
                            </h1>
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-4xl md:text-6xl font-display italic font-semibold text-lime-400">the digital</span>
                                <div className="h-[2px] flex-grow bg-white/20 rounded-full hidden md:block"></div>
                            </div>
                            <h1 className="text-7xl md:text-9xl font-display font-extrabold leading-[0.85] tracking-tighter">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-lime-400">FUTURE</span>
                            </h1>
                            <h1 className="absolute top-0 left-0 text-7xl md:text-9xl font-display font-extrabold text-outline opacity-30 leading-[0.85] tracking-tighter pointer-events-none translate-x-1 translate-y-1">
                                BUILDING
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-xl text-slate-400 max-w-lg font-light leading-relaxed"
                        >
                            I craft immersive web experiences that merge <span className="text-white font-semibold underline decoration-lime-400 decoration-2 underline-offset-4">art</span> with <span className="text-white font-semibold underline decoration-purple-400 decoration-2 underline-offset-4">engineering</span>.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mt-12 flex flex-wrap items-center gap-6"
                        >
                            {/* Primary Funky Button */}
                            <Link href="#projects">
                                <button className="group relative px-8 py-4 bg-lime-400 text-black font-bold rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(163,230,53,0.4)]">
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                    <span className="relative z-10 flex items-center gap-2 font-display uppercase tracking-wider text-sm">
                                        View Projects <ArrowRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                    </span>
                                </button>
                            </Link>

                            {/* Secondary Outline Button */}
                            <Link href="#contact">
                                <button className="px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold font-display uppercase tracking-wider text-sm hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-2">
                                    <MessageCircle size={18} />
                                    Contact Me
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT: Floating Stack */}
                    <div className="lg:col-span-5 relative h-[500px] flex items-center justify-center lg:justify-end">
                        {/* Spinning Badge */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-40px] right-[-20px] z-0 pointer-events-none opacity-50"
                        >
                            <svg viewBox="0 0 100 100" width="160" height="160">
                                <defs>
                                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                </defs>
                                <text fontSize="11" fill="white" fontWeight="bold" letterSpacing="2">
                                    <textPath xlinkHref="#circle">
                                        FULL STACK DEVELOPER • CREATIVE CODER •
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>

                        <div
                            className="relative w-full max-w-[500px] h-[300px]"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
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
                                className="absolute -bottom-20 left-0 right-0 flex justify-center items-center gap-2 text-xs text-lime-400 font-mono tracking-widest uppercase"
                            >
                                <MousePointer2 size={14} className="animate-bounce" />
                                <span>Hover stack to pause</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-widest pointer-events-none">
                    <div className="flex flex-col gap-1">
                        <span className="text-white">Based in Kochi, India</span>
                        <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex gap-4 md:gap-8">
                        <Link href="https://github.com/UmerRizwan03" target="_blank" className="hidden md:inline hover:text-lime-400 transition-colors pointer-events-auto cursor-pointer text-white">Github</Link>
                        <Link href="https://linkedin.com/in/" target="_blank" className="hidden md:inline hover:text-lime-400 transition-colors pointer-events-auto cursor-pointer text-white">LinkedIn</Link>
                        <Link href="https://www.instagram.com/umer.rizwan3/" target="_blank" className="hidden md:inline hover:text-lime-400 transition-colors pointer-events-auto cursor-pointer text-white">Instagram</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroStack;
