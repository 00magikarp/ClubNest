import { ModalButton } from "@/app/components/ModalButton";
import {Club} from "@/lib/objects";


type ClubBoxProps = {
  club: Club;
};

export function ClubBox({ club }: ClubBoxProps) {
  return (
    <div className="p-4 flex flex-row m-2 max-w-[380px] min-w-[200px] h-[120px] text-xl bg-[var(--mid)] text-white rounded border-2 border-black select-text items-center justify-start">
      <div className="w-[11vw] flex flex-col justify-center items-start p-1 mr-auto">
        <h3 className="font-bold">{ club.name }</h3>
        <p className="text-gray-500 text-lg">{ club.type || "" }</p>
      </div>
      <ModalButton
        buttonClass="ml-[5%] w-[10vw] bg-[var(--fssgold)] rounded-md justify-end max-w-[150px]"
        modalClass="text-gray-300"
        buttonTitle="Info"
        modalTitle={ club.name }
        modalBody={
          <>
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
          </>
        }
      />
    </div>
  )
}