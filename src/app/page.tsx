'use client';

import {getClubs} from "@/lib/localstorage";
import {useEffect, useState} from "react";
import JoinForm from "./components/JoinForm";
import {SelectionButtonRow} from "@/app/components/SelectionButtonRow";
import {Club, TYPES} from "@/lib/definitions";
import {ClubBox} from "@/app/components/ClubBox";
import {SearchBar} from "@/app/components/SearchBar"
import {LoginPage} from "@/app/components/LoginPage";
import {ClubWriter} from "@/app/components/ClubWriter";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import Skeleton from '@mui/material/Skeleton';
import {NoClubsFound} from "@/app/components/NoClubsFound";
import {SlideInNode, FadeInNode} from "@/app/components/Animations";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClubs()
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10 * 1_000);

    return () => clearTimeout(timer);
  }, [])

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const handleTypeChange = (data: string | null) => {
    setSelectedType(data ?? "All");
  }

  let clubsDisplayed: Club[] = [];
  if (selectedType === "All") {
    clubsDisplayed = clubs;
  } else {
    clubs.forEach((c: Club) => {
      if (c.type === selectedType) clubsDisplayed.push(c);
    })
  }
  if (searchQuery.trim() !== "") {
    clubsDisplayed = clubsDisplayed.filter((club: Club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  clubsDisplayed = clubsDisplayed.filter((c: Club) => c.approved === 2)

  return (
    <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4">
        <div className="justify-start">
          <LoginPage/>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="font-black text-3xl tracking-wider p-3 cursor-pointer"
              onClick={() => setSelectedType(null)}><span className="text-[var(--foreground)]">Club</span>Nest</h1>
        </div>
        <div className="absolute right-4">
          <DarkModeToggle/>
        </div>
      </header>

      <div className="flex flex-col flex-grow w-full items-center">
        {
          !selectedType ? (
            <div className="flex flex-col justify-center mb-auto pb-8">
              <SlideInNode
                node={
                  <h1 className="font-bold text-3xl !text-[var(--foreground)] text-center tracking-wide mt-4 mb-5 text-shadow-white-500/50">Welcome to Club<span className="text-[var(--fssgold)]">Nest</span></h1>
                }
                duration={0.5}
              />
              <div className="w-[80dvw] max-w-[1300px] h-full flex flex-row flex-wrap gap-10 justify-center mt-10">
                {
                  TYPES.map((type: string, idx: number) => (
                    <FadeInNode
                      key={idx}
                      node={
                        <button
                          key={type}
                          className="w-[clamp(225px,22vw,337px)] h-[140px] transform transition-transform duration-200
                          hover:scale-105 cursor-pointer bg-[var(--mid)] border-1 border-[var(--border)] rounded-2xl
                          shadow-xl/30 text-[var(--fssgold)]"
                          onClick={() => setSelectedType(type)}>
                          <h3 className="text-xl font-bold">{type}</h3>
                        </button>
                      }
                      duration={(idx + 1) * 0.1}
                    />
                  ))
                }
              </div>
            </div>
          ) : (
            <div>
              <FadeInNode
                node={
                  <div className="w-full justify-center items-center">
                    <SelectionButtonRow passToPageAction={handleTypeChange} initialState={selectedType}/>
                  </div>
                }
                duration={0.2}
              />

              <FadeInNode
                node={
                  <div className="w-full pt-5 pb-5 px-2 flex justify-center items-center">
                    <div className="w-full max-h-[50px] flex flex-row justify-between items-center">
                      <div className="w-[300px] h-[50px]">
                        <SearchBar onSearchAction={setSearchQuery}/>
                      </div>
                      <div className="flex flex-row">
                        <JoinForm clubs={clubs}/>
                        <ClubWriter clubs={clubs}/>
                      </div>
                    </div>
                  </div>
                }
                duration={0.4}
              />

              <div className="w-full flex flex-row justify-center">
                <div className="w-[90dvw] mt-2 flex flex-row flex-grow flex-wrap justify-between gap-6 py-1">
                  {
                    loading ? (
                      Array.from({length: 8}).map((_, idx) => (
                        <div key={idx} className="m-4">
                          <Skeleton variant="rectangular" width={210} height={118}/>
                        </div>
                      ))
                    ) : clubsDisplayed.length === 0 ? (
                      <NoClubsFound/>
                    ) : (
                      clubsDisplayed.map((club: Club, idx: number) => (
                        <div key={idx} className="mx-auto">
                          <FadeInNode
                            key={idx}
                            node={<ClubBox key={idx} club={club}/>}
                            duration={(idx + 1) * 0.05 < 1 ? (idx + 1) * 0.05 : 1}
                          />
                        </div>
                      ))
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>

      <Footer/>
    </div>
  );
}
