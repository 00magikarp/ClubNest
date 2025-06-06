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
    <div className="flex flex-wrap justify-between gap-2 w-full mx-auto pb-2">
      {TYPES.map((type: string, idx: number) => {
        if (type === "All") return;
        const isSelected = selectedType === type

        const baseClasses = [
          "relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out",
          "border backdrop-blur-sm transform hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500/50",
          "shadow-sm hover:shadow-md"
        ]

        const selectedClasses = "bg-gradient-to-r from-amber-500 to-[var(--fssgold)] text-white border-amber-400 shadow-amber-500/25"
        const unselectedClasses = "bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600"

        return (
          <button
            key={idx}
            onClick={() => handleSelection(type)}
            className={`${baseClasses.join(" ")} ${isSelected ? selectedClasses : unselectedClasses}`}
          >
            <p className="text-white">{type}</p>
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