"use client"

import type { Club } from "@/lib/objects"
import { ClubBox } from "./ClubBox"

interface ClubGridProps {
  clubs: Club[]
}

export function ClubGrid({ clubs }: ClubGridProps) {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clubs.map((club, idx) => (
            <ClubBox key={idx} club={club} />
        ))}
      </div>
  )
}
