import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { extractTextFromPDF } from "@/app/components/utils/pdfParser";
import { chunkText } from "@/app/components/utils/textChunker";
import { getEmbeddings } from "@/app/components/utils/embedder";
import { storeEmbeddings } from "@/app/components/utils/storeEmbeddings";

// Set up Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {  file_name } = body;
    const file_key = `public/${file_name}`;


    // const sanitizedFileKey = file_key.replace(/^public\//, ""); // Remove extra "public/" if it's there
    // const fileUrl = `https://yvgdspackklahnixjbsn.supabase.co/storage/v1/object/resumetester/public/${sanitizedFileKey}`;

    // console.log("Full URL to access file:", fileUrl);

    // 1. 🔽 Download PDF from Supabase Storage
    const { data, error } = await supabase.storage
      .from("resumetester")
      .download(file_key); 

    if (error || !data) {
      console.error("Supabase error details:", error); // Log detailed error information
      throw new Error("❌ Failed to download PDF from Supabase.");
    }
    const buffer = await data.arrayBuffer();
    const pdfBuffer = Buffer.from(buffer);

    // 2. 📄 Extract text
    const text = await extractTextFromPDF(pdfBuffer);
    if (!text || text.length < 50) {
      throw new Error("❌ Failed to extract valid text from PDF.");
    }
    console.log("📄 Extracted text length:", text.length);

    // 3. ✂️ Chunk it
    const chunks = chunkText(text);
    console.log("✂️ Total chunks created:", chunks.length);

    // 4. 🧠 Get embeddings
    const embeddings = await getEmbeddings(chunks);
    console.log("🧠 Embeddings generated. Example:", embeddings[0]);

    // 5. 🌲 Store in Pinecone
    await storeEmbeddings(chunks, embeddings);
    console.log("🌲 Embeddings stored successfully in Pinecone.");

    // 6. ✅ Respond with proof
    console.log("✅ Resume processing completed for:", file_name);

    return NextResponse.json({
      status: 200,
      message: "Resume processed and stored successfully",
      chunksStored: chunks.length,
      file_name,
      embeddings: embeddings.slice(0, 3), // limit response for preview
    });
  } catch (error: any) {
    console.error("❌ Error during resume processing:", error.message || error);
    console.log(error);

    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "",
    });
  }
}
