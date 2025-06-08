'use client'

import * as React from 'react';
import {deleteClub, updateClub} from '@/lib/firebaseClient';
import {Club, TYPES} from '@/lib/definitions';
import { ModalButton } from '@/app/components/ModalButton';
import {DataGrid} from "@mui/x-data-grid";

function parseClub(o: UnparsedClub): Club {
  if (typeof o.sponsors_name === "string") {
    o.sponsors_name = o.sponsors_name.split(',');
  }
  if (typeof o.sponsors_contact === "string") {
    o.sponsors_contact = o.sponsors_contact.split(',');
  }
  if (typeof o.student_leads_name === "string") {
    o.student_leads_name = o.student_leads_name.split(',');
  }
  if (typeof o.student_leads_contact === "string") {
    o.student_leads_contact = o.student_leads_contact.split(',');
  }
  if (typeof o.approved === "string") {
    o.approved = +o.approved;
  }
  return o as unknown as Club;
}

type UnparsedClub = {
  name: string;
  sponsors_name: string[] | string;
  sponsors_contact: string[] | string;
  student_leads_name: string[] | string;
  student_leads_contact: string[] | string;
  type: string;
  description?: string | undefined;
  time?: string | undefined;
  location?: string | undefined;
  other?: string | undefined;
  approved: number | string;
}

type ClubsTableButtonProps = {
  clubs: Club[];
}

export default function ClubsTableButton({ clubs } : ClubsTableButtonProps) {
  return (
    <ModalButton
      buttonClass="p-2 flex items-center justify-center h-[7vh] w-full text-lg !text-[var(--fssgold)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3>
          View Club Information
        </h3>
      }
      modalTitle={"Club Information Data"}
      modalContainerClass="
      w-[80vw] h-[85vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-1 border-[var(--fssgold)] shadow-2xl p-4 text-gray overflow-y-auto"
      modalBody={
        <>
          <p className="w-0 h-5"></p>
          <div className="w-full h-[74vh]">
            <DataGrid
              slotProps={{
                toolbar: {
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { allColumns: true },
                },
              }}
              showToolbar
              editMode="row"
              processRowUpdate={async (updated: UnparsedClub, old: UnparsedClub) => {
                if (updated.name === '') {
                  await deleteClub(parseClub(old));
                  return { ...updated, _action: 'delete' };
                }
                if (updated.name !== old.name) {
                  window.alert("ERROR: Cannot edit a club to change it's name. You must make a new club.");
                  return old;
                }
                if (updated.name !== old.name) {
                  window.alert("ERROR: Cannot edit a club to change it's name. You must make a new club.");
                  return old;
                }
                if (typeof updated.approved === "string") {
                  if (!["0", "1", "2"].includes(updated.approved)) {
                    window.alert("New approved field cannot be evaulated (must be \"0\" (unapproved), \"1\" (archived), or \"2\" (approved)).");
                    return old;
                  }
                }
                if (!TYPES.includes(updated.type)) {
                  window.alert(`Illegal type of club "${updated.type}"`);
                  return old;
                }
                const club: Club = parseClub(updated);
                await updateClub(club, parseClub(old));
                return updated;
              }}
              onProcessRowUpdateError={() => {
                window.alert("Failed to edit data!");
              }}
              rows={clubs.map((entry, idx) => (
                {
                  id: idx,
                  name: entry.name,
                  sponsors_name: entry.sponsors_name,
                  sponsors_contact: entry.sponsors_contact,
                  student_leads_name: entry.student_leads_name,
                  student_leads_contact: entry.student_leads_contact,
                  type: entry.type,
                  description: entry.description,
                  time: entry.time,
                  location: entry.location,
                  other: entry.other,
                  approved: entry.approved
                }
              ))}
              columns={[
                { field: 'name', headerName: 'Club Name', flex: 1, editable: true },
                { field: 'sponsors_name' , headerName: 'Sponsor(s) Name', flex: 1, editable: true },
                { field: 'sponsors_contact', headerName: 'Sponsor(s) Contact', flex: 1, editable: true },
                { field: 'student_leads_name', headerName: 'Student Lead(s) Name', flex: 1, editable: true },
                { field: 'student_leads_contact', headerName: 'Student Lead(s) Contact', flex: 1, editable: true },
                { field: 'type', headerName: 'Type', flex: 1, editable: true },
                { field: 'description', headerName: 'Description', flex: 1, editable: true },
                { field: 'time', headerName: 'Meeting Dates and Times', flex: 1, editable: true },
                { field: 'location', headerName: 'Meeting Locations', flex: 1, editable: true },
                { field: 'other', headerName: 'Other Information', flex: 1, editable: true },
                { field: 'approved', headerName: 'Approved?', flex: 1, editable: true },
              ]}
              autosizeOnMount={true}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'var(--fssgold)',
                '& .MuiDataGrid-cell:hover': {
                  color: 'var(--fssgold)',
                },
              }}
            />
          </div>
        </>
      }
    />
  );
}
