import "./globals.css";
import Providers from "./Providers"; // client component
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Resume Tester",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
