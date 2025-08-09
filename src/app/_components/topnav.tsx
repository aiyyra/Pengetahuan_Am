import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Zap } from "lucide-react";
import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Ayyra</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Features
          </Link>

          <Link
            href="#contact"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Get Started
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
