import { getPineconeClient } from "./pinecone";
import type { PineconeRecord } from "@pinecone-database/pinecone";

export const storeEmbeddings = async (
  chunks: string[],
  embeddings: number[][]
) => {
  const client = getPineconeClient();
  const index = client.index("resumetester");

  const vectors: PineconeRecord[] = chunks.map((chunk, i) => ({
    id: `resume-chunk-${i}`,
    values: embeddings[i],
    metadata: {
      text: chunk, // ✅ this is okay as long as it's a string
    },
  }));

  // ✅ Correct usage: pass array + optional namespace directly
  await index.upsert(vectors);
};
