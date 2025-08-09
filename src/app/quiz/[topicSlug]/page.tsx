// import { getQuizByTopicSlug } from "@/lib/quiz-data";
// import QuizClient from "./quiz-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { FormattedQuestion, QuizData, QuizQuestion } from "@/types";
import QuizClient from "./quiz-client";

type QuizPageProps = {
  params: Promise<{
    topicSlug: string;
  }>;
};

// Helper function to convert FormattedQuestion to QuizQuestion
function convertToQuizQuestion(
  formattedQuestion: FormattedQuestion
): QuizQuestion {
  return {
    id: formattedQuestion.id,
    question: formattedQuestion.soalan,
    options: formattedQuestion.pilihan,
    correctAnswer: formattedQuestion.jawapan,
    explanation: formattedQuestion.penerangan,
    category: formattedQuestion.kategori,
    subCategory: formattedQuestion.subKategori,
    level: formattedQuestion.tahap,
  };
}

// Helper function to get random questions
function getRandomQuestions(
  questions: QuizQuestion[],
  count: number
): QuizQuestion[] {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questions.length));
}

// Helper function to format topic title
function formatTopicTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const quizTopic = resolvedParams.topicSlug;

  if (!quizTopic) {
    return {
      title: "Quiz Not Found",
      description: "The requested quiz topic does not exist.",
    };
  }

  return {
    title: `${quizTopic} Quiz - Ayyra`,
    description: `Test your knowledge in ${quizTopic} with Ayyra's interactive quiz.`,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const resolvedParams = await params;
  const topicSlug = resolvedParams.topicSlug;

  if (!topicSlug) {
    notFound();
  }

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 300}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/quiz/${topicSlug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch quiz data");
  }

  const data: { questions: FormattedQuestion[] } = await res.json();

  // Convert FormattedQuestions to QuizQuestions
  const allQuizQuestions = data.questions.map(convertToQuizQuestion);

  // Get 10 random questions
  const randomQuestions = getRandomQuestions(allQuizQuestions, 10);

  // Create quiz data object
  const quizData: QuizData = {
    title: formatTopicTitle(topicSlug),
    questions: randomQuestions,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gray-50">
      <QuizClient quizData={quizData} />
    </div>
  );
}
