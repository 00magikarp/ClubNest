'use client';

import React, { useEffect, useState } from "react";
import { Club } from "@/lib/objects";
import { getClubs } from "@/lib/localstorage";
import {deleteClub, updateClub} from "@/lib/firebaseClient";
import { ModalButton } from "@/app/components/ModalButton";
import { SearchBar } from "@/app/components/SearchBar";
import {Button, Tooltip} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArchiveIcon from "@mui/icons-material/Archive";
import {ClubReviewBox} from "@/app/admin/components/ClubReviewBox";



// Club Removal Box Component - mirrors ClubReviewBox but with only delete button
function ClubRemovalBox({ club, onDelete }: { club: Club; onDelete: (club: Club) => void }) {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${club.name}"? This action cannot be undone.`)) {
            try {
                await deleteClub(club);
                onDelete(club);
            } catch (error) {
                console.error("Error deleting club:", error);
                alert("Failed to delete club. Please try again.");
            }
        }
    };

    const handleArchive = async () => {
        if (window.confirm(`Are you sure you want to archive "${club.name}"?`)) {
            try {
                const newClub: Club = {
                    ...club,
                    approved: 1
                };
                await updateClub(newClub, club);
                onDelete(club);
            } catch (error) {
                console.error("Error archiving club:", error);
                alert("Failed to archive club. Please try again.");
            }
        }
    };

    return (
        <div className="bg-[var(--mid)] border-2 border-[var(--bars)] rounded-2xl flex-none m-2 w-full sm:w-[clamp(200px,20vw,250px)] shadow-xl/30">
            <div>
                <ClubReviewBox club={club}/>
            </div>
            <div className="flex flex-row w-full justify-center items-center mb-2 mt-0.5 gap-2">
                <Tooltip title="Archive">
                    <Button variant={"outlined"} color={"warning"} onClick={handleArchive}>
                        <ArchiveIcon className="text-yellow-600" />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete">
                    <Button variant={"outlined"} color={"error"} onClick={handleDelete}>
                        <DeleteForeverIcon className="text-red-600" />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}



// Main Club Remover Component
    export function ClubRemover() {
        const [clubs, setClubs] = useState<Club[]>([]);
        const [searchQuery, setSearchQuery] = useState<string>('');
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            getClubs()
                .then((fetchedClubs) => {
                    // Only show approved clubs (approved === 2)
                    const approvedClubs = fetchedClubs.filter((club: Club) => club.approved === 2);
                    setClubs(approvedClubs);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching clubs:', error);
                    setLoading(false);
                });
        }, []);

        const handleDeleteClub = (deletedClub: Club) => {
            setClubs(prev => prev.filter(club => club.name !== deletedClub.name));
        };

        // Filter clubs based on search query
        let clubsDisplayed: Club[] = clubs;
        if (searchQuery.trim() !== "") {
            clubsDisplayed = clubs.filter((club: Club) =>
                club.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (loading) {
            return (
                <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
                    <div className="text-gray-400 text-lg">Loading clubs...</div>
                </div>
            );
        }

        return (
            <div className="flex flex-col justify-start items-center w-full max-w-[1200px] mx-auto">
                {/* Search Bar */}
                <div className="w-full max-w-[400px] mt-4 mb-4">
                    <SearchBar onSearchAction={setSearchQuery}/>
                </div>

                {/* Clubs Display Area - mirrors main page without filter bar */}
                <div className="w-full max-w-[1200px] flex flex-col space-y-2 justify-start">
                    <div
                        className="justify-around w-full min-h-[337px] flex flex-row flex-wrap items-start p-4 mb-3 overflow-x-scroll gap-x-1">
                        {
                            clubsDisplayed.length !== 0 ? (
                                clubsDisplayed.map((club: Club, idx: number) => (
                                    <ClubRemovalBox key={idx} club={club} onDelete={handleDeleteClub}/>
                                ))
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-md text-center">
                  {searchQuery.trim() !== "" ? "No clubs found matching your search." : "No clubs available for deletion."}
                </span>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        Showing {clubsDisplayed.length} of {clubs.length} approved clubs
                    </p>
                </div>
            </div>
        );
    }

// Modal Integration Component
    export function ClubRemoverModal() {
        return (
            <ModalButton
                buttonClass="p-2 flex items-center justify-center h-[7vh] w-full text-lg !text-[var(--fssgold)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
                modalClass="text-gray-300"
                buttonTitle="Remove Clubs"
                modalTitle="Club Removal Management"
                modalBody={<ClubRemover/>}
                modalContainerClass="w-[90vw] max-w-[1300px] max-h-[90vh] overflow-y-auto rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)] border-1 border-[var(--fssgold)] shadow-2xl p-6 text-gray"
            />
        );
    }
