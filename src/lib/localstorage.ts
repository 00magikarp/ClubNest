// import expiryLocalStorage from "expiry-localstorage";
import {Club} from "@/lib/objects";
import {readClubs} from "@/lib/firebaseClient";

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}

export async function getClubs(): Promise<Club[]> {
  // const [clubsValue, setClubsValue] = useState(null);
  //
  // useEffect(() => {
  //   const data = expiryLocalStorage.getItem("club-list");
  //   setClubsValue(JSON.parse(data));
  // }, []);
  //
  // // let clubs: Club[] | null;
  // // // if (typeof window !== "undefined") {
  // //   clubs =
  // //   if (clubs === null) {
  // //   }
  // // // } else { // we're running on the server-side so we HAVE to load from database
  // // //   console.log('fetching clubs, no storing')
  // // //   clubs = await readClubs();
  // // // }
  // return clubs;

  return await readClubs();
}