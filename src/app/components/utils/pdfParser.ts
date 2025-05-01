const pdf2json = require("pdf2json");

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a new PDFParser instance by calling the function (not using 'new')
    const pdfParser = new pdf2json();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      const pages = pdfData.formImage.Pages;
      let fullText = "";

      pages.forEach((page: any) => {
        page.Texts.forEach((text: any) => {
          // Decode text content
          fullText += decodeURIComponent(text.T) + " ";
        });
        fullText += "\n";
      });

      resolve(fullText.trim());
    });

    // Parse the PDF data
    pdfParser.parseBuffer(pdfBuffer);
  });
}
