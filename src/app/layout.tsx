import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DottedSurface } from "@/components/ui/DottedSurface";
import { SCurve } from "@/components/ui/SCurve";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Umer Rizwan | Full-Stack Web Developer",
  description: "Portfolio of Umer Rizwan, a Full-Stack Web Developer specializing in AI integration and scalable web applications.",
  metadataBase: new URL("https://umerrizwan.com"),
  openGraph: {
    title: "Umer Rizwan | Full-Stack Web Developer",
    description: "Portfolio of Umer Rizwan, a Full-Stack Web Developer specializing in AI integration and scalable web applications.",
    type: "website",
    url: "https://umerrizwan.com",
    images: ["/portfolio_website.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Rizwan | Full-Stack Web Developer",
    description: "Portfolio of Umer Rizwan, a Full-Stack Web Developer specializing in AI integration and scalable web applications.",
    images: ["/portfolio_website.jpg"],
  },
  alternates: {
    canonical: "https://umerrizwan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
                url: "https://umerrizwan.com",
                image: "https://umerrizwan.com/profile.png",
                sameAs: [
                  "https://github.com/UmerRizwan03",
                  "https://linkedin.com/in/umer-rizwan-valiyangadi-abdul-azeez-a68464181",
                  "https://instagram.com/umer.rizwan3"
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
