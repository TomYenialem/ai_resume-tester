// utils/pdfParser.ts
import pdf from "pdf-parse";

export const extractTextFromPDF = async (buffer: Buffer) => {
  const data = await pdf(buffer);
  return data.text;
};
