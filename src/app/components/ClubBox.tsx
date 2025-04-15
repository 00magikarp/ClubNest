import {ModalButton} from "@/app/components/ModalButton";

export type Club = {
  name: string;
  sponsor: string;
  members: string[];
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
    <div className="p-4 flex flex-row m-2 w-[85vw] h-[120px] text-xl bg-[var(--mid)] text-white rounded border-2 border-black select-text items-center justify-start">
      <div className="w-[15%] flex flex-col justify-center items-start p-1">
        <h3 className="font-bold">{ club.name }</h3>
        <p className="text-gray-500 text-lg">{ club.type || "" }</p>
      </div>
      <p className="flex flex-col items-start justify-start text-left p-1 w-[55%] text-base overflow-hidden text-ellipsis whitespace-normal max-h-[100px]">
        { club.description }
      </p>
      <ul className="flex flex-col items-start justify-center w-[20%] p-1 text-left text-base">
        {/*<li>Meets { club.days || "" } @ <b>{ club.time || "unstructured times" }</b></li>*/}
        {/*<li>In room <b>{ club.room || "unknown" }</b></li>*/}
        <li>{ club.members.length } people in club </li>
        <li></li>
      </ul>
      <ModalButton
        buttonClass="w-[10vw] bg-[var(--fssgold)] rounded-md"
        modalClass=""
        buttonTitle="Info"
        modalTitle={ club.name }
        modalBody={
          <>
            <p className="text-gray-500 text-lg text-center">{ club.type || "Other" }</p>
            <br/>
            <p>{club.description}</p>
            <br/>
            <p>Sponsor: {club.sponsor}</p>
            <br/>
            <p>Meets @ <b>{club.time || "unstructured times"}</b> in <b>{club.location || "different places"}</b></p>
            <br/>
            <p><b>{club.members.length} people</b> in club</p>
          </>
        }
      />
    </div>
  )
}