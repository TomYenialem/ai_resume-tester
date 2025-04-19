import pdf from "pdf-parse";

export const extractText = async (file: Buffer): Promise<string> => {
  const data = await pdf(file);
  return data.text;
};
