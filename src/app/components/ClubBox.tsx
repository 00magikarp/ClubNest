import { ModalButton } from "@/app/components/ModalButton";
import { Club } from "@/lib/objects";

type ClubBoxProps = {
  club: Club;
};

export function ClubBox({ club }: ClubBoxProps) {
  return (
    <div>
      <ModalButton
        buttonClass="
        p-3 flex flex-col m-3 w-[240px] h-[150px] text-xl bg-[var(--mid)] text-gray rounded-md select-text items-center justify-start
        transform transition-transform duration-200 hover:scale-105 cursor-pointer
        "
        modalClass=""
        buttonTitle={
        <div className="h-full w-full flex flex-col justify-start items-center mt-2 mt-1">
          <h3 className="h-[50%] font-semibold text-xl">{club.name}</h3>
          <p className="text-lg">{club.type || ""}</p>
        </div>
        }
        modalTitle={ club.name }
        modalBody={
          <div className="rounded">
            <p className="text-gray-500 text-lg text-center">{club.type || "Other"}</p>
            <br/>
            <p>{club.description || "No description found"}</p>
            <br/>
            <p>Student(s) in charge:</p>
            <ul className="list-disc list-inside">
              {
                club.student_leads_name.map((student: string, idx: number) => (
                  <li key={idx}>{ club.student_leads_name[idx] } (<a className="underline underline-offset-4" href={"mailto:" + club.student_leads_contact[idx]}>{ club.student_leads_contact[idx] }</a>)</li>
                ))
              }
            </ul>
            <br/>
            <p>Sponsor(s):</p>
            <ul className="list-disc list-inside">
              {
                club.sponsors_name.map((student: string, idx: number) => (
                  <li key={idx}>{ club.sponsors_name[idx]} (<a className="underline underline-offset-4" href={"mailto:" + club.sponsors_contact[idx]}>{ club.sponsors_contact[idx] }</a>)</li>
                ))
              }
            </ul>
            <br/>
            <p>Meets @ <b>{club.time || "unstructured times"}</b> in <b>{club.location || "different places"}</b></p>
            <p>Additional information: { club.other || "None" }</p>
          </div>
        }
      />
    </div>
  );
}
