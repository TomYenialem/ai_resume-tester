export const chunkText = (text: string, chunkSize = 500): string[] => {
  const sentences = text.split(/(?<=[.?!])\s+/); // Better sentence splitting
  let chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length < chunkSize) {
      currentChunk += sentence + " ";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + " "; 
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};
