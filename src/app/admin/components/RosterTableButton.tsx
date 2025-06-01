'use client'

import * as React from 'react';
import { Roster } from '@/lib/objects';
import { ModalButton } from '@/app/components/ModalButton';
import { DataGrid } from '@mui/x-data-grid';
import {removeStudent} from "@/lib/firebaseClient";

function parseRoster(r: UnparsedRoster): Roster {
  if (typeof r.student_id === 'string') {
    r.student_id = +r.student_id;
  }
  return r as Roster;
}

type UnparsedRoster = {
  student_id: string | number;
  firstName: string;
  lastName: string;
  club: string;
}

type RosterTableButtonProps = {
  rosters: Roster[];
}

export default function RosterTableButton({ rosters }: RosterTableButtonProps) {
  return (
    <ModalButton
      buttonClass="p-2 flex items-center justify-center h-[7vh] w-full text-lg !text-[var(--fssgold)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3 style={{ fontFamily: 'var(--font-sans)' }}>
          Club Student
        </h3>
      }
      modalTitle={"Club Student Data"}
      modalContainerClass="
      w-[65vw] h-[70vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray"
      modalBody={
        <>
          <p className="w-0 h-5"></p>
          <div className="w-full h-[58vh]">
            <DataGrid
              slotProps={{
                toolbar: {
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { allColumns: true },
                },
              }}
              showToolbar
              checkboxSelection
              keepNonExistentRowsSelected
              editMode="row"
              processRowUpdate={async (updated: UnparsedRoster, old: UnparsedRoster) => {
                if (updated.student_id === '') {
                  await removeStudent(parseRoster(old));
                  return { ...updated, _action: 'delete' };
                }
                if (isNaN(+updated.student_id)) {
                  window.alert("New ID is not a number!");
                  return old;
                }
                const r = parseRoster(updated);
                console.log(r);
                return r;
              }}
              onProcessRowUpdateError={() => {
                window.alert("Failed to edit data!");
              }}
              rows={rosters.map((entry, idx) => (
                { id: idx, student_id: entry.student_id, firstName: entry.firstName, lastName: entry.lastName, club: entry.club }
              ))}
              columns={[
                { field: 'student_id', headerName: 'Student ID#', flex: 1, editable: true  },
                { field: 'lastName', headerName: 'Student Name (Last)', flex: 1, editable: true  },
                { field: 'firstName', headerName: 'Student Name (First)', flex: 1, editable: true  },
                { field: 'club', headerName: 'Name of Club', flex: 1, editable: true },
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
