import OpenAI from "openai";

export const getEmbeddings = async (texts: string[]) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });
  

  const embeddings = await Promise.all(
    texts.map(async (text) => {
      const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      });
      return res.data[0].embedding;
    })
  );

  return embeddings;
};
