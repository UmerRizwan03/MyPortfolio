"use client";

import Link from "next/link";
import { ArrowUp, Heart, Mail, Linkedin, Instagram, Facebook, MessageCircle } from "lucide-react";
import Container from "./ui/Container";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="relative py-12 bg-black/40 border-t border-white/5 backdrop-blur-md mt-0">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Umer Rizwan.</h3>
                        <p className="text-slate-500 font-body text-sm">
                            Crafting digital experiences where creativity meets functionality.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <SocialLink href="mailto:srcumer@gmail.com" icon={Mail} />
                        <SocialLink href="https://www.linkedin.com/in/umer-rizwan-valiyangadi-abdul-azeez-a68464181" icon={Linkedin} />
                        <SocialLink href="https://wa.me/917356067820" icon={MessageCircle} />
                        <SocialLink href="https://www.instagram.com/umer.rizwan3/" icon={Instagram} />
                        <SocialLink href="https://www.facebook.com/umer.rizwan.07/" icon={Facebook} />
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-mono text-white"
                    >
                        Back to Top
                        <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
                    <p>
                        &copy; {currentYear} Umer Rizwan. All rights reserved.
                    </p>

                    <div className="flex items-center gap-1">
                        Designed & Built with <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" /> by Umer
                    </div>
                </div>
            </Container>
        </footer>
    );
}

const SocialLink = ({ href, icon: Icon }: any) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-white transition-colors hover:scale-110 active:scale-95 transform duration-200"
    >
        <Icon size={20} />
    </a>
)
