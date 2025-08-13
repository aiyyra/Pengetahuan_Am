import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/server/db";
import { pengetahuan_am_score_table } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import slugify from 'slugify';
import { auth } from '@/auth';

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true
};

// Map topic slugs to database fields
const topicMapping: Record<string, keyof typeof pengetahuan_am_score_table.$inferInsert> = {
  'kenegaraan-dan-identiti-nasional-malaysia': 'topicA',
  'struktur-pentadbiran-dan-pemerintahan-malaysia': 'topicB',
  'geografi-malaysia': 'topicC',
  'pengetahuan-geografi-dunia': 'topicD',
};

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { topicSlug, score, totalQuestions } = body;

    if (!topicSlug || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: 'Missing required fields: topicSlug, score, totalQuestions' },
        { status: 400 }
      );
    }

    // Normalize the topic slug
    const normalizedSlug = slugify(topicSlug, slugifyOptions);
    
    // Get the database field for this topic
    const topicField = topicMapping[normalizedSlug];
    
    if (!topicField) {
      return NextResponse.json(
        { error: `Invalid topic slug: ${topicSlug}` },
        { status: 400 }
      );
    }

    // Check if user already has a score record
    const existingScore = await db
      .select()
      .from(pengetahuan_am_score_table)
      .where(eq(pengetahuan_am_score_table.userId, session.user.id))
      .limit(1);

    if (existingScore.length > 0) {
      // Update existing record with maximum score
      const currentScore = Number(existingScore[0][topicField]) || 0;
      const maxScore = Math.max(currentScore, score);

      await db
        .update(pengetahuan_am_score_table)
        .set({
          [topicField]: maxScore,
          updatedAt: new Date(),
        })
        .where(eq(pengetahuan_am_score_table.userId, session.user.id));
    } else {
      // Create new record with default scores for other topics
      const newScoreData = {
        userId: session.user.id,
        topicA: 0,
        topicB: 0,
        topicC: 0,
        topicD: 0,
        [topicField]: score,
      };

      await db
        .insert(pengetahuan_am_score_table)
        .values(newScoreData);
    }

    // Get the final saved score (maximum)
    const finalScore = existingScore.length > 0
      ? Math.max(Number(existingScore[0][topicField]) || 0, score)
      : score;

    return NextResponse.json({
      success: true,
      message: 'Score saved successfully',
      topic: topicField,
      currentScore: score,
      savedScore: finalScore,
      isNewRecord: finalScore > (Number(existingScore[0]?.[topicField]) || 0),
    });

  } catch (error) {
    console.error('Error saving score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
