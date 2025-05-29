'use client'

import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { readRoster } from '@/lib/firebaseClient';
import {Club, Roster} from '@/lib/objects';
import { ModalButton } from '@/app/components/ModalButton';
import {getClubs} from "@/lib/localstorage";

const clubs: Club[] = await getClubs(true);

export default function ClubsTableButton() {
  return (
    <ModalButton
      buttonClass="p-2 flex items-center justify-center h-[7vh] text-xl !text-[var(--fssgold)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3>
          Club Student Data
        </h3>
      }
      modalTitle={"Club Information Data"}
      modalContainerClass="
      w-[70vw] h-[55vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray overflow-y-auto"
      modalBody={
        <>
          <p className="w-0 h-5"></p>
          <TableContainer component={Paper}>
            <Table aria-label="roster table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Sponsors Name</strong></TableCell>
                  <TableCell><strong>Sponsors Contact</strong></TableCell>
                  <TableCell><strong>Students Leads Name</strong></TableCell>
                  <TableCell><strong>Students Leads Contact</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Other</strong></TableCell>
                  <TableCell><strong>Approved</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clubs.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.sponsors_name.join('\n')}</TableCell>
                    <TableCell>{entry.sponsors_contact.join('\n')}</TableCell>
                    <TableCell>{entry.student_leads_name.join('\n')}</TableCell>
                    <TableCell>{entry.student_leads_contact.join('\n')}</TableCell>
                    <TableCell>{entry.type}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell>{entry.other}</TableCell>
                    <TableCell>{entry.approved ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    />
  );
}
