import { ModalButton } from "@/app/components/ModalButton";
import { Club } from "@/lib/definitions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type ClubReviewBoxProps = {
  club: Club;
};

export function ClubReviewBox({ club }: ClubReviewBoxProps) {
  return (
    <div>
      <ModalButton
        buttonClass="basis-auto
        p-3 flex flex-col my-3 w-full h-[120px] text-lg bg-[var(--mid)] text-gray rounded-2xl select-text items-center justify-start
        transform transition-transform duration-200 hover:scale-105 cursor-pointer
        "
        modalClass="leading-relaxed"
        buttonTitle={
          <div className="h-full w-full flex flex-col justify-between my-3">
            <h3
              className="h-[50%] font-semibold text-xl overflow-ellipsis truncate text-[var(--fssgold)]">{club.name}</h3>
            <p className="text-[var(--foreground)] text-lg">{club.type || ""}</p>
          </div>
        }
        modalContainerClass="w-[650px] max-w-[80dvw] max-h-[80dvh] overflow-y-auto rounded-xl absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)] border-1 border-[var(--fssgold)] shadow-2xl p-4 text-gray text-sm sm:text-base"
        modalTitle={club.name}
        modalBody={
          <div className="rounded">
            <p className="text-lg text-center">{club.type || "Other"}</p>
            <br/>
            <p>{club.description || "No description found"}</p>
            <br/>
            <p>Student(s) in charge:</p>
            <ul className="list-disc list-inside">
              {
                club.student_leads_name.map((student: string, idx: number) => (
                  <li key={idx}>{club.student_leads_name[idx]} (<a className="underline underline-offset-4"
                                                                   href={"mailto:" + club.student_leads_contact[idx]}>{club.student_leads_contact[idx]}</a>)
                  </li>
                ))
              }
            </ul>
            <br/>
            <p>Sponsor(s):</p>
            <ul className="list-disc list-inside">
              {
                club.sponsors_name.map((student: string, idx: number) => (
                  <li key={idx}>{club.sponsors_name[idx]} (<a className="underline underline-offset-4"
                                                              href={"mailto:" + club.sponsors_contact[idx]}>{club.sponsors_contact[idx]}</a>)
                  </li>
                ))
              }
            </ul>
            <br/>
            {club.time && club.location && (
              <p>Meets <AccessTimeIcon className="text-sm"/> <b>{club.time}</b> in <LocationOnIcon className="text-sm"/>
                <b>{club.location}</b></p>
            )}
            {club.time && !club.location && (
              <p>Meets <AccessTimeIcon className="text-sm"/> <b>{club.time}</b></p>
            )}
            {!club.time && club.location && (
              <p>Meets in <LocationOnIcon className="text-sm"/> <b>{club.location}</b></p>
            )}
            <br/>
            {club.other && (
              <p>Additional information: {club.other}</p>
            )}
          </div>
        }
      />
    </div>
  );
}
