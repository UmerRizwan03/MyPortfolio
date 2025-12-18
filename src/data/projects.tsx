import React from "react";

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    demoLink: string;
    repoLink: string;
    details: React.ReactNode;
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Cloud-Based Biometric Attendance",
        description: "Real-time biometric attendance solution using ZKTeco F22 devices and Lantime Cloud.",
        tags: ["IoT", "Cloud", "Biometrics", "Automation"],
        image: "/biometric_attendance.PNG",
        demoLink: "https://syasta.lanatime.in/",
        repoLink: "",
        details: (
            <div className="space-y-6 text-foreground/90">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">Freelance Deployment Project | UAE</span>
                </div>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Project Overview</h3>
                    <p className="leading-relaxed">
                        A cloud-based biometric attendance system designed and deployed to automate employee attendance tracking across mobile company buses. The system replaced manual and semi-digital attendance processes with a centralized, real-time biometric solution, improving accuracy, accountability, and operational efficiency across multiple organizations.
                        <br /><br />
                        The solution was implemented in a real-world, high-mobility environment where employees board buses at different locations and times, making traditional attendance systems unreliable and prone to misuse.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Problem Statement</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Manual and proxy attendance resulting in payroll inaccuracies.</li>
                            <li>Delayed attendance reports affecting HR and payroll cycles.</li>
                            <li>No centralized visibility across multiple organizations.</li>
                            <li>Difficulty tracking attendance in mobile environments.</li>
                            <li>High administrative overhead for reconciliation.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Solution Implemented</h3>
                        <p className="text-sm mb-2">
                            A fully automated, cloud-connected biometric attendance system using ZKTeco F22 devices integrated with Lantime Cloud for centralized processing.
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li><strong>Devices:</strong> ZKTeco F22 installed in buses.</li>
                            <li><strong>Platform:</strong> Lantime Cloud for centralized data.</li>
                            <li><strong>Sync:</strong> Real-time logs via cloud.</li>
                            <li><strong>Automation:</strong> Auto-generated HR/payroll reports.</li>
                        </ul>
                    </section>
                </div>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Scale & Deployment Details</h3>
                    <div className="bg-accent/50 p-4 rounded-lg border border-border/50 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Employees</span>
                            <span className="font-semibold">250+ Covered</span>
                        </div>
                        <div>
                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Organizations</span>
                            <span className="font-semibold">3 Companies</span>
                        </div>
                        <div>
                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Environment</span>
                            <span className="font-semibold">Mobile Buses</span>
                        </div>
                        <div>
                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Device</span>
                            <span className="font-semibold">ZKTeco F22</span>
                        </div>
                        <div>
                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Mode</span>
                            <span className="font-semibold">Fingerprint Biometric</span>
                        </div>
                        <div>
                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Data Flow</span>
                            <span className="font-semibold">Device → Cloud → Reports</span>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Key Features</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Real-time biometric attendance capture.</li>
                            <li>Centralized cloud-based monitoring dashboard.</li>
                            <li>Automated daily/weekly/monthly reports.</li>
                            <li>Elimination of proxy and buddy punching.</li>
                            <li>Accurate timestamping for every event.</li>
                            <li>Multi-organization support under single platform.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Impact & Results</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li><strong>90% reduction</strong> in attendance processing time.</li>
                            <li><strong>100% payroll accuracy</strong> achieved post-deployment.</li>
                            <li><strong>Zero proxy attendance</strong> incidents.</li>
                            <li>Faster HR reporting from hours to minutes.</li>
                            <li>Significant reduction in admin workload.</li>
                        </ul>
                    </section>
                </div>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Security & Reliability</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Biometric verification ensured identity authenticity.</li>
                        <li>Centralized cloud storage prevented data tampering.</li>
                        <li>Secure device-to-cloud communication.</li>
                        <li>Consistent uptime and reliable synchronization.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Role & Responsibilities</h3>
                    <p className="mb-2">I handled the project end-to-end, including:</p>
                    <div className="flex flex-wrap gap-2">
                        {["System Architecture", "Device Configuration", "Cloud Integration", "On-site Deployment", "Data Validation", "Client Training"].map((role) => (
                            <span key={role} className="bg-secondary px-2 py-1 rounded text-xs border border-border">{role}</span>
                        ))}
                    </div>
                </section>

                <section className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                    <h3 className="text-lg font-bold mb-1 text-primary">Business Outcome</h3>
                    <p className="text-sm italic">
                        &quot;The solution provided management with complete visibility into workforce attendance across all buses and organizations. Payroll disputes were eliminated, HR operations became faster and more reliable, and the system scaled seamlessly.&quot;
                    </p>
                </section>
            </div>
        )
    },
    {
        id: "2",
        title: "Personal Web Portfolio",
        description: "Custom Next.js + TypeScript portfolio to highlight skills and freelance projects.",
        tags: ["Next.js", "TypeScript", "React"],
        image: "/portfolio_website.jpg",
        demoLink: "https://umerrizwan.netlify.app",
        repoLink: "#",
        details: (
            <div className="space-y-6 text-foreground/90">
                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Overview</h3>
                    <p className="leading-relaxed">
                        A modern, interactive personal portfolio website built to showcase my skills, projects, and experience through a performance-focused and visually expressive interface. The site moves beyond static layouts, combining advanced motion, physics-based interactions, and clean UI design while remaining fast, responsive, and production-ready.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Design & Experience</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Liquid-glass visual language</strong> with frosted glass cards and modals</li>
                        <li>Consistent glassmorphism aesthetic inspired by modern operating systems</li>
                        <li>Clean, minimal UI with strong visual hierarchy</li>
                        <li>Purpose-driven animations, not decorative motion</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Interactions & Features</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Physics-based falling icons</strong> and geometric animations</li>
                        <li>Real-time 3D elements rendered directly in the browser</li>
                        <li>Interactive project cards with expandable detailed modals</li>
                        <li>macOS-style floating dock with a physics-driven lamp</li>
                        <li>Dark and light mode toggle integrated into the UI</li>
                        <li>Fully responsive across desktop, tablet, and mobile devices</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Performance & Reliability</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Built with performance as a core requirement</li>
                        <li>Optimized animations to avoid unnecessary re-renders</li>
                        <li>Verified Core Web Vitals and fast initial load times</li>
                        <li>Graceful degradation on low-powered or older devices</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Contact & Functionality</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Fully functional contact form with real-time feedback</li>
                        <li>Secure email delivery using Resend</li>
                        <li>No exposure of private keys or sensitive data on the client</li>
                    </ul>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Tech Stack</h3>
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold mb-1">Frontend Core</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>Next.js (App Router)</li>
                                    <li>React</li>
                                    <li>TypeScript</li>
                                    <li>Tailwind CSS</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">UI, Animation & Graphics</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>ShadCN UI</li>
                                    <li>Framer Motion</li>
                                    <li>Matter.js</li>
                                    <li>Three.js</li>
                                    <li>Custom animated SVGs</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Backend & Deployment</h3>
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold mb-1">Architecture</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>Modular and maintainable structure</li>
                                    <li>Optimized for Vercel and Firebase</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Future Enhancements</h4>
                                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                    <li>Admin authentication (Planned)</li>
                                    <li>CMS-driven blog (Planned)</li>
                                    <li>Extended cloud integrations</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    },
    {
        id: "3",
        title: "Bewegens Elevators Website",
        description: "Responsive website for an elevator company featuring project showcases.",
        tags: ["Next.js", "Tailwind CSS", "Firebase"],
        image: "/bewegen_website.jpg",
        demoLink: "https://www.bewegens.com",
        repoLink: "https://github.com/UmerRizwan03/BeewegenElevators",
        details: (
            <div className="space-y-6 text-foreground/90">
                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Overview</h3>
                    <p className="leading-relaxed">
                        This is the official corporate website for Bewegen Elevators by Masarat Alalo. The project is a modern, professional, and fully responsive web application built with Next.js and the App Router. Its primary purpose is to showcase the company&apos;s elevator products and services, generate leads through contact and quote request forms, and provide a rich, bilingual user experience for clients in both English and Arabic.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Multi-language Support:</strong> Fully bilingual (English/Arabic) with a seamless language switcher.</li>
                        <li><strong>Interactive Cabin Design Gallery:</strong> Filterable gallery showcasing designs with detailed specifications.</li>
                        <li><strong>Firebase Integration:</strong> Product images and cabin designs hosted and fetched from Firebase Storage.</li>
                        <li><strong>Service Showcase:</strong> Detailed pages for New Installations, Modernization, Repairs, and AMC.</li>
                        <li><strong>Lead Generation Forms:</strong> Validated quote request and contact forms sending inquiries via Resend.</li>
                    </ul>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Tech Stack</h3>
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold mb-1">Frameworks & Languages</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>Next.js (App Router)</li>
                                    <li>TypeScript</li>
                                    <li>Tailwind CSS</li>
                                    <li>ShadCN UI</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Backend & Services</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>Firebase Storage</li>
                                    <li>Resend (Email Service)</li>
                                    <li>Genkit (AI Flows)</li>
                                    <li>Framer Motion</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Architecture & Future</h3>
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold mb-1">Deployment</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>Firebase Hosting</li>
                                    <li>Structured Next.js App Router</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Future Improvements</h4>
                                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                    <li>Headless CMS Integration</li>
                                    <li>Client Portal (Firebase Auth)</li>
                                    <li>Blog Section</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    },
    {
        id: "4",
        title: "Golden Hour Photography",
        description: "WordPress-based portfolio showcasing photography work with optimized galleries.",
        tags: ["WordPress", "Photography", "Portfolio"],
        image: "/goldenhour_photography_website.png",
        demoLink: "https://goldenhourpic.wordpress.com",
        repoLink: "",
        details: (
            <div className="space-y-6 text-foreground/90">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">Photography Portfolio & Business Website</span>
                </div>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Project Overview</h3>
                    <p className="leading-relaxed">
                        Golden Hour is a visually driven photography website designed to showcase professional photography work while maintaining a calm, elegant, and distraction-free browsing experience. The project focuses on letting the imagery take center stage, supported by a clean layout, smooth transitions, and thoughtful performance optimizations.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Problem Statement</h3>
                        <p className="text-sm mb-2">The primary challenge was to create a website that:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Highlighted photography without overwhelming UI elements.</li>
                            <li>Preserved image quality while keeping load times low.</li>
                            <li>Provided a smooth viewing experience across all devices.</li>
                            <li>Reflected the brand&apos;s visual identity and creative tone.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Solution Implemented</h3>
                        <p className="text-sm mb-2">
                            A custom-built photography website with a strong emphasis on layout, spacing, and image presentation.
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Large-format image galleries with intentional spacing.</li>
                            <li>Clean typography to complement visual content.</li>
                            <li>Minimal UI that never competes with the photographs.</li>
                            <li>Subtle motion to guide attention without distraction.</li>
                        </ul>
                    </section>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Key Features</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Curated photo galleries with responsive layouts.</li>
                            <li>High-quality image presentation with optimized loading.</li>
                            <li>Smooth page and section transitions.</li>
                            <li>Clear separation of portfolio, about, and contact sections.</li>
                            <li>SEO-friendly structure for discoverability.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Performance</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Optimized image formats and responsive sizing.</li>
                            <li>Lazy loading for gallery images.</li>
                            <li>Minimal JavaScript overhead.</li>
                            <li>Fast initial page load even with image-heavy content.</li>
                        </ul>
                    </section>
                </div>

                <section>
                    <h3 className="text-xl font-bold mb-2 text-primary">Design & Branding</h3>
                    <p className="leading-relaxed mb-4">
                        Warm, neutral color palette inspired by natural light. Typography chosen to feel modern yet timeless. Layouts designed to emphasize negative space. The overall look supports the “golden hour” theme, evoking warmth, softness, and calm.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Tech Stack</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Modern React-based frontend architecture</li>
                            <li>Tailwind CSS for consistent styling</li>
                            <li>Optimized image handling</li>
                            <li>Lightweight animations</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold mb-2 text-primary">Result</h3>
                        <p className="text-sm">
                            A fast, elegant, and reliable portfolio platform that enhances the photographer&apos;s work rather than competing with it.
                        </p>
                    </section>
                </div>

                <section className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                    <h3 className="text-lg font-bold mb-1 text-primary">Business Outcome</h3>
                    <p className="text-sm italic">
                        &quot;The website provides a professional online presence that photographers can confidently share with clients, agencies, and collaborators. It presents work clearly, loads quickly, and communicates brand quality through restraint rather than excess.&quot;
                    </p>
                </section>
            </div>
        )
    },
];
