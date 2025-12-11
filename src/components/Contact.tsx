"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Instagram, Facebook, MessageCircle, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import Container from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
import styles from "./Contact.module.css";
import { ScrollSection } from "./ui/ScrollSection";

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
        <section id="contact" className={styles.contact}>
            <Container>
                <ScrollSection>
                    <div className={styles.splitLayout}>
                        {/* LEFT SIDE: INFO & SOCIALS */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={styles.infoSide}
                        >
                            <div className={styles.header}>
                                <h2 className="headline-cafe">Coffee & Code?</h2>
                                <div className={styles.line}></div>
                            </div>

                            <p className={styles.bio}>
                                Have a project in mind or just want to chat about the latest tech?
                                I&apos;m always open to new opportunities and interesting conversations.
                            </p>

                            <div className={styles.socialDock}>
                                <a href="mailto:srcumer@gmail.com" className={styles.socialItem}>
                                    <Mail size={20} className={styles.socialIcon} />
                                    <span className={styles.socialText}>Email</span>
                                </a>

                                <a href="https://wa.me/917356067820" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
                                    <MessageCircle size={20} className={styles.socialIcon} />
                                    <span className={styles.socialText}>WhatsApp</span>
                                </a>

                                <a href="https://www.linkedin.com/in/umer-rizwan-valiyangadi-abdul-azeez-a68464181" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
                                    <Linkedin size={20} className={styles.socialIcon} />
                                    <span className={styles.socialText}>LinkedIn</span>
                                </a>

                                <a href="https://www.instagram.com/umer.rizwan3/" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
                                    <Instagram size={20} className={styles.socialIcon} />
                                    <span className={styles.socialText}>Instagram</span>
                                </a>

                                <a href="https://www.facebook.com/umer.rizwan.07/" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
                                    <Facebook size={20} className={styles.socialIcon} />
                                    <span className={styles.socialText}>Facebook</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* RIGHT SIDE: FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        >
                            <GlassCard className={`${styles.formCard} p-8 md:p-10 !bg-opacity-30 relative overflow-hidden`}>
                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-emerald-400"
                                        >
                                            <CheckCircle size={64} className="mb-4" />
                                            <h3 className="text-2xl font-bold">Message Sent!</h3>
                                            <p className="text-white/70 mt-2">I&apos;ll get back to you soon.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form className={styles.form} onSubmit={sendEmail}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.label}>Name</label>
                                        <input type="text" id="name" name="name" className={styles.input} placeholder="John Doe" required disabled={isLoading} />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.label}>Email</label>
                                        <input type="email" id="email" name="email" className={styles.input} placeholder="john@example.com" required disabled={isLoading} />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message" className={styles.label}>Message</label>
                                        <textarea id="message" name="message" rows={6} className={styles.textarea} placeholder="Tell me about your project..." required disabled={isLoading}></textarea>
                                    </div>

                                    <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {status === "error" && (
                                        <p className="text-rose-500 text-sm mt-3 flex items-center gap-2">
                                            <XCircle size={14} /> Failed to send. Please try again or email me directly.
                                        </p>
                                    )}
                                </form>
                            </GlassCard>
                        </motion.div>
                    </div>
                </ScrollSection>
            </Container>
        </section>
    );
}
