/* eslint-disable */
"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef, useCallback, useState } from "react";

export const ThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Refs for DOM elements
    const svgRef = useRef<SVGSVGElement>(null);
    const stringLineRef = useRef<SVGLineElement>(null);
    const stringHandleRef = useRef<SVGCircleElement>(null);
    const bulbRef = useRef<SVGCircleElement>(null);
    const glowGroupRef = useRef<SVGGElement>(null);
    const lampShadeRef = useRef<SVGGElement>(null);

    // Audio context ref
    const audioCtxRef = useRef<AudioContext | null>(null);

    // Physics constants
    const config = {
        anchorX: 200,
        anchorY: 210,
        restLength: 140,
        maxStretch: 100,
        triggerThreshold: 60,
        springStiffness: 0.15,
        springDamping: 0.8
    };

    // Mutable state for physics
    const state = useRef({
        isDragging: false,
        currentY: config.anchorY + config.restLength,
        velocityY: 0,
        startY: 0,
        offsetY: 0,
    });

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Helper to play sound
    // Helper to play sound
    const playClickSound = useCallback(() => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
            audioCtxRef.current = new AudioContext();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, []);

    // Update SVG attributes visually
    const updateVisuals = useCallback(() => {
        if (!stringLineRef.current || !stringHandleRef.current) return;

        // Update String
        stringLineRef.current.setAttribute('y2', state.current.currentY.toString());
        stringHandleRef.current.setAttribute('cy', state.current.currentY.toString());
    }, []);

    // Apply theme changes to visuals
    useEffect(() => {
        if (!mounted) return;
        const isLightMode = resolvedTheme === 'light';

        if (bulbRef.current && glowGroupRef.current) {
            if (isLightMode) {
                // Light On
                bulbRef.current.setAttribute('fill', 'url(#bulb-gradient)');
                glowGroupRef.current.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out";
                glowGroupRef.current.setAttribute('opacity', '1');
                glowGroupRef.current.setAttribute('transform', 'translate(200, 280) scale(1.2)');
            } else {
                // Light Off
                bulbRef.current.setAttribute('fill', '#444');
                glowGroupRef.current.style.transition = "transform 0.2s ease-in, opacity 0.2s ease-in";
                glowGroupRef.current.setAttribute('opacity', '0');
                glowGroupRef.current.setAttribute('transform', 'translate(200, 280) scale(0)');
            }
        }
    }, [resolvedTheme, mounted]);

    // Handle Toggle Logic
    const toggleLight = useCallback(() => {
        playClickSound();
        console.log("Toggle Light Triggered. Current resolvedTheme:", resolvedTheme);
        const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
        console.log("Setting theme to:", newTheme);
        setTheme(newTheme);
        state.current.velocityY += 20;
    }, [playClickSound, setTheme, resolvedTheme]);

    // Animation Loop
    useEffect(() => {
        if (!mounted) return;
        let animationFrameId: number;

        const animate = () => {
            const s = state.current;
            if (!s.isDragging) {
                const targetY = config.anchorY + config.restLength;
                const displacement = s.currentY - targetY;
                const springForce = -config.springStiffness * displacement;
                const acceleration = springForce;

                s.velocityY += acceleration;
                s.velocityY *= config.springDamping;
                s.currentY += s.velocityY;

                if (Math.abs(displacement) < 0.5 && Math.abs(s.velocityY) < 0.5) {
                    s.currentY = targetY;
                    s.velocityY = 0;
                }
            }

            updateVisuals();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [mounted, updateVisuals, config.anchorY, config.restLength, config.springStiffness, config.springDamping]);


    // Input Handlers
    const onStart = useCallback((clientY: number) => {
        state.current.isDragging = true;
        state.current.startY = clientY;

        if (svgRef.current) {
            const CTM = svgRef.current.getScreenCTM();
            if (CTM) {
                state.current.startY = clientY;
                state.current.offsetY = state.current.currentY;
            }
        }
    }, []);

    const onMove = useCallback((clientY: number) => {
        if (!state.current.isDragging || !svgRef.current) return;

        const CTM = svgRef.current.getScreenCTM();
        let deltaY = 0;

        if (CTM) {
            deltaY = (clientY - state.current.startY) / CTM.d;
        } else {
            deltaY = clientY - state.current.startY;
        }

        let newY = state.current.offsetY + deltaY;

        // Clamp & Elasticity
        if (newY < config.anchorY + config.restLength) {
            newY = config.anchorY + config.restLength;
        }

        const maxLimit = config.anchorY + config.restLength + config.maxStretch;
        if (newY > maxLimit) {
            const extra = newY - maxLimit;
            newY = maxLimit + (Math.log(extra + 1) * 5);
        }

        state.current.currentY = newY;
    }, [config.anchorY, config.restLength, config.maxStretch]);

    const onEnd = useCallback(() => {
        if (!state.current.isDragging) return;
        state.current.isDragging = false;

        const dist = state.current.currentY - (config.anchorY + config.restLength);
        if (dist > config.triggerThreshold) {
            toggleLight();
        }
    }, [toggleLight, config.anchorY, config.restLength, config.triggerThreshold]);

    useEffect(() => {
        if (!mounted) return;
        const handleMouseMove = (e: MouseEvent) => onMove(e.clientY);
        const handleMouseUp = () => onEnd();
        const handleTouchMove = (e: TouchEvent) => {
            if (state.current.isDragging) onMove(e.touches[0].clientY);
        };
        const handleTouchEnd = () => onEnd();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [mounted, onMove, onEnd]);
    if (!mounted) return <div className="w-full h-full" />;

    return (
        <div
            className="w-full h-full relative cursor-pointer"
            title={resolvedTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
            <svg
                ref={svgRef}
                viewBox="0 0 400 600"
                className="w-full h-full overflow-visible"
                style={{ userSelect: 'none' }}
            >
                <defs>
                    <radialGradient id="light-glow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="bulb-gradient" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="100%" stopColor="#eee" />
                    </radialGradient>
                    <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                        <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
                        <feFlood floodColor="#000" floodOpacity="0.2" result="offsetColor" />
                        <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
                        <feMerge>
                            <feMergeNode in="offsetBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g
                    ref={glowGroupRef}
                    id="glow-group"
                    opacity="0"
                    transform="translate(200, 280) scale(0)"
                    style={{ pointerEvents: 'none' }}
                >
                    <circle cx="0" cy="0" r="120" fill="url(#light-glow)" />
                </g>

                <line x1="200" y1="0" x2="200" y2="150" stroke={resolvedTheme === 'light' ? '#333' : '#bbb'} strokeWidth="4" />

                <g
                    ref={lampShadeRef}
                    id="lamp-shade"
                    transform="translate(200, 150)"
                    onClick={toggleLight}
                    className="cursor-pointer"
                >
                    <circle ref={bulbRef} cx="0" cy="60" r="25" fill="#444" id="bulb" />
                    <path d="M -70 60 L -40 0 L 40 0 L 70 60 Z" fill={resolvedTheme === 'light' ? '#333' : '#555'} filter="url(#drop-shadow)" />
                </g>

                <g id="pull-string-group">
                    <line
                        ref={stringLineRef}
                        x1="200" y1="210"
                        x2="200" y2="350"
                        stroke="#888"
                        strokeWidth="2"
                    />
                    <circle
                        ref={stringHandleRef}
                        cx="200" cy="350"
                        r="20"
                        fill="#d32f2f"
                        stroke="#a11a1a"
                        strokeWidth="2"
                        className="cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => onStart(e.clientY)}
                        onTouchStart={(e) => {
                            onStart(e.touches[0].clientY);
                        }}
                    />
                </g>
            </svg>
        </div>
    );
};
