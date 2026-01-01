"use client";

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/Dock";
import { Home, Package, LayoutGrid, Activity, ScrollText, Mail } from "lucide-react";
import { ThemeToggle } from "./ui/ThemeToggle";

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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
            {/* Glossy Backdrop for the whole dock */}
            <div className="absolute inset-0 bg-black/20 backdrop-filter backdrop-blur-xl rounded-full border border-white/5 -z-10 shadow-2xl"></div>

            <Dock magnification={80} distance={140} panelHeight={64} className="bg-transparent border-none">
                {tabs.map((tab) => (
                    <DockItem
                        key={tab.title}
                        onClick={() => handleTabClick(tab.href)}
                        className="group aspect-square rounded-full bg-white/5 border border-white/5 hover:bg-lime-400/20 hover:border-lime-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                    >
                        <DockLabel className="font-mono text-xs tracking-widest">{tab.title}</DockLabel>
                        <DockIcon>
                            <tab.icon className="h-5 w-5 text-slate-400 group-hover:text-lime-400 transition-colors duration-300" strokeWidth={2} />
                        </DockIcon>
                    </DockItem>
                ))}

                {/* Separator */}
                <div className="w-[1px] h-6 bg-white/10 mx-2 self-center" />

                <DockItem className="group aspect-square rounded-full bg-white/5 border border-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <DockLabel className="font-mono text-xs tracking-widest">Theme</DockLabel>
                    <DockIcon scale={0.9}>
                        <ThemeToggle />
                    </DockIcon>
                </DockItem>
            </Dock>
        </div>
    );
}
