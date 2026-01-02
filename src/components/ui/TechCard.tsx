"use client";

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionStyle, TargetAndTransition, VariantLabels } from 'framer-motion';

// --- 3D Card Component ---
export interface TechCardProps {
    title: string;
    icon: React.ElementType;
    items: { name: string; icon: React.ElementType }[];
    colorTheme: 'purple' | 'cyan' | 'emerald';
    index: number;
    position: number; // For Hero stack logic
    total: number;
    // New props for external control in Overlay
    style?: MotionStyle;
    className?: string;
    animate?: TargetAndTransition | VariantLabels;
}

export const TechCard = React.forwardRef<HTMLDivElement, TechCardProps>(({ title, icon: Icon, items, colorTheme, index, position, total, style, className, animate }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Only apply mouse interaction if it's the front card in the stack (position === 0) 
    // AND if no external animation is overriding it (implies it's in the Hero stack mode mostly)
    const isInteractive = position === 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isInteractive) return;
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

    const theme = themes[colorTheme] || themes.purple;

    return (
        <motion.div
            ref={ref}
            layout
            // If `animate` prop is provided, let it control the component completely.
            // Otherwise fall back to the internal stack logic.
            animate={animate || {
                y: position * -30,
                x: position * 15,
                scale: 1 - position * 0.05,
                opacity: position === 0 ? 1 : 0.5,
                zIndex: 30 - position * 10,
                rotateZ: position === 0 ? 0 : (index % 2 === 0 ? 6 : -6),
                filter: position === 0 ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
                rotateX: isInteractive ? rotateX : 0,
                rotateY: isInteractive ? rotateY : 0,
                transformStyle: "preserve-3d",
                ...style
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`w-full max-w-[480px] aspect-video rounded-3xl backdrop-blur-xl border ${theme.border} bg-gradient-to-br ${theme.gradient} ${theme.shadow} cursor-pointer origin-center ${className || ''}`}
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
            {/* Glossy overlay */}
            <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent ${isInteractive ? 'opacity-0 hover:opacity-100' : 'opacity-0'}`} />
        </motion.div>
    );
});

TechCard.displayName = "TechCard";
