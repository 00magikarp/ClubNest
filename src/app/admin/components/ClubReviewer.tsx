'use client';

import {useEffect, useState} from "react";
import {Club} from "@/lib/objects";
import {getClubs} from "@/lib/localstorage";
import {Button} from "@mui/material";
import {ClubReviewBox} from "@/app/admin/components/ClubReviewBox";
import {deleteClub, updateClub} from "@/lib/firebaseClient";

async function approve(c: Club): Promise<void> {
  const newClub: Club = {
    ...c,
    approved: true
  }
  await updateClub(newClub);
}

async function deny(c: Club): Promise<void> {
  await deleteClub(c);
}

export function ClubReviewer() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    getClubs(true).then(setClubs).catch(console.error);
  }, []);


  async function handleApprove(club: Club) {
    await approve(club);
    setClubs(prev => prev.filter(c => c.name != club.name));
  }

  async function handleDeny(club: Club) {
    await deny(club);
    setClubs(prev => prev.filter(c => c.name != club.name));
  }

  const clubsForReview = clubs.filter(c => !c.approved);

  return (
    <div
      className="w-[40vw] h-full bg-[var(--mid)] rounded-md border-[var(--fssgold)] border-2 flex flex-col justify-center items-center content-evenly p-4">

      <div
        className={"mb-auto h-[100%] w-[85vw] max-w-[1200px] flex flex-row flex-grow flex-wrap justify-center content-start"}>
        {
          clubsForReview.map((club: Club, idx: number) => (
            <div key={idx} className="border-2 border-[var(--fssgold)] rounded-md">
              <ClubReviewBox key={idx} club={club}/>
              <div className="flex flex-row w-full justify-evenly items-center mb-3">
                <Button onClick={() => {handleApprove(clubsForReview[idx]);}} variant="outlined">Approve</Button>
                <Button onClick={() => {handleDeny(clubsForReview[idx]);}} variant="outlined">Deny</Button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}