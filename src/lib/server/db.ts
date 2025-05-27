import { db, signInAdmin } from "./firebase";
import {collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { Club, Roster } from "@/lib/objects";

await signInAdmin();

/**
 * Write a new club to the database.
 *
 * @param data - The `Club` to be passed in, in proper format. All fields of the club that are filled out should be
 * legitamite club data (aka data should not have `null` or `undefined` as a field. It's OK if `data` does not
 * contain fields for all the fields of a Club.
 */
export async function writeClub(data: Club): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, "clubs"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new DocumentWriteError(`Error adding club data to document: ${e} Club data:\r\n ${JSON.stringify(data, null, 2)}`)
  }
}

/**
 * Fetch the list of clubs from the Firestore Database. Club data is filled out for all categories that exist for that
 * Club, if the field does not exist, it doesn't become a key with a null value in the outcome Club.
 *
 * @return The list of clubs as an array, in sorted order by ascending name.
 */
export async function readClubs(): Promise<Club[]> {
  const cl: Club[] = [];
  const querySnapshot = await getDocs(collection(db, "clubs"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    cl.push({
      name: data.name,
      sponsors_name: data.sponsors_name,
      sponsors_contact: data.sponsors_contact,
      student_leads_name: data.student_leads_name,
      student_leads_contact: data.student_leads_contact,
      type: data.type,
      description: data.description,
      time: data.time,
      location: data.location,
      other: data.other,
      approved: data.approved
    })
  });
  cl.sort((c1, c2) => (c1.name > c2.name ? 1 : -1));
  return cl;
}


export async function readRoster(): Promise<Roster[]> {
  const querySnapshot = await getDocs(collection(db, "rosters"));
  const roster: Roster[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    roster.push({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      club: data.club
    });
  });

  return roster;
}

export async function updateClub(c: Club): Promise<void> {
  const q = query(
    collection(db, "clubs"),
    where('name', '==', c.name)
  );
  const clubRef = await getDocs(q);

  // should be only one doc in the snapshot
  clubRef.forEach((data) => {
    const d = doc(db, "clubs", data.id);
    updateDoc(d, {
      ...c
    });
  });
}

export async function deleteClub(c: Club): Promise<void> {
  const q = query(
    collection(db, "clubs"),
    where('name', '==', c.name)
  );
  const clubRef = await getDocs(q);

  // should be only one doc in the snapshot
  clubRef.forEach((data) => {
    const d = doc(db, "clubs", data.id);
    deleteDoc(d);
  });
}


export class DocumentWriteError extends Error {
  constructor(message: string = "Error writing to a document") {
    super(message);
    this.name = "DocumentWriteError";
  }
}