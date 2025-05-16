import { ModalButton } from "@/app/components/ModalButton";
import { Club } from "@/lib/objects";

type ClubBoxProps = {
  club: Club;
};

export function ClubBox({ club }: ClubBoxProps) {
  return (
    <div className="p-5 flex flex-col m-5 max-w-[684px] min-w-[360px] h-[252px] text-[1.625rem] bg-[var(--mid)] text-gray rounded-lg select-text items-center justify-start">
      <div className="w-full flex flex-col justify-start items-center mr-auto mb-auto mt-2">
        <h3 className="font-semibold text-[1.625rem]">{club.name}</h3>
        <p className="text-gray-400 text-lg">{club.type || ""}</p>
      </div>
      <div className="w-full flex justify-center items-center mt-2 py-10">
        <ModalButton
          buttonClass="w-[270px] h-[63px] bg-[var(--fssgold)] rounded-md cursor-pointer 
          hover:bg-neutral-900 hover:text-[var(--fssgold)] hover:shadow-lg hover:scale-[1.02] custom-button text-[2rem]"
          modalClass="text-gray-300"
          buttonTitle="Info"
          modalTitle={club.name}
          modalBody={
            <div className="rounded text-base">
              <p className="text-gray-400 text-lg text-center">{club.type || "Other"}</p>
              <br />
              <p>{club.description || "No description found"}</p>
              <br />
              <p className="font-semibold">Student(s) in charge:</p>
              <ul className="list-disc list-inside">
                {club.student_leads_name.map((student: string, idx: number) => (
                  <li key={idx}>
                    {student} (
                    <a
                      className="underline underline-offset-4"
                      href={`mailto:${club.student_leads_contact[idx]}`}
                    >
                      {club.student_leads_contact[idx]}
                    </a>
                    )
                  </li>
                ))}
              </ul>
              <br />
              <p className="font-semibold">Sponsor(s):</p>
              <ul className="list-disc list-inside">
                {club.sponsors_name.map((sponsor: string, idx: number) => (
                  <li key={idx}>
                    {sponsor} (
                    <a
                      className="underline underline-offset-4"
                      href={`mailto:${club.sponsors_contact[idx]}`}
                    >
                      {club.sponsors_contact[idx]}
                    </a>
                    )
                  </li>
                ))}
              </ul>
              <br />
              <p>
                Meets @ <b>{club.time || "unstructured times"}</b> in{" "}
                <b>{club.location || "different places"}</b>
              </p>
              <p>Additional information: {club.other || "None"}</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
