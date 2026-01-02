"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent } from "react";

interface MagneticProps {
    children: React.ReactNode;
    strength?: number; // How strong the magnetic pull is (default: 0.5)
}

export const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const position = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    const springSpecs = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(position.x, springSpecs);
    const springY = useSpring(position.y, springSpecs);

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { width, height, left, top } = rect;
            // Store dimensions in a ref or let variable outside, but for simplicity we can just capture it here
            // using a closure wouldn't work if the element moves, but for a magnetic button it's usually static during hover.
            // Better to use a ref to store it.
            return { width, height, left, top };
        }
        return null;
    };

    // We need state or ref to hold the rect during the hover session
    const rectRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

    const onMouseEnter = () => {
        if (ref.current) {
            const { width, height, left, top } = ref.current.getBoundingClientRect();
            rectRef.current = { width, height, left, top };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        // Fallback or safety check
        if (!rectRef.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = rectRef.current;

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        position.x.set(middleX * strength);
        position.y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        position.x.set(0);
        position.y.set(0);
        rectRef.current = null; // Clear cache
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};
