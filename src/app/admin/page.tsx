import Link from "next/link";
import { ClubReviewer } from "@/app/admin/components/ClubReviewer";
import RosterTable from "./components/RosterTable";



export default function Home() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4">
        <div className="justify-start">
          <Link href={'./'}>Home</Link>
        </div>
        <div className="justify-center">
          <h1 className="font-bold text-2xl tracking-wider p-3">ClubNest</h1>
        </div>
        <div className="justify-end">
          <a href="https://forms.gle/eiioHTM579rQt3Jq8" target="_blank">
            <button className="font-bold text-xl tracking-wider p-2">Register a New Club</button>
          </a>
        </div>
      </header>

      <div className="mb-auto h-[70vh] w-[85vw] max-w-[1200px] flex flex-col items-center space-y-8">
        {/* Club review panel */}
        <div className="w-full">
          <ClubReviewer />
        </div>

        {/* Roster table */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Club Roster</h2>
          <RosterTable />
        </div>
      </div>

      <footer className="flex items-center justify-center border-t w-[100vw] h-[8vh] bg-[var(--bars)] mt-6">
        <h3 className="text-center justify-center items-center text-[var(--fssgold)]">
          Have any problems? Shoot us an email at{' '}
          <a
            href="mailto:falconsoftwaresolutions27@gmail.com"
            className="underline hover:text-gray-500 transition-colors duration-200"
          >
            falconsoftwaresolutions27@gmail.com
          </a>
        </h3>
      </footer>
    </div>
  );
}
