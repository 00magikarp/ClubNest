'use client'

import * as React from 'react';
import {updateClub} from '@/lib/firebaseClient';
import {Club, TYPES} from '@/lib/objects';
import { ModalButton } from '@/app/components/ModalButton';
import {getClubs} from "@/lib/localstorage";
import {DataGrid} from "@mui/x-data-grid";

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
  approved: boolean | string;
}

const clubs: Club[] = await getClubs(true);

export default function ClubsTableButton() {
  return (
    <ModalButton
      buttonClass="p-2 flex items-center justify-center h-[7vh] text-lg !text-[var(--fssgold)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3>
          Club Information Data
        </h3>
      }
      modalTitle={"Club Information Data"}
      modalContainerClass="
      w-[70vw] h-[55vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray overflow-y-auto"
      modalBody={
        <>
          <p className="w-0 h-5"></p>
          <div className="w-full h-full max-h-[70vh]">
            <DataGrid
              editMode="row"
              processRowUpdate={async (updated: UnparsedClub, old: UnparsedClub) => {
                if (updated.name === '') {
                  return { ...updated, _action: 'delete' };
                }
                if (typeof updated.sponsors_name === "string") {
                  updated.sponsors_name = updated.sponsors_name.split(',');
                }
                if (typeof updated.sponsors_contact === "string") {
                  updated.sponsors_contact = updated.sponsors_contact.split(',');
                }
                if (typeof updated.student_leads_name === "string") {
                  updated.student_leads_name = updated.student_leads_name.split(',');
                }
                if (typeof updated.student_leads_contact === "string") {
                  updated.student_leads_contact = updated.student_leads_contact.split(',');
                }
                if (typeof updated.approved === "string") {
                  updated.approved = updated.approved === "true";
                }
                if (!TYPES.includes(updated.type)) {
                  window.alert(`Illegal type of club "${updated.type}"`);
                  return old;
                }

                // TODO: add data validation to updateclub, user prompt, etc.
                await updateClub(updated as Club);
                console.log(updated);
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
                { field: 'approved', headerName: 'Approved?', flex: 1 },
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
        {/*  <p className="w-0 h-5"></p>*/}
        {/*  <TableContainer component={Paper}>*/}
        {/*    <Table aria-label="roster table">*/}
        {/*      <TableHead>*/}
        {/*        <TableRow>*/}
        {/*          <TableCell><strong>Name</strong></TableCell>*/}
        {/*          <TableCell><strong>Sponsors Name</strong></TableCell>*/}
        {/*          <TableCell><strong>Sponsors Contact</strong></TableCell>*/}
        {/*          <TableCell><strong>Students Leads Name</strong></TableCell>*/}
        {/*          <TableCell><strong>Students Leads Contact</strong></TableCell>*/}
        {/*          <TableCell><strong>Type</strong></TableCell>*/}
        {/*          <TableCell><strong>Description</strong></TableCell>*/}
        {/*          <TableCell><strong>Time</strong></TableCell>*/}
        {/*          <TableCell><strong>Location</strong></TableCell>*/}
        {/*          <TableCell><strong>Other</strong></TableCell>*/}
        {/*          <TableCell><strong>Approved</strong></TableCell>*/}
        {/*        </TableRow>*/}
        {/*      </TableHead>*/}
        {/*      <TableBody>*/}
        {/*        {clubs.map((entry, idx) => (*/}
        {/*          <TableRow key={idx}>*/}
        {/*            <TableCell>{entry.name}</TableCell>*/}
        {/*            <TableCell>{entry.sponsors_name.join('\n')}</TableCell>*/}
        {/*            <TableCell>{entry.sponsors_contact.join('\n')}</TableCell>*/}
        {/*            <TableCell>{entry.student_leads_name.join('\n')}</TableCell>*/}
        {/*            <TableCell>{entry.student_leads_contact.join('\n')}</TableCell>*/}
        {/*            <TableCell>{entry.type}</TableCell>*/}
        {/*            <TableCell>{entry.description}</TableCell>*/}
        {/*            <TableCell>{entry.time}</TableCell>*/}
        {/*            <TableCell>{entry.location}</TableCell>*/}
        {/*            <TableCell>{entry.other}</TableCell>*/}
        {/*            <TableCell>{entry.approved ? "Yes" : "No"}</TableCell>*/}
        {/*          </TableRow>*/}
        {/*        ))}*/}
        {/*      </TableBody>*/}
        {/*    </Table>*/}
        {/*  </TableContainer>*/}
        </>
      }
    />
  );
}
