import { auth } from "@/auth";
import SignIn from "@/components/auth/sign-in-button";
import { SignOut } from "@/components/auth/sign-out-button";
import { Zap } from "lucide-react";
import Link from "next/link";

export function TopNav() {
  async function AuthButton() {
    const session = await auth();

    if (!session?.user) return <SignIn />;

    return <SignOut />;
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <Link href={"/"}>
            <span className="text-xl font-bold">Ayyra</span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#topik"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Topik
            </Link>

            <Link
              href="#rekod"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Rekod
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* <SignedOut>
              <SignInButton>
                <Button variant="ghost" className="hidden md:inline-flex">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
