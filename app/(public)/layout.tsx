import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../../app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProjectModalProvider } from "@/hooks/useProjectModal";
import { ProjectInquiryModal } from "@/components/ui/ProjectInquiryModal";
import { ProjectModalWrapper } from "@/components/ui/ProjectModalWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kirynex - Digital Alchemy | We Build the Future of Tech",
    template: "%s | Kirynex"
  },
  description: "Kirynex combines world-class engineering with Apple-level design aesthetics. We craft digital experiences that define brands. Specializing in Web Development, Mobile Apps, AI Integration, Product Design, and Tech Consulting.",
  keywords: [
    "Kirynex",
    "Digital Agency",
    "Web Development",
    "Mobile App Development",
    "AI Integration",
    "Product Design",
    "Tech Consulting",
    "React",
    "Next.js",
    "Software Development",
    "UI/UX Design",
    "Digital Transformation"
  ],
  authors: [{ name: "Kirynex" }],
  creator: "Kirynex",
  publisher: "Kirynex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kirynex.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Kirynex',
    title: 'Kirynex - Digital Alchemy | We Build the Future of Tech',
    description: 'Kirynex combines world-class engineering with Apple-level design aesthetics. We craft digital experiences that define brands. Specializing in Web Development, Mobile Apps, AI Integration, Product Design, and Tech Consulting.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kirynex - Digital Alchemy | We Build the Future of Tech',
        type: 'image/jpeg',
      },
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kirynex - Digital Alchemy | We Build the Future of Tech',
        type: 'image/png',
      },
    ],
    countryName: 'India',
    emails: ['kirynex1@gmail.com'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kirynex - Digital Alchemy | We Build the Future of Tech',
    description: 'Kirynex combines world-class engineering with Apple-level design aesthetics. We craft digital experiences that define brands.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ProjectModalProvider>
          <Navbar />
          {children}
          <Footer />
          <ProjectModalWrapper />
        </ProjectModalProvider>
      </body>
    </html>
  );
}
