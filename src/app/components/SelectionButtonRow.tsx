'use client';

import {useState} from "react";

type SelectionButtonRowProps = {
  initialState: string | null;
  passToPageAction: (data: string | null) => void;
  options: string[];
}

export function SelectionButtonRow({ initialState, passToPageAction, options }: SelectionButtonRowProps) {
  const [selectedType, setSelectedType] = useState<string | null>(initialState)

  const handleSelection = (newSelection: string, e: React.MouseEvent) => {
    // Prevent the button click from submitting the form
    e.preventDefault();

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
      {options.map((option: string, idx: number) => {
        const isSelected = selectedType === option

        const baseClasses = [
          "relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out",
          "w-[200px] border transform hover:scale-105 active:scale-95",
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
            type="button" // Explicitly set type to button to prevent form submission
            onClick={(e) => handleSelection(option, e)}
            className={`${baseClasses.join(" ")} ${isSelected ? selectedClasses : unselectedClasses}`}
          >
            <span className={isSelected ? "text-[var(--background)]" : "text-[var(--foreground)]"}>{option}</span>
          </button>
        )
      })}
    </div>
  )
}
