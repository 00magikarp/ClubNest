'use client';

import Link from "next/link";
import { ClubReviewer } from "@/app/admin/components/ClubReviewer";
import RosterTableButton from "./components/RosterTableButton";
import ClubsTableButton from "@/app/admin/components/ClubsTableButton";
import {Club, Roster} from "@/lib/objects";
import {readRoster} from "@/lib/firebaseClient";
import {getClubs} from "@/lib/localstorage";
import {AdminHelpButton} from "@/app/admin/components/AdminHelpButton";
import {useEffect, useState} from "react";
import { ClubRemoverModal } from "@/app/admin/components/ClubRemover";
import { useRouter } from "next/navigation";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import {LoginPage} from "@/app/components/LoginPage";

export default function Home() {
  const router = useRouter();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [rosters, setRosters] = useState<Roster[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);


  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/checkAuth");
        const data = await res.json();
        if (data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Auth check failed", err);
        router.push("/");
      }
    };
    checkLogin();
  }, [router]);

  useEffect(() => {
    getClubs(true).then(setClubs).catch(console.error);
  }, []);

  useEffect(() => {
    readRoster().then(setRosters).catch(console.error);
  }, []);

  if (!isLoggedIn) {
    return (
        <div className={"w-[100dvw] h-[100dvh] justify-center items-center text-center"}>
          <p className="text-gray-500">Loading authentication...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header
        className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4 z-1">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1
            className="font-bold text-2xl tracking-wider p-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            ClubNest
          </h1>
        </div>
        <div className="absolute right-4">
          <DarkModeToggle/>
        </div>
      </header>

      <div className="mb-auto w-[85vw] flex flex-row flex-1 justify-between">
        <div className="mr-10 h-full flex-1">
          <ClubReviewer/>
        </div>

        <div className="flex-col justify-start w-[275px]">
          <AdminHelpButton/>

          <div
            className="mt-6 bg-[var(--container)] rounded-md border-[var(--mid)] border-2 w-full flex flex-col flex-wrap flex-1 p-3 justify-around gap-3">
            <h2 className="!text-gray-300 text-xl w-full text-center mt-1 mb-2">Admin Panel</h2>
            <ClubRemoverModal/>
            <br className="w-0 h-20px"/>
            <ClubsTableButton clubs={clubs}/>
            <RosterTableButton rosters={rosters}/>
          </div>
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
