'use client'

import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { readRoster } from '@/lib/firebaseClient';
import { Roster } from '@/lib/objects';
import { ModalButton } from '@/app/components/ModalButton';

const roster: Roster[] = await readRoster();

export default function RosterTableButton() {
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
      modalTitle={"Club Student Data"}
      modalContainerClass="
      w-[55vw] h-[55vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray"
      modalBody={
        <>
          <p className="w-0 h-5"></p>
          <TableContainer component={Paper}>
            <Table aria-label="roster table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>FirstName</strong></TableCell>
                  <TableCell><strong>LastName</strong></TableCell>
                  <TableCell><strong>clubName</strong></TableCell>
                  <TableCell><strong>id</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roster.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.firstName}</TableCell>
                    <TableCell>{entry.lastName}</TableCell>
                    <TableCell>{entry.club}</TableCell>
                    <TableCell>{entry.id}</TableCell>
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
