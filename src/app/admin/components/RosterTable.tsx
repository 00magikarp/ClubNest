'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { readRoster } from '@/lib/firebaseClient';
import { Roster } from '@/lib/objects';

const roster: Roster[] = await readRoster();

export default function RosterTable() { 
    console.log("RosterTable: roster", roster);
  return (
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
  );
}
