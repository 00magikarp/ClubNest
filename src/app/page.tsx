import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-center border w-[100vw] h-[10vh] bg-black">
        <h1 className="font-bold text-4xl  tracking-wider">Club Central</h1>
      </header>
      <footer className="flex items-center justify-center border w-[100vw] h-[8vh] bg-black">
        <p>test footer</p>
      </footer>
    </div>
  );
}
