"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
}

export const ScrollSection = ({ children, className }: ScrollSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Opacity: Fade in (0-0.2), Stay visible (0.2-0.8), Fade out (0.8-1)
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Scale: Scale up (0-0.2), Stay normal (0.2-0.8), Scale down (0.8-1)
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    // Y-axis: Move up slightly on entry and exit for parallax feel
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className={cn("w-full relative", className)}
        >
            {children}
        </motion.div>
    );
};
