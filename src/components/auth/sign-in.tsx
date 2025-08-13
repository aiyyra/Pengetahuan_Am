import { ReactNode } from "react";
import { auth } from "@/auth";

type SignedInProps = {
  children: ReactNode;
};

export default async function SignedIn({ children }: SignedInProps) {
  const session = await auth();

  if (!session?.user) return null;

  return <>{children}</>;
}
