// app/providers.tsx
"use client"; // 

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey="pk_test_Y29vbC1rcmlsbC0zNy5jbGVyay5hY2NvdW50cy5kZXYk">
      {children}
    </ClerkProvider>
  );
}
