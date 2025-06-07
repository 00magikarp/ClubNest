'use client';

import {useEffect, useState} from "react";
import {Club} from "@/lib/objects";
import {getClubs} from "@/lib/localstorage";
import {Accordion, AccordionDetails, AccordionSummary, Button, Tooltip} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ClubReviewBox} from "@/app/admin/components/ClubReviewBox";
import {deleteClub, updateClub} from "@/lib/firebaseClient";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

async function approve(c: Club): Promise<void> {
  const newClub: Club = {
    ...c,
    approved: 2
  }
  await updateClub(newClub, c);
}

async function deny(c: Club): Promise<void> {
    await deleteClub(c);
}

async function archive(c: Club): Promise<void> {
  const newClub: Club = {
    ...c,
    approved: 1
  };
  await updateClub(newClub, c);
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

    async function handleArchive(club: Club) {
        await archive(club);
        setClubs(prev => prev.filter(c => c.name != club.name));
    }

    const clubsforApproval = clubs.filter(c => c.approved === 0);
    const clubsforRenewal = clubs.filter(c => c.approved === 1);

    return (
        <div
            className="w-full max-w-[1200px] flex flex-col space-y-2 justify-start">
            <div
                className="w-full h-[550px] bg-[var(--container)] rounded-md border-[var(--border)] border-1 flex flex-col flex-wrap items-start justify-start p-4 mb-3 overflow-x-scroll gap-2">
                <p className="text-2xl w-full text-center mt-2 mb-3">Club Approval Panel</p>
                {
                    clubsforApproval.length !== 0 ? (
                        clubsforApproval.map((club: Club, idx: number) => (
                            <div key={idx}
                                 className="bg-[var(--mid)] border-1 border-[var(--border)] rounded-md flex-none m-2 shadow-xl/30 w-[clamp(200px,20vw,250px)]">
                                <ClubReviewBox key={idx} club={club}/>
                                <div className="flex flex-row w-full justify-evenly items-center mb-2 mt-0.5">
                                    <Tooltip title="Approve">
                                        <Button
                                            onClick={() => handleApprove(clubsforApproval[idx])}
                                            variant="outlined"
                                            color={"success"}>
                                            <CheckBoxIcon
                                                className="text-green-600  transition-colors duration-200"/>
                                        </Button>
                                    </Tooltip>

                                    <Tooltip title="Archive">
                                        <Button
                                            onClick={() => handleArchive(clubsforApproval[idx])}
                                            variant="outlined"
                                            color={"warning"}>
                                            <ArchiveIcon
                                                className="text-yellow-600  transition-colors duration-200"/>
                                        </Button>
                                    </Tooltip>

                                    <Tooltip title="Deny">
                                        <Button
                                            onClick={() => handleDeny(clubsforApproval[idx])}
                                            variant="outlined"
                                            color={"error"}>
                                            <ThumbDownIcon
                                                className="text-red-600  transition-colors duration-200"/>
                                        </Button>
                                    </Tooltip>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-md w-full text-center">No clubs to be approved!</p>
                    )
                }
            </div>

            <Accordion sx={{
                backgroundColor: 'var(--container)',
                border: '1px solid var(--border)',
                borderRadius: '0.375rem',
                maxWidth: '1200px',
                width: '100%',
                marginTop: 4,
                marginBottom: 4
            }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{ color: 'var(--foreground)', padding: '1rem'}}>
                    <p className="text-lg">See archived clubs...</p>
                </AccordionSummary>

                <AccordionDetails sx={{padding: 0, maxHeight: 550, overflowY: 'auto'}}>
                    <div
                        className="w-full h-full max-h-[550px] rounded-md flex flex-col flex-wrap items-start justify-start p-4 mb-3 gap-2 overflow-x-scroll overflow-y-none">
                        {
                            clubsforRenewal.length !== 0 ? (
                                clubsforRenewal.map((club: Club, idx: number) => (
                                    <div key={idx}
                                         className="bg-[var(--mid)] border-1 border-[var(--border)] rounded-md flex-none m-2 shadow-xl/30 w-[clamp(200px,20vw,250px)]">
                                        <ClubReviewBox club={club}/>
                                        <div className="flex flex-row w-full justify-evenly items-center mb-2 mt-0.5">
                                            <Tooltip title="Restore">
                                              <Button
                                                  variant={"outlined"}
                                                  color={"success"}
                                                  onClick={() => handleApprove(club)}>
                                                <UnarchiveIcon/>
                                              </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                              <Button
                                                  variant={"outlined"}
                                                  color={"error"}
                                                  onClick={() => handleDeny(club)}>
                                                <DeleteForeverIcon className="text-red-600"/>
                                              </Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-400 text-md w-full text-center">No clubs archived!</span>
                            )
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}