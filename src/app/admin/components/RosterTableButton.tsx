'use client'

import * as React from 'react';
import { Roster } from '@/lib/objects';
import { ModalButton } from '@/app/components/ModalButton';
import { DataGrid } from '@mui/x-data-grid';

type RosterTableButtonProps = {
  rosters: Roster[];
}

export default function RosterTableButton({ rosters }: RosterTableButtonProps) {
  return (
    <ModalButton
      buttonClass="p-2 flex items-center justify-stretch h-[7vh] text-lg !text-[var(--fssgold)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3 style={{ fontFamily: 'var(--font-sans)' }}>
          Club Student Data
        </h3>
      }
      modalTitle={"Club Student Data"}
      modalContainerClass="
      w-[65vw] h-[55vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray"
      modalBody={
        <>
          <p className="w-0 h-5"></p>
          <div className="w-full h-full max-h-[70vh]">
            <DataGrid
              editMode="row"
              rows={rosters.map((entry, idx) => (
                { id: idx, student_id: entry.id, firstName: entry.firstName, lastName: entry.lastName, club: entry.club }
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
