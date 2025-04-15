export default function Home() {
  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 min-h-screen flex flex-col">
      {/* Top right login button */}
      <div className="flex justify-end p-4">
        <button className="bg-amber-950 text-white px-4 py-2 hover:bg-amber-900 cursor-pointer rounded-md">
          Login
        </button>
      </div>

      {/* Centered heading and button */}
      <div className="flex  items-center justify-center mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome To TestResume
          </h1>
          <button className="bg-green-950 px-6 py-2 hover:bg-amber-950 text-white cursor-pointer rounded">
            Go Check
          </button>
        </div>
      </div>
    </div>
  );
}
