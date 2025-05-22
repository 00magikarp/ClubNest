'use client';

import { getClubs } from "@/lib/localstorage";
import { SelectionButtonRow } from "@/app/components/SelectionButtonRow";
import {useEffect, useState} from "react";
import {Club, TYPES} from "@/lib/objects";
import { ClubBox } from "@/app/components/ClubBox";
import { DropDown } from "@/app/components/DropDown";
import Skeleton from '@mui/material/Skeleton';


// const clubs: Club[] = [
//   { name: "Club 1", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 2", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 3", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 4", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 5", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 6", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 7", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 8", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 9", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club 0", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club A", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club B", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club C", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club D", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
//   { name: "Club E", sponsors_name: ["Sponsor 1", "Sponsor 2"], sponsors_contact: ["sponsor1@gmail.com", "sponsor2@gmail.com"], student_leads_name: ["Student Lead 1", "Student Lead 2"], student_leads_contact: ["student1@mcpsmd.net", "student2@mcpsmd.net"], type: "Type", description: "Description", location: "Location", time: "Time", other: "Other Info" },
// ];

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    getClubs().then(setClubs).catch(console.error);
  }, []);


  const [selectedType, setSelectedType] = useState<string | null>('All');
  const handleTypeChange = (data: string) => {
    setSelectedType(data);
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


  return (

    <div className="flex flex-col justify-start items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between border-b w-[100vw] h-[10vh] bg-[var(--bars)] mb-6 pl-4 pr-4">
        <div className="justify-center">
          <h1 className="font-bold text-2xl tracking-wider p-3">Club Central</h1>
        </div>
        <div className="justify-end">
          <a href="https://forms.gle/eiioHTM579rQt3Jq8" target="_blank">
            <button className="font-bold text-xl tracking-wider p-2">Register a New Club</button>
          </a>
        </div>
      </header>

      <div className={"flex mb-auto h-[100%] w-[90vw] p-5 justify-center"}>
        <div className="block lg:hidden">
          <DropDown passToPageAction={handleTypeChange}
          formControlClass={"w-[90vw]"}
          inputLabelStyle={{
            color: 'var(--fssgold)',
            fontWeight: 'bold',
            fontSize: '1.3em',
          }}
          dropDownTextClass={"w-full text-center text-[var(--fssgold)]"}>

          </DropDown>
        </div>
        <div className="hidden lg:block">
          <SelectionButtonRow passToPageAction={handleTypeChange}></SelectionButtonRow>
        </div>
      </div>

      <div className={"mb-auto h-[100%] w-[85vw] max-w-[1200px] flex flex-row flex-grow flex-wrap justify-center content-start"}>
        {
          clubsDisplayed.length === 0 ? (
              Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="m-4">
                    <Skeleton variant="rectangular" width={210} height={118} />
                  </div>
              ))
          ) : (
              clubsDisplayed.map((club: Club, idx: number) => (
                  <ClubBox key={idx} club={club} />
              ))
          )
        }




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
