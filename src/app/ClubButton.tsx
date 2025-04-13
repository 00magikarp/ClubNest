export type Club = {
  name: string;
  sponsor: string;
  members: string[];
  type?: string | undefined;
};

type ClubButtonProps = {
  club: Club;
  onClick?: () => void;
};

export function ClubButton({ club, onClick }: ClubButtonProps) {
  return (
    <button onClick={onClick}
            className="p-6 flex flex-col m-4 w-[350px] h-[400px] text-xl bg-[#222] text-white rounded border-2 border-black select-text items-start justify-start">
      <div className="w-[100%] flex flex-col justify-center items-center p-1">
        <h3 className="w-[90%] font-bold">{ club.name }</h3>
        <p className="text-gray-500 text-lg">{ club.type || "few" }</p>
      </div>
      <ul className="flex flex-col items-start justify-center w-[100%] p-1 text-left text-base">
        {/*<li>Meets { club.days || "" } @ <b>{ club.time || "unstructured times" }</b></li>*/}
        {/*<li>In room <b>{ club.room || "unknown" }</b></li>*/}
        <li>{ club.members.length } people in club </li>
        <li>Sponsor: { club.sponsor }</li>
      </ul>
    </button>
  )
}