import {Club, ClubButton} from "@/app/ClubButton";

const clubs: Club[] = [
  { name: "Club 1", sponsor: "Mr. Foo", members: ["1"]},
  { name: "Club 2", sponsor: "Ms. Bar", members: ["2"]},
  { name: "Full Club", sponsor: "Dr. Baz", members: ["3", "4"], type: "Academic"}
];

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-center border w-[100vw] h-[10vh] bg-[var(--bars)]">
        <h1 className="font-bold text-4xl tracking-wider justify-start">Club Central</h1>
        <a href="https://www.google.com" target="_blank">
          <button className="font-bold text-2xl tracking-wider justify-end">Register a New Club</button>
        </a>
      </header>

      <div className="club-layout flex flex-row justify-center items-center flex-wrap w-[80vw]">
        {
          clubs.map((club, idx) => (
            <ClubButton key={idx} club={club} />
          ))
        }
      </div>

      <footer className="flex items-center justify-center border w-[100vw] h-[8vh] bg-[var(--bars)]">
        <p>test footer</p>
      </footer>
    </div>
  );
}
