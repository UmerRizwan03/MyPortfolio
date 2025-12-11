"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Container from "./ui/Container";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <Container className={styles.container}>
                <div className={styles.content}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.greeting}
                    >
                        Hello, I&apos;m
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={styles.name}
                    >
                        Umer Rizwan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={styles.title}
                    >
                        Full-Stack Web Developer
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={styles.description}
                    >
                        Specializing in AI integration, real-world system implementation, and building scalable, user-centric applications.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className={styles.cta}
                    >
                        <a href="#projects" className={styles.primaryBtn}>
                            View My Work
                        </a>
                        <a href="#contact" className={styles.secondaryBtn}>
                            Contact Me
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className={styles.scrollIndicator}
                >
                    <span className={styles.scrollText}>Scroll Down</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={20} />
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
