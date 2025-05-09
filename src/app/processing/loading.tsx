export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-12 w-12 text-[#ff4154] mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-[#2e2e2e] mb-2">Analyzing your pitch deck…</h2>
        <p className="text-gray-600 text-lg">This may take a few moments. Please don't close this window.</p>
      </div>
    </main>
  );
} 