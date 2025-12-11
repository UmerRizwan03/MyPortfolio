import React from 'react';
import { cn } from '@/lib/utils';
import styles from './GlassCard.module.css';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn(styles.card, className)} {...props}>
                {children}
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";
