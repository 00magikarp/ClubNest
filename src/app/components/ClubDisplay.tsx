import {ClubBox} from "@/app/components/ClubBox";
import {Club} from "@/lib/objects";

type ClubDisplayProps = {
  style: string,
  clubs: Club[] | null;
}

export function ClubDisplay({ style, clubs } : ClubDisplayProps) {
  if (clubs === null) {
    return (
      <div>
        <p>No clubs found...</p>
      </div>
    );
  } else {
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
}