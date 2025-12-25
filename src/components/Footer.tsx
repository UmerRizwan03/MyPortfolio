"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Heart, Mail, Linkedin, Instagram, Facebook, MessageCircle } from "lucide-react";
import Container from "./ui/Container";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerBackground} />
            <Container className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.logo}>
                            <Image src="/logo.png" alt="Logo" width={40} height={40} className={styles.logoImage} />
                            <span>Umer Rizwan.</span>
                        </Link>
                        <p className={styles.tagline}>
                            Crafting digital experiences where creativity meets functionality.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Navigation</h3>
                        <nav className={styles.navStack}>
                            <Link href="#about" className={styles.navLink}>About</Link>
                            <Link href="#projects" className={styles.navLink}>Work</Link>
                            <Link href="#skills" className={styles.navLink}>Skills</Link>
                            <Link href="#contact" className={styles.navLink}>Contact</Link>
                        </nav>
                    </div>

                    {/* Social Column */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Connect</h3>
                        <div className={styles.socialStack}>
                            <a href="mailto:srcumer@gmail.com" className={styles.socialLink}>
                                <Mail size={18} /> Email
                            </a>
                            <a href="https://www.linkedin.com/in/umer-rizwan-valiyangadi-abdul-azeez-a68464181" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Linkedin size={18} /> LinkedIn
                            </a>
                            <a href="https://wa.me/917356067820" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <MessageCircle size={18} /> WhatsApp
                            </a>
                            <div className={styles.miniSocials}>
                                <a href="https://www.instagram.com/umer.rizwan3/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.iconLink}>
                                    <Instagram size={18} />
                                </a>
                                <a href="https://www.facebook.com/umer.rizwan.07/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.iconLink}>
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Action Column */}
                    <div className={styles.actionColumn}>
                        <button onClick={scrollToTop} className={styles.backToTop}>
                            Back to Top <ArrowUp size={16} />
                        </button>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        &copy; {currentYear} Umer Rizwan. All rights reserved.
                    </p>

                    <div className={styles.signature}>
                        Designed & Built with <Heart size={14} fill="currentColor" className={styles.heart} /> by Umer
                    </div>
                </div>
            </Container>
        </footer>
    );
}
