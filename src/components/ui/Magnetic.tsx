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

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();

        if (rect) {
            const { height, width, left, top } = rect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            position.x.set(middleX * strength);
            position.y.set(middleY * strength);
        }
    };

    const handleMouseLeave = () => {
        position.x.set(0);
        position.y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};
