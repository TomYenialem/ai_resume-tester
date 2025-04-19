// services/storeInPinecone.ts
import { getPineconeClient } from "@/utils/pinecone";

export const storeEmbeddings = async (
  chunks: string[],
  embeddings: number[][]
) => {
  const client = getPineconeClient();
  const index = client.index("resumetester");

  const vectors = chunks.map((chunk, i) => ({
    id: `resume-chunk-${i}`,
    values: embeddings[i],
    metadata: { text: chunk },
  }));

  await index.namespace("resumes").upsert({ vectors });
};
