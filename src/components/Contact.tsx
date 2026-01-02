"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Instagram, Facebook, MessageCircle, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import Container from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
import { ScrollSection } from "./ui/ScrollSection";

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json().catch(() => null);

            if (!response.ok) {
                console.error("API Error:", responseData);
                throw new Error(responseData?.error || "Unknown API error");
            }

            setStatus("success");
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Client-side Error:", error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <GridPattern />
            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-[20%] left-[-10%] w-[30vw] h-[30vw] bg-lime-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] right-[-5%] w-[30vw] h-[30vw] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>

            <Container>
                <ScrollSection>
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-20 text-center relative"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full mb-6 ring-1 ring-emerald-400/50">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold font-mono uppercase tracking-widest">Available for hire</span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">
                                    LET&apos;S
                                </h2>
                                <div className="relative group cursor-pointer lg:hover:scale-110 transition-transform duration-300">
                                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-transparent text-outline group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                                        CONNECT
                                    </h2>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-lime-500 dark:bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full -rotate-12 transform translate-y-4">
                                            Click below!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
                            {/* LEFT SIDE: INFO & SOCIALS */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="space-y-8"
                            >
                                <GlassCard className="p-8 h-full flex flex-col justify-between border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-white/5">
                                    <div>
                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Got an idea?</h3>
                                        <p className="text-lg text-zinc-600 dark:text-slate-400 font-light leading-relaxed mb-8">
                                            Whether you have a project in mind or just want to chat about the latest tech, I&apos;m always open to new opportunities and interesting conversations.
                                        </p>
                                    </div>

                                    <div className="grid gap-4">
                                        <SocialLink href="mailto:srcumer@gmail.com" icon={Mail} label="Email Me" sub="srcumer@gmail.com" color="hover:border-lime-400/50 hover:bg-lime-400/10" />
                                        <SocialLink href="https://wa.me/917356067820" icon={MessageCircle} label="WhatsApp" sub="+91 73560 67820" color="hover:border-emerald-400/50 hover:bg-emerald-400/10" />
                                        <div className="grid grid-cols-3 gap-4">
                                            <SocialIcon href="https://www.linkedin.com/in/umer-rizwan-valiyangadi-abdul-azeez-a68464181" icon={Linkedin} />
                                            <SocialIcon href="https://www.instagram.com/umer.rizwan3/" icon={Instagram} />
                                            <SocialIcon href="https://www.facebook.com/umer.rizwan.07/" icon={Facebook} />
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>

                            {/* RIGHT SIDE: FORM */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                <GlassCard className="p-8 md:p-10 relative overflow-hidden border-zinc-200 dark:border-white/5">
                                    <AnimatePresence>
                                        {status === "success" && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-white/95 dark:bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-lime-600 dark:text-lime-400"
                                            >
                                                <CheckCircle size={64} className="mb-6 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]" />
                                                <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white">Message Sent!</h3>
                                                <p className="text-zinc-500 dark:text-slate-400 mt-2 font-mono">I&apos;ll get back to you soon.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form className="space-y-6" onSubmit={sendEmail}>
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-slate-500 ml-1">Name</label>
                                            <div className="relative group">
                                                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${focusedField === 'name' ? 'bg-gradient-to-r from-purple-500/20 to-lime-500/20 blur-md' : 'opacity-0'}`} />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="relative w-full bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/20 focus:outline-none focus:border-zinc-300 dark:focus:border-white/30 transition-all"
                                                    placeholder="John Doe"
                                                    required
                                                    disabled={isLoading}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    aria-label="Your Name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-slate-500 ml-1">Email</label>
                                            <div className="relative group">
                                                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${focusedField === 'email' ? 'bg-gradient-to-r from-purple-500/20 to-lime-500/20 blur-md' : 'opacity-0'}`} />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="relative w-full bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/20 focus:outline-none focus:border-zinc-300 dark:focus:border-white/30 transition-all"
                                                    placeholder="john@example.com"
                                                    required
                                                    disabled={isLoading}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    aria-label="Your Email Address"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-slate-500 ml-1">Message</label>
                                            <div className="relative group">
                                                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${focusedField === 'message' ? 'bg-gradient-to-r from-purple-500/20 to-lime-500/20 blur-md' : 'opacity-0'}`} />
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={4}
                                                    className="relative w-full bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/20 focus:outline-none focus:border-zinc-300 dark:focus:border-white/30 transition-all resize-none"
                                                    placeholder="Tell me about your project..."
                                                    required
                                                    disabled={isLoading}
                                                    onFocus={() => setFocusedField('message')}
                                                    onBlur={() => setFocusedField(null)}
                                                    aria-label="Your Message"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full relative group overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl transition-transform active:scale-95 disabled:opacity-70"
                                            disabled={isLoading}
                                        >
                                            <div className="absolute inset-0 bg-lime-500 dark:bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <div className="relative flex items-center justify-center gap-2">
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        <span>Sending...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                                        <span className="font-display uppercase tracking-widest text-sm">Send Message</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>

                                        {status === "error" && (
                                            <p className="text-rose-500 text-sm mt-3 flex items-center gap-2 justify-center">
                                                <XCircle size={14} /> Failed to send. Please try again.
                                            </p>
                                        )}
                                    </form>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </ScrollSection>
            </Container>
        </section>
    );
}

interface SocialLinkProps {
    href: string;
    icon: React.ElementType;
    label: string;
    sub: string;
    color: string;
}

const SocialLink = ({ href, icon: Icon, label, sub, color }: SocialLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/5 transition-all duration-300 group hover:-translate-y-1 ${color}`}
    >
        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-black/20 flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors">
            <Icon size={20} className="text-zinc-700 dark:text-white" />
        </div>
        <div>
            <div className="text-sm font-bold text-zinc-900 dark:text-white">{label}</div>
            <div className="text-xs text-zinc-500 dark:text-slate-400 font-mono">{sub}</div>
        </div>
    </a>
)

interface SocialIconProps {
    href: string;
    icon: React.ElementType;
}

const SocialIcon = ({ href, icon: Icon }: SocialIconProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 group"
    >
        <Icon size={20} className="text-zinc-500 dark:text-slate-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
    </a>
)

// Shared Components
const GridPattern = () => (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
);
