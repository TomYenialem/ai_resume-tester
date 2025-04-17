import QueryProviders from "./components/QueryProviders";
import "./globals.css";
import Providers from "./Providers"; // client component
import type { Metadata } from "next";
import {Toaster} from 'react-hot-toast'


export const metadata: Metadata = {
  title: "Resume Tester",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProviders>

    <html
      lang="en"
      className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster/>
      </body>
    </html>

    </QueryProviders>
  );
}
