import { ReactNode } from "react";
import { signIn } from "@/auth";
import { Button } from "../ui/button";

type SignInProps = {
  children?: ReactNode;
};

export default function SignIn({ children }: SignInProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      {children ? (
        children
      ) : (
        <Button variant="ghost" className="hidden md:inline-flex" type="submit">
          Sign In
        </Button>
      )}
    </form>
  );
}
