"use client";

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/Dock";
import { Home, Package, LayoutGrid, Activity, ScrollText, Mail } from "lucide-react";
import styles from "./Dock.module.css";

export default function DockNavigation() {
    const tabs = [
        { title: "Home", icon: Home, href: "#home" },
        { title: "Projects", icon: Package, href: "#projects" },
        { title: "Skills", icon: LayoutGrid, href: "#skills" },
        { title: "Experience", icon: Activity, href: "#experience" },
        { title: "About", icon: ScrollText, href: "#about" },
        { title: "Contact", icon: Mail, href: "#contact" },
    ];

    const handleTabClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={styles.dock}>
            <Dock magnification={80} distance={140} panelHeight={68}>
                {tabs.map((tab) => (
                    <DockItem
                        key={tab.title}
                        onClick={() => handleTabClick(tab.href)}
                        className="aspect-square rounded-full bg-[#1a1a1a] border border-white/5 hover:bg-[#2a2a2a] transition-colors"
                    >
                        <DockLabel>{tab.title}</DockLabel>
                        <DockIcon>
                            <tab.icon className="h-2/3 w-2/3 text-white" strokeWidth={2.5} />
                        </DockIcon>
                    </DockItem>
                ))}
            </Dock>
        </div>
    );
}
