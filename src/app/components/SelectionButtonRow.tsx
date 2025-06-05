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
      className="max-w-[80vw] h-full flex flex-row flex-wrap justify-center"
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
                color: 'var(--foreground)',
                backgroundColor: 'var(--fssgold)',
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'GoldenRod',
              },
              '&:hover': {
                backgroundColor: 'var(--mid)'
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