export function NoClubsFound() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="grid w-full h-56 grid-cols-1 content-center gap-2 mb-12">
      <p className="text-xl text-center font-semibold mt-10 text-[var(--fssgold)] ">
        No Clubs Found
      </p><br/><p className="text-lg text-center text-gray-400">
      Sorry :(
    </p><br/>
      <button
        className="max-w-[200px] justify-self-center items-center content-center justify-center bg-transparent hover:bg-[var(--mid)] text-[var(--foreground)] font-semibold py-2 px-4 border border-[var(--border)] rounded"
        onClick={handleRefresh}>Refresh
      </button>
    </div>
  )
}
