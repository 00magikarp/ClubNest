'use client';

import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";
import {TYPES} from "@/lib/objects";

type SelectionButtonRowProps = {
  passToPageAction: (data: string) => void;
}

export function SelectionButtonRow({ passToPageAction }: SelectionButtonRowProps) {
  const [selectedType, setSelectedType] = useState<string | null>('All');

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string | null,
  ) => {
    if (newSelection !== null) {
      setSelectedType(newSelection);
      passToPageAction(newSelection)
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      size="large"
      className="max-w-[80vw] flex flex-row flex-wrap justify-center"
      value={selectedType}
      exclusive
      onChange={handleSelection}
    >
      {
        TYPES.map((type: string, idx: number) => (
          <ToggleButton
            color="primary"
            value={type}
            key={idx}
            className="rounded custom-button"
            sx={{
              color: 'var(--fssgold)',
              '&.Mui-selected': {
                backgroundColor: 'var(--fssgold)',
                color: 'black'
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'gold',
              },
              '&:hover': {
                backgroundColor: '#1a1111'
              }
            }}
          >
            <p>{type}</p>
          </ToggleButton>
        ))
      };
    </ToggleButtonGroup>
  )
}