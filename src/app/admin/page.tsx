'use client';

import { ClubReviewer } from "@/app/admin/components/ClubReviewer";
import RosterTableButton from "./components/RosterTableButton";
import ClubsTableButton from "@/app/admin/components/ClubsTableButton";
import {Club, Roster} from "@/lib/definitions";
import {readClubs, readRoster} from "@/lib/firebaseClient";
// import {AdminHelpButton} from "@/app/admin/components/AdminHelpButton";
import {useEffect, useState} from "react";
import { ClubRemoverModal } from "@/app/admin/components/ClubRemover";
import { useRouter } from "next/navigation";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import SendEmailComponent from "./components/EmailSender";
import Footer from "@/app/components/Footer";
import { Link } from "@mui/material";
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
    readClubs().then(setClubs).catch(console.error);
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
          <Link href="/" underline="none">
            <h1 className="font-black text-3xl tracking-wider p-3 cursor-pointer">
              <span className="text-[var(--foreground)]">Club</span>Nest
            </h1>
          </Link>
        </div>
        <div className="absolute right-4">
          <DarkModeToggle/>
        </div>
      </header>

      <div className="mb-auto w-[85vw] flex gap-10 md:gap-0 flex-col md:flex-row flex-1 justify-between">
        <div className="mr-10 h-full flex-1 w-full md:w-auto">
          <ClubReviewer/>
        </div>

        <div className="flex-col justify-start w-full md:w-[275px]">
          {/*<div className="mb-6">*/}
          {/*  <AdminHelpButton/>*/}
          {/*</div>*/}

          <div
            className="bg-[var(--container)] rounded-md border-[var(--border)] border-1 w-full flex flex-col flex-wrap flex-1 p-3 justify-around gap-3 mb-5">
            <p className="text-xl w-full text-center mt-1 mb-2">Admin Panel</p>
            <ClubRemoverModal/>
            <br className="w-0 h-20px"/>
            <ClubsTableButton clubs={clubs}/>
            <RosterTableButton rosters={rosters}/>
          </div>

          <div
              className="bg-[var(--container)] rounded-md border-[var(--border)] border-1 w-full flex flex-col flex-wrap flex-1 p-3 justify-around gap-3">
              <SendEmailComponent clubs={clubs}/>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}