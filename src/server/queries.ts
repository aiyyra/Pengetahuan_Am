import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { pengetahuan_am_score_table } from "./db/schema";
import { and, eq } from "drizzle-orm";

export async function getMyScore() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const score = await db.select().from(pengetahuan_am_score_table).where(
    and(eq(pengetahuan_am_score_table.userId, user.userId))
  );

  return score;
}
