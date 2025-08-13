import "server-only";
import { db } from "./db";
import { auth } from "@/auth";
import { pengetahuan_am_score_table } from "./db/schema";
import { and, eq } from "drizzle-orm";

export async function getMyScore() {
  const session = await auth();

  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const score = await db.select().from(pengetahuan_am_score_table).where(
    and(eq(pengetahuan_am_score_table.userId, session.user.id))
  );

  return score;
}
