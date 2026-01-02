"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionContext } from '../contexts/SectionContext';
import { TechCard, TechCardProps } from './ui/TechCard';
import {
    Code, Server, Database, Cpu, Layers, Globe, Terminal, Zap, Layout
} from 'lucide-react';

const CardOverlay = () => {
    const { activeSection } = useSectionContext();
    const [activeIndexSteps, setActiveIndexSteps] = useState(0);

    // Replicate the auto-swapping logic from HeroStack, but only active when in 'hero' mode
    useEffect(() => {
        if (activeSection !== 'hero') return;
        const interval = setInterval(() => {
            setActiveIndexSteps((prev) => (prev + 1) % 3);
        }, 2500);
        return () => clearInterval(interval);
    }, [activeSection]);

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

    const getHeroVariant = (index: number) => {
        // Logic from HeroStack to determine position in stack
        const diff = (index - activeIndexSteps + cards.length) % cards.length;
        // diff is the 'position' (0 = front, 1 = middle, 2 = back)

        return {
            x: "50vw", // Initial offset to right side of screen (desktop)
            y: diff * -30,
            xOffset: diff * 15, // Additional stack offset
            scale: 1 - diff * 0.05,
            opacity: diff === 0 ? 1 : 0.5,
            zIndex: 30 - diff * 10,
            rotateZ: diff === 0 ? 0 : (index % 2 === 0 ? 6 : -6),
            rotateX: 0,
            rotateY: 0,
            filter: diff === 0 ? 'blur(0px)' : 'blur(2px)',
        };
    };

    // Define animation states for each section
    const getVariant = (index: number) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

        switch (activeSection) {
            case 'hero':
                const heroState = getHeroVariant(index);
                if (isMobile) {
                    // Mobile adjustments for Hero
                    return {
                        x: 0,
                        y: 0 + heroState.y,
                        scale: heroState.scale * 0.8,
                        opacity: heroState.opacity,
                        zIndex: heroState.zIndex,
                        rotateZ: heroState.rotateZ,
                        filter: heroState.filter,
                        left: "50%",
                        top: "50%",
                        translateX: "-50%",
                        translateY: "-20%", // Move up a bit to not cover text depending on mobile layout
                        position: "fixed"
                    };
                }
                return {
                    // Using fixed positioning relative to viewport
                    left: "auto",
                    right: "10%",
                    top: "50%",
                    x: heroState.xOffset,
                    y: heroState.y, // center vertically roughly
                    translateX: "0%",
                    translateY: "-50%",
                    scale: heroState.scale,
                    opacity: heroState.opacity,
                    zIndex: heroState.zIndex,
                    rotateZ: heroState.rotateZ,
                    filter: heroState.filter,
                    width: "480px",
                    position: "fixed"
                };

            case 'about':
                // Scatter to corners
                const positionsAbout = [
                    { top: "15%", right: "5%", rotate: 12 },
                    { bottom: "15%", left: "5%", rotate: -12 },
                    { top: "40%", left: "-10%", rotate: 5 } // Partially offscreen
                ];
                const posA = positionsAbout[index % 3];
                return {
                    left: posA.left || "auto",
                    right: posA.right || "auto",
                    top: posA.top || "auto",
                    bottom: posA.bottom || "auto",
                    x: 0,
                    y: 0,
                    translateX: "0%",
                    translateY: "0%",
                    scale: 0.6,
                    opacity: 0.3,
                    zIndex: 0,
                    rotateZ: posA.rotate,
                    filter: "blur(4px)",
                    position: "fixed"
                };

            case 'skills':
                // Float near top or around
                const positionsSkills = [
                    { top: "10%", left: "10%", rotate: -5 },
                    { top: "20%", right: "10%", rotate: 5 },
                    { bottom: "10%", right: "30%", rotate: 15 }
                ];
                const posS = positionsSkills[index % 3];
                return {
                    left: posS.left || "auto",
                    right: posS.right || "auto",
                    top: posS.top || "auto",
                    bottom: posS.bottom || "auto",
                    x: 0,
                    y: 0,
                    scale: 0.5,
                    opacity: 0.2, // Very subtle
                    zIndex: 0,
                    rotateZ: posS.rotate,
                    filter: "blur(5px)",
                    position: "fixed"
                };

            case 'projects':
                // Move to sides to frame content
                const isEven = index % 2 === 0;
                return {
                    left: isEven ? "-5%" : "auto",
                    right: isEven ? "auto" : "-5%",
                    top: `${30 + index * 20}%`,
                    x: 0,
                    y: 0,
                    scale: 0.6,
                    opacity: 0.4,
                    zIndex: 0,
                    rotateZ: isEven ? 10 : -10,
                    filter: "blur(3px)",
                    position: "fixed"
                };

            case 'experience':
                // Align near center axis but deep background
                return {
                    left: "50%",
                    top: `${20 + index * 25}%`,
                    x: index % 2 === 0 ? -300 : 300,
                    translateX: "-50%",
                    y: 0,
                    scale: 0.5,
                    opacity: 0.15,
                    zIndex: 0,
                    rotateZ: index * 10,
                    filter: "blur(6px)",
                    position: "fixed"
                };

            case 'contact':
                // Converge
                return {
                    left: "50%",
                    top: "50%",
                    x: (index - 1) * 60, // Cluster center
                    y: (index - 1) * 20,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: 0.4,
                    opacity: 0.1,
                    zIndex: 0,
                    rotateZ: (index - 1) * 5,
                    filter: "blur(8px)",
                    position: "fixed"
                };

            default:
                // Hide or retreat
                return { opacity: 0 };
        }
    };

    if (typeof window === 'undefined') return null; // Client side only

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <AnimatePresence>
                {cards.map((card, i) => (
                    <TechCard
                        key={i}
                        {...card}
                        animate={getVariant(i)}
                        className="fixed transition-all duration-1000 ease-in-out"
                        style={{
                            pointerEvents: activeSection === 'hero' && i === activeIndexSteps ? 'auto' : 'none' // Only interactive in Hero
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CardOverlay;
