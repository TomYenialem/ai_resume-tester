// app/providers.tsx
"use client"; // 

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey="pk_test_dG9wcy10cmVlZnJvZy0yMy5jbGVyay5hY2NvdW50cy5kZXYk">
      {children}
    </ClerkProvider>
  );
}
