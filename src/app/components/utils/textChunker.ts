// utils/textChunker.ts
export const chunkText = (text: string, chunkSize = 500): string[] => {
  const sentences = text.split(/\.\s+/);
  let chunks: string[] = [];
  let currentChunk = "";

  for (let sentence of sentences) {
    if ((currentChunk + sentence).length < chunkSize) {
      currentChunk += sentence + ". ";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + ". ";
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};
