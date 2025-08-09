import { pengetahuan_am_score_table } from "@/server/db/schema";

export type FormattedQuestion = {
  id: string;
  kategori: string;
  subKategori: string;
  tahap: string;
  soalan: string;
  pilihan: string[];
  jawapan: string;
  penerangan: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  subCategory: string;
  level: string;
};

export type QuizData = {
  title: string;
  topicSlug: string;
  questions: QuizQuestion[];
};

export type PengetahuanAmScore = typeof pengetahuan_am_score_table.$inferSelect;
