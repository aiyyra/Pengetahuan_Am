import { ReactNode } from "react";
import { auth } from "@/auth";

type SignedOutProps = {
  children: ReactNode;
};

export default async function SignedOut({ children }: SignedOutProps) {
  const session = await auth();

  if (session?.user) return null;

  return <>{children}</>;
}
