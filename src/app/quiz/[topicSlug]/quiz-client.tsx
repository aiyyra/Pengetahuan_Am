"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { QuizData } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader2,
  ArrowRight,
} from "lucide-react"; // Added Loader2 for loading state and ArrowRight for next question button

type QuizClientProps = {
  quizData: QuizData;
};

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizClient({ quizData }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading

  // Memoize shuffled options for each question to ensure they don't change on re-renders
  const questionsWithShuffledOptions = useMemo(() => {
    return quizData.questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options),
    }));
  }, [quizData.questions]);

  const currentQuestion = questionsWithShuffledOptions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const progressValue =
    ((currentQuestionIndex + (showResults ? 1 : 0)) / totalQuestions) * 100;

  const handleAnswerSelect = useCallback((value: string) => {
    setSelectedAnswer(value);
  }, []);

  const handleSubmitAnswer = useCallback(async () => {
    if (selectedAnswer === null) return;

    setIsSubmitting(true); // Start loading
    // Simulate API call or processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setAnsweredCorrectly(true);
    } else {
      setAnsweredCorrectly(false);
    }
    setShowResults(true);
    setIsSubmitting(false); // End loading
  }, [selectedAnswer, currentQuestion.correctAnswer]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setShowResults(false);
      setAnsweredCorrectly(null);
    } else {
      // Quiz finished, the final results will be displayed
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnsweredCorrectly(null);
  }, []);

  const handleFinishQuiz = useCallback(async () => {
    try {
      // Save the score to database
      const response = await fetch("/api/quiz/save-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicSlug: quizData.topicSlug,
          score: score,
          totalQuestions: totalQuestions,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.isNewRecord) {
          // Could add a toast notification here for new high score
          console.log("New high score achieved!", result.savedScore);
        }
      } else {
        console.error("Failed to save score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }

    // Redirect to homepage
    router.push("/");
  }, [score, totalQuestions, quizData.topicSlug, router]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-emerald-700">
            {quizData.title} Quiz
          </CardTitle>
          <CardDescription className="text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </CardDescription>
          <Progress value={progressValue} className="w-full mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults && (
            <>
              <h3 className="text-xl font-semibold text-gray-800">
                {currentQuestion.question}
              </h3>
              <RadioGroup
                onValueChange={handleAnswerSelect}
                value={selectedAnswer || ""}
                className="space-y-3"
                disabled={isSubmitting} // Disable options during submission
              >
                {currentQuestion.shuffledOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={option} />
                    <label
                      htmlFor={option}
                      className="text-lg text-gray-700 cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {showResults && (
            <div className="space-y-4 text-center">
              {answeredCorrectly ? (
                <div className="flex flex-col items-center text-emerald-600">
                  <CheckCircle className="h-16 w-16 mb-2" />
                  <p className="text-2xl font-bold">Correct!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-red-600">
                  <XCircle className="h-16 w-16 mb-2" />
                  <p className="text-2xl font-bold">Incorrect!</p>
                  <p className="text-lg text-gray-700">
                    The correct answer was:{" "}
                    <span className="font-semibold">
                      {currentQuestion.correctAnswer}
                    </span>
                  </p>
                </div>
              )}
              {currentQuestion.explanation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800 mb-2">
                    Explanation:
                  </p>
                  <p className="text-sm text-blue-700">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-4">
          {!showResults && (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Answer"
              )}
            </Button>
          )}
          {showResults && currentQuestionIndex < totalQuestions - 1 && (
            <Button
              onClick={handleNextQuestion}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Next Question
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {showResults && currentQuestionIndex === totalQuestions - 1 && (
            <div className="w-full text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Quiz Completed!
              </h3>
              <p className="text-xl text-gray-700">
                You scored {score} out of {totalQuestions}
              </p>
              <Button
                onClick={handleFinishQuiz}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Back
                <RefreshCw className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Tracker under the quiz card */}
      {showResults && (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          {answeredCorrectly !== null && (
            <div className="flex items-center justify-center space-x-2">
              {answeredCorrectly ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span
                className={
                  answeredCorrectly ? "text-emerald-600" : "text-red-600"
                }
              >
                {answeredCorrectly ? "Correct!" : "Wrong!"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
