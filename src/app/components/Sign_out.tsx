
"use client";

import { useClerk } from "@clerk/nextjs";

export default function App() {
  const { signOut, user } = useClerk();
  return (
    <div>
      <h1 className="text-white mb-2">Hello {user?.fullName}</h1>
      <button onClick={() => signOut()}
        className="bg-amber-950 text-white px-4 py-2 hover:bg-amber-900 cursor-pointer rounded-md"
        >Sign Out</button>
    </div>
  );
}
