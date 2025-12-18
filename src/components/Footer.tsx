"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Heart } from "lucide-react";
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
            <Container className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brandSide}>
                        <Link href="/" className={styles.logo}>
                            <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain mr-2 inline-block" />
                            Umer Rizwan.
                        </Link>
                        <p className={styles.tagline}>
                            Building digital experiences that matter.
                        </p>
                    </div>

                    <nav className={styles.nav}>
                        <Link href="#about" className={styles.navLink}>About</Link>
                        <Link href="#work" className={styles.navLink}>Work</Link>
                        <Link href="#skills" className={styles.navLink}>Skills</Link>
                        <Link href="#contact" className={styles.navLink}>Contact</Link>
                    </nav>

                    <button onClick={scrollToTop} className={styles.backToTop}>
                        Back to Top <ArrowUp size={16} />
                    </button>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        &copy; {currentYear} Umer Rizwan. All rights reserved.
                    </p>

                    <div className={styles.signature}>
                        Designed with <Heart size={14} fill="currentColor" className={styles.heart} /> by Umer
                    </div>
                </div>
            </Container>
        </footer>
    );
}
