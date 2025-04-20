// app/api/process-resume/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { extractTextFromPDF } from "@/app/components/utils/pdfParser";
import { chunkText } from "@/app/components/utils/textChunker";
import { getEmbeddings } from "@/app/components/utils/embedder";
import { storeEmbeddings } from "@/app/components/utils/storeEmbeddings";


// Set up Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Make sure this one has read access
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;

    // 1. 🔽 Download PDF from Supabase Storage
    const { data, error } = await supabase.storage
      .from("resumetester") 
      .download(file_key);

    if (error || !data) {
      throw new Error("Failed to download PDF");
    }

    const buffer = await data.arrayBuffer();
    const pdfBuffer = Buffer.from(buffer);

    // 2. 📄 Extract text
    const text = await extractTextFromPDF(pdfBuffer);

    // 3. ✂️ Chunk it
    const chunks = chunkText(text);

    // 4. 🧠 Get embeddings
    const embeddings = await getEmbeddings(chunks);

    // 5. 🌲 Store in Pinecone
    await storeEmbeddings(chunks, embeddings);

    // 6. ✅ Respond with proof
    return NextResponse.json({
      status: 200,
      message: "Resume processed and stored successfully",
      chunksStored: chunks.length,
      file_name,
    });
  } catch (error) {
    console.error("❌ Error in resume processing:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
