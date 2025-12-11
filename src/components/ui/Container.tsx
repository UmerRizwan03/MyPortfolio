import React from "react";
import styles from "./Container.module.css";
import { clsx } from "clsx";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return <div className={clsx(styles.container, "px-4", className)}>{children}</div>;
}
