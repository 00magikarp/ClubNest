import {Club, ClubBox} from "@/app/components/ClubBox";

type ClubDisplayProps = {
  style: string,
  clubs: Club[] | null;
}

export function ClubDisplay({ style, clubs } : ClubDisplayProps) {
  if (clubs === null) {
    return (
      <p>No clubs found...</p>
    );
  }

  return (
    <div className={style}>
      {
        clubs.map((club: Club, idx: number) => (
          <ClubBox key={idx} club={club} />
        ))
      }
    </div>
  );
}