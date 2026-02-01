import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quiz App - Interactive Learning Platform",
    template: "%s | Quiz App",
  },
  description:
    "A comprehensive quiz platform to test your knowledge, track your progress, and improve your learning. Take weekly quizzes, review your answers, and monitor your performance.",
  keywords: [
    "quiz",
    "learning",
    "education",
    "online quiz",
    "test",
    "assessment",
    "study",
    "knowledge",
    "progress tracking",
  ],
  authors: [{ name: "Sai Soe San" }],
  creator: "Sai Soe San",
  publisher: "Sai Soe San",
  applicationName: "Quiz App",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Quiz App",
    title: "Quiz App - Interactive Learning Platform",
    description:
      "A comprehensive quiz platform to test your knowledge, track your progress, and improve your learning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quiz App - Interactive Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz App - Interactive Learning Platform",
    description:
      "A comprehensive quiz platform to test your knowledge, track your progress, and improve your learning.",
    images: ["/og-image.png"],
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <Navbar />
          <main>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
