'use client';

export default function Error({error, reset}: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center text-center items-center h-[100vh]">
      <h2 className="text-4xl">Something went wrong!</h2>
      <p className="text-red-400">{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}