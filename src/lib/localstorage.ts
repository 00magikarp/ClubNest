import expiryLocalStorage from "expiry-localstorage";
import {Club} from "@/lib/objects";
import {readClubs} from "@/lib/firebaseClient";

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}

export async function getClubs(forceNew: boolean = false): Promise<Club[]> {
  if (forceNew) return await readClubs();

  const localClubs: Club[] = expiryLocalStorage.getItem("club-list") as Club[];
  console.log(localClubs);
  if (localClubs) return localClubs;

  const clubs = await readClubs();
  expiryLocalStorage.setItem("club-list", clubs, 60 * 60 * 1_000);
  return clubs;
}