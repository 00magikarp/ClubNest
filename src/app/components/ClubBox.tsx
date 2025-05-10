import { ModalButton } from "@/app/components/ModalButton";

export type Club = {
  name: string;
  sponsors_name: string[];
  sponsors_contact: string[];
  student_leads_name: string[];
  student_leads_contact: string[];
  student_ids: number[];
  student_names: string[];
  type?: string | undefined;
  description?: string | undefined;
  time?: string | undefined;
  location?: string | undefined;
  other?: string | undefined;
};

type ClubBoxProps = {
  club: Club;
};

export function ClubBox({ club }: ClubBoxProps) {
  return (
    <div className="p-4 flex flex-row m-2 w-[40vw] h-[120px] text-xl bg-[var(--mid)] text-white rounded border-2 border-black select-text items-center justify-start">
      <div className="w-[30%] flex flex-col justify-center items-start p-1">
        <h3 className="font-bold">{ club.name }</h3>
        <p className="text-gray-500 text-lg">{ club.type || "" }</p>
      </div>
      <p className="flex flex-col items-start justify-start text-left p-1 w-[40%] text-base text-gray-300 overflow-hidden text-ellipsis whitespace-normal max-h-[100px] ">
        { club.description || "" }
      </p>
      <ModalButton
        buttonClass="ml-[5%] w-[10vw] bg-[var(--fssgold)] rounded-md"
        modalClass=""
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
                  <li key={idx}>{ club.student_leads_name[idx] } (<a href={"mailto:" + club.student_leads_contact[idx]}>{ club.student_leads_contact[idx] }</a>)</li>
                ))
              }
            </ul>
            <br/>
            <p>Sponsor(s):</p>
            <ul className="list-disc list-inside">
              {
                club.sponsors_name.map((student: string, idx: number) => (
                  <li key={idx}>{ club.sponsors_name[idx]} (<a href={"mailto:" + club.sponsors_contact[idx]}>{ club.sponsors_contact[idx] }</a>)</li>
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