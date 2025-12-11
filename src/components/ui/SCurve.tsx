"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './SCurve.module.css';

export function SCurve() {
    const [pathData, setPathData] = useState<string>('');
    const [pathLength, setPathLength] = useState<number>(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    const SECTION_COUNT = 6;
    const CURVE_COLOR = '#c5a059';

    const generateSinePath = (width: number, height: number, sections: number, amp: number) => {
        const centerX = width / 2;
        const points: string[] = [];
        const steps = 1000;
        const winHeight = window.innerHeight;

        points.push(`M ${centerX} 0`);

        for (let i = 0; i <= steps; i++) {
            const ratio = i / steps;
            const y = ratio * height;

            // Calculate x to cross center at every viewport height (section boundary)
            // We adjust the frequency so it aligns roughly with sections if they were 100vh
            // But since we are mapping to full document height, we might want to just oscillate based on height
            // The original logic: Math.sin((y / winHeight) * Math.PI) * amp
            // This assumes we want a crossing every winHeight.
            const x = centerX + Math.sin((y / winHeight) * Math.PI) * amp;
            points.push(`L ${x} ${y}`);
        }
        return points.join(' ');
    };

    useEffect(() => {
        const handleResize = () => {
            const docHeight = document.documentElement.scrollHeight;
            const winWidth = window.innerWidth;

            setDimensions({ width: winWidth, height: docHeight });

            // Responsive Amplitude
            const waveAmplitude = Math.min(150, winWidth * 0.35);
            const newPath = generateSinePath(winWidth, docHeight, SECTION_COUNT, waveAmplitude);

            setPathData(newPath);
        };

        window.addEventListener('resize', handleResize);
        // Also listen to scroll to update height if content changes dynamically (optional but good)
        // For now, just initial and resize.
        // We can also use a ResizeObserver on document.body
        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(document.body);

        handleResize(); // Initial call

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (pathRef.current && pathData) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, [pathData]);

    useEffect(() => {
        const handleScroll = () => {
            if (!pathRef.current) return;

            const scrollTop = window.scrollY;
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const maxScroll = docHeight - winHeight;

            // Draw SVG Line
            if (pathLength > 0) {
                // We want the line to draw as we scroll.
                // If we want it to be "drawn" up to the current scroll position + some offset?
                // The original code: drawLength = pathLength * (scrollTop / maxScroll)
                // This means at bottom of page, line is fully drawn.
                const drawLength = pathLength * (scrollTop / maxScroll);
                const offset = Math.max(0, pathLength - drawLength);
                pathRef.current.style.strokeDashoffset = offset.toString();
            }

            // Activate Breakpoints
            const centerZone = winHeight / 2;
            let active: number | null = null;

            // Check which section is roughly in the middle
            // Assuming sections are roughly 100vh or distributed evenly?
            // The original code assumed 100vh sections.
            // Let's stick to checking based on viewport multiples for now as it matches the curve generation
            for (let i = 0; i < SECTION_COUNT; i++) {
                const sectionTop = i * winHeight; // This assumes 100vh sections
                // If actual sections are different, this might be misaligned visually with content,
                // but it will align with the curve crossings which are also based on winHeight.
                const relativeY = sectionTop - scrollTop;
                if (Math.abs(relativeY - centerZone) < 150) {
                    active = i;
                    break;
                }
            }
            setActiveIndex(active);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathLength, dimensions]);

    return (
        <div
            ref={containerRef}
            className={styles.container}
            style={{ height: dimensions.height }}
        >
            {/* Straight Center Line */}
            <div className={styles.centerLine} />

            {/* Breakpoints */}
            {Array.from({ length: SECTION_COUNT }).map((_, i) => (
                <div
                    key={i}
                    className={`${styles.breakpoint} ${activeIndex === i ? styles.breakpointActive : ''}`}
                    style={{ top: `${i * 100}vh` }}
                />
            ))}
            {/* Final end dot */}
            <div
                className={`${styles.breakpoint} ${activeIndex === SECTION_COUNT ? styles.breakpointActive : ''}`}
                style={{ top: `${SECTION_COUNT * 100}vh` }}
            />

            {/* SVG Curve */}
            <svg
                ref={svgRef}
                className={styles.svg}
                preserveAspectRatio="none"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >
                <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={CURVE_COLOR} />
                        <stop offset="50%" stopColor="#e0c392" />
                        <stop offset="100%" stopColor={CURVE_COLOR} />
                    </linearGradient>
                </defs>

                {/* Background Trace */}
                <path className={styles.pathBg} d={pathData} />

                {/* Active Drawing Path */}
                <path
                    ref={pathRef}
                    className={styles.pathDraw}
                    d={pathData}
                    stroke="url(#curveGradient)"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset: pathLength
                    }}
                />
            </svg>

            {/* Atmosphere Particles */}
            <div className={styles.particle} style={{ width: 4, height: 4, left: '10%', animationDelay: '0s' }} />
            <div className={styles.particle} style={{ width: 6, height: 6, left: '20%', animationDelay: '5s' }} />
            <div className={styles.particle} style={{ width: 3, height: 3, left: '80%', animationDelay: '2s' }} />
            <div className={styles.particle} style={{ width: 5, height: 5, left: '90%', animationDelay: '8s' }} />
        </div>
    );
}
