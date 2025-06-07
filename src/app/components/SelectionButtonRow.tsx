'use client';

import {useState} from "react";
import {TYPES} from "@/lib/objects";

type SelectionButtonRowProps = {
  initialState: string;
  passToPageAction: (data: string | null) => void;
}

export function SelectionButtonRow({ initialState, passToPageAction }: SelectionButtonRowProps) {
  const [selectedType, setSelectedType] = useState<string | null>(initialState)

  const handleSelection = (newSelection: string) => {
    if (newSelection === selectedType) {
      setSelectedType(null);
      passToPageAction(null);
      return;
    }
    setSelectedType(newSelection);
    passToPageAction(newSelection);
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 w-[90dvw] mx-auto pb-2">
      {TYPES.map((type: string, idx: number) => {
        if (type === "All") return;
        const isSelected = selectedType === type

        const baseClasses = [
          "relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out",
          "border transform hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--fssgold)]/50",
          "shadow-sm hover:shadow-md",
        ]

        const selectedClasses =
          "bg-[var(--fssgold)] text-[var(--background)] border-[var(--fssgold)] shadow-[var(--fssgold)]/25"
        const unselectedClasses =
          "bg-[var(--mid)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--background)] hover:border-[var(--fssgold)]/50"

        return (
          <button
            key={idx}
            onClick={() => handleSelection(type)}
            className={`${baseClasses.join(" ")} ${isSelected ? selectedClasses : unselectedClasses}`}
          >
            <p className="!text-gray-300">{type}</p>
            {isSelected && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl opacity-10 animate-pulse"/>
            )}
          </button>
        )
      })}
    </div>
  )
}