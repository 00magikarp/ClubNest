'use client';

import {useState} from "react";
import {TYPES} from "@/lib/definitions";

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
    <div className="flex flex-wrap justify-center gap-3 mx-auto pb-2">
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
            <span className={isSelected ? "text-[var(--background)]" : "text-[var(--foreground)]"}>{type}</span>
          </button>
        )
      })}
    </div>
  )
}