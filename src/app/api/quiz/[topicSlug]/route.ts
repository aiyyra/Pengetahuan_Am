import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import slugify from 'slugify';

import { FormattedQuestion } from "@/types";

// ✅ Helper function to read and parse CSV
const getQuestionsFromCSV = async (): Promise<FormattedQuestion[]> => {
  const filePath = path.join(process.cwd(), 'data', 'bank_soalan_dari_buku.csv');

  return new Promise((resolve, reject) => {
    const results: FormattedQuestion[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        try {
          results.push({
            id: data.id,
            kategori: data.kategori,
            subKategori: data.subKategori,
            tahap: data.tahap,
            soalan: data.soalan,
            pilihan: [
              data.pilihan_A,
              data.pilihan_B,
              data.pilihan_C,
              data.pilihan_D,
            ],
            jawapan: data.pilihan_A,
            penerangan: data.penerangan,
          });
        } catch (err) {
          console.error('Failed to parse row:', err);
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

const options = {
  lower: true,      // convert to lowercase
  strict: true,     // remove special characters
  trim: true        // remove leading/trailing spaces
};

// ✅ App Router API handler
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ topicSlug: string }> },
) {
  const params = await context.params;
  const topicSlug = params.topicSlug;

  try {
    const allQuestions = await getQuestionsFromCSV();
    const normalizedSlug = slugify(decodeURIComponent(topicSlug), options);

    // Normalize and match kategori
    const filtered = allQuestions.filter(
      (q) => slugify(q.kategori, options) === normalizedSlug
    );

    return NextResponse.json({ questions: filtered });
  } catch (error) {
    console.error('Error reading CSV:', error);
    return NextResponse.json(
      { error: 'Failed to load quiz data' },
      { status: 500 }
    );
  }
}

