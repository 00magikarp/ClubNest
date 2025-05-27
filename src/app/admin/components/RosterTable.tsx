'use client'

import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps, Theme} from '@mui/material';
import { readRoster } from '@/lib/firebaseClient';
import {Roster} from '@/lib/objects';
import {useEffect, useState} from "react";

export default function RosterTable() {
  const [roster, setRoster] = useState<Roster[]>([]);
  useEffect(() => {
    readRoster().then(setRoster).catch(console.error);
  }, []);

  const rowStyling: SxProps<Theme> = {
    backgroundColor: 'var(--background)',
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }
  const cellStyling: SxProps<Theme> = {
    color: 'var(--foreground)',
  }

  return (
    <div
      className="w-[100%] h-full bg-[var(--mid)] rounded-md border-[var(--fssgold)] border-2 flex flex-col justify-center items-center content-evenly p-4"
    >
      <div className="w-full border-3 rounded-lg border-[var(--fssgold)]">
        <TableContainer component={Paper}>
          <Table aria-label="roster table">
            <TableHead>
              <TableRow sx={{...rowStyling, '&:last-child td, &:last-child th': {}}}>
                <TableCell sx={cellStyling}><strong>FirstName</strong></TableCell>
                <TableCell sx={cellStyling}><strong>LastName</strong></TableCell>
                <TableCell sx={cellStyling}><strong>clubName</strong></TableCell>
                <TableCell sx={cellStyling}><strong>id</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roster.map((entry, idx) => (
                <TableRow key={idx} sx={rowStyling}>
                  <TableCell sx={cellStyling}>{entry.firstName}</TableCell>
                  <TableCell sx={cellStyling}>{entry.lastName}</TableCell>
                  <TableCell sx={cellStyling}>{entry.club}</TableCell>
                  <TableCell sx={cellStyling}>{entry.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
