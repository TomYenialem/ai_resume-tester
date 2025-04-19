import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
       <div className="relative h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 min-h-screen">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SignUp/>
          </div>
        </div>
  )
 
}
