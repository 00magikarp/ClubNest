import expiryLocalStorage from "expiry-localstorage";
import {Club} from "@/lib/definitions";
import {readClubs} from "@/lib/firebaseClient";

export async function getClubs(forceNew: boolean = false): Promise<Club[]> {
  if (forceNew) return await readClubs();

  const localClubs: Club[] = expiryLocalStorage.getItem("club-list") as Club[];
  if (localClubs) return localClubs;

  const clubs = await readClubs();
  expiryLocalStorage.setItem("club-list", clubs, 60 * 60 * 1_000);
  return clubs;
}