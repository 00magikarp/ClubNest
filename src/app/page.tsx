'use client';

import {getClubs} from "@/lib/localstorage";
import {useEffect, useState} from "react";
import JoinForm from "./components/JoinForm";
import {SelectionButtonRow} from "@/app/components/SelectionButtonRow";
import {Club, TYPES} from "@/lib/objects";
import {ClubBox} from "@/app/components/ClubBox";
import {SearchBar} from "@/app/components/SearchBar"
import {LoginPage} from "@/app/components/LoginPage";
import {ClubWriter} from "@/app/components/ClubWriter";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import Skeleton from '@mui/material/Skeleton';
import {NoClubsFound} from "@/app/components/NoClubsFound";
import {SlideInText, SlideInNode, FadeInNode} from "@/app/components/SlideIn";

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
    if (data === null) setSelectedType("All");
    else setSelectedType(data);
  }

  let clubsDisplayed: Club[] = [];
  if (selectedType == "All") {
    clubsDisplayed = clubs;
  } else if (selectedType == "Other") {
    clubs.forEach((c: Club) => {
      if (!TYPES.includes(c.type)) clubsDisplayed.push(c);
    });
  } else {
    clubs.forEach((c: Club) => {
      if (selectedType == c.type) clubsDisplayed.push(c);
    });
  }
  if (searchQuery.trim() !== "") {
    clubsDisplayed = clubsDisplayed.filter((club: Club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  clubsDisplayed = clubsDisplayed.filter((c: Club) => c.approved === 2)

  return (
    <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4 z-1">
        <div className="justify-start">
          <LoginPage/>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="font-bold text-2xl tracking-wider p-3 cursor-pointer"
              onClick={() => setSelectedType(null)}>ClubNest</h1>
        </div>
        <div className="absolute right-4">
          {/*<DarkModeToggle/>*/}
        </div>
      </header>

      <div className="flex flex-col flex-grow w-full items-center">
        {
          !selectedType ? (
            <div className="flex flex-col justify-center mb-auto">
              <SlideInText text="Welcome to ClubNest" className="text-3xl text-center mt-4 mb-5 text-shadow-lg/30"
                           duration={0.5}/>
              <div className="w-[80dvw] max-w-[1300px] h-full flex flex-row flex-wrap gap-10 justify-center mt-10">
                {
                  TYPES.map((type: string, idx: number) => (
                    <FadeInNode
                      key={idx}
                      node={
                        <button
                          key={type}
                          className="w-[clamp(200px,16vw,275px)] h-[125px] transform transition-transform duration-200 hover:scale-105 cursor-pointer bg-[var(--mid)] border-1 border-[var(--fssgold)] rounded-2xl shadow-xl/30"
                          onClick={() => setSelectedType(type)}>
                          <p className="text-xl font-bold text-[var(--fssgold)]">{type}</p>
                        </button>
                      }
                      duration={(idx + 1) * 0.2}
                    />
                  ))
                }
              </div>
            </div>
          ) : (
            <div>
              <SlideInNode
                node={
                  <div className={"max-w-[90dvw] ml-2 mr-2"}>
                    <SelectionButtonRow passToPageAction={handleTypeChange} initialState={selectedType}/>
                  </div>
                }
                duration={0.2}
              />

              <SlideInNode
                node={
                  <div
                    className={"flex mb-auto h-[100%] max-w-[90dvw] pt-5 pb-5 pl-2 pr-2 justify-center items-center"}>
                    <div
                      className="w-full max-h-[50px] flex flex-3 flex-row justify-between items-center">
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


              <div
                className={"mt-2 mb-auto h-[100%] w-[90vw] flex flex-row flex-grow flex-wrap justify-center content-start"}>
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
                      <FadeInNode
                        key={idx}
                        node={<ClubBox key={idx} club={club}/>}
                        duration={(idx + 1) * 0.05 < 2 ? (idx + 1) * 0.05 : 2}
                      />
                    ))
                  )
                }
              </div>
            </div>
          )
        }
      </div>

      <footer className="flex items-center justify-center border-t w-[100vw] h-[8vh] bg-[var(--bars)] mt-6 z-1">
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
