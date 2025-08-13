import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Zap, Twitter, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";
import { TopNav } from "./_components/topnav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayyra - Streamline Your Workflow",
  description:
    "Automate repetitive tasks, boost team productivity, and focus on what matters most with Ayyra.",
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
        {/* Header */}
        <TopNav />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Ayyra</span>
                </div>
                <p className="text-gray-400">
                  Streamline your workflow and boost productivity with our
                  powerful automation platform.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product</h3>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    API
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company</h3>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Support</h3>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Status
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Ayyra. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
