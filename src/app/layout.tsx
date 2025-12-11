import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DottedSurface } from "@/components/ui/DottedSurface";
import { SCurve } from "@/components/ui/SCurve";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umer Rizwan | Full-Stack Web Developer",
  description: "Portfolio of Umer Rizwan, a Full-Stack Web Developer specializing in AI integration and scalable web applications.",
  openGraph: {
    title: "Umer Rizwan | Full-Stack Web Developer",
    description: "Portfolio of Umer Rizwan, a Full-Stack Web Developer specializing in AI integration and scalable web applications.",
    type: "website",
    url: "https://your-domain.com",
    images: ["/portfolio_website.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Rizwan | Full-Stack Web Developer",
    description: "Portfolio of Umer Rizwan, a Full-Stack Web Developer specializing in AI integration and scalable web applications.",
    images: ["/portfolio_website.jpg"],
  },
  metadataBase: new URL("https://example.com"), // REPLACE with your actual domain
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DottedSurface />
          <SCurve />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Umer Rizwan",
                url: "https://example.com", // REPLACE with your actual domain
                image: "https://example.com/profile.png", // REPLACE
                sameAs: [
                  "https://github.com/UmerRizwan03",
                  "https://linkedin.com/in/",
                  // Add other social profiles here
                ],
                jobTitle: "Full-Stack Web Developer",
                worksFor: {
                  "@type": "Organization",
                  name: "Freelance",
                },
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
