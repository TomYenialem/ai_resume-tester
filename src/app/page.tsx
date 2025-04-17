import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FileUpload from "./components/FileUpload"
export default async function Home() {
  const {userId}=await auth();
  const isAuth=!!userId
  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 min-h-screen flex flex-col">
      {/* Top right login button */}
      <div className="flex justify-end p-4">
        {isAuth ? (
          <button className="bg-amber-950 text-white px-4 py-2 hover:bg-amber-900 cursor-pointer rounded-md">
            logout
          </button>
        ) : (
          <button className="bg-amber-950 text-white px-4 py-2 hover:bg-amber-900 cursor-pointer rounded-md">
            logIn
          </button>
        )}
      </div>

      {/* Centered heading and button */}
      <div className="flex  items-center justify-center mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome To TestResume
          </h1>
          <p className="text-white mb-6 text-center">
            Upload your resume PDF to instantly get personalized feedback,
            <br />
            improve your formatting, and see how your resume performs against
            <br />
            modern ATS (Applicant Tracking System) standards. Get suggestions,
            <br />
            ratings, and insights to help you stand out.
          </p>

          {isAuth ? (
            <FileUpload />
          ) : (
            <Link href={"/sign-in"}>
              <button className="bg-green-950 px-6 py-2 hover:bg-amber-950 text-white cursor-pointer rounded">
                Qucik signUp for Checking
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
