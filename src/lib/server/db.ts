import { db, signInAdmin } from "./firebase";
import {collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, getDoc, setDoc} from "firebase/firestore";
import { Club, Roster } from "@/lib/definitions";

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
    await addDoc(collection(db, "clubs"), data);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error(`Error adding club data to document: ${e} Club data:\r\n ${JSON.stringify(data, null, 2)}`)
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
    if (doc.id !== "_information") {
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
      });
    }
  });
  cl.sort((c1, c2) => (c1.name.toLowerCase() > c2.name.toLowerCase() ? 1 : -1));
  return cl;
}


export async function readRoster(): Promise<Roster[]> {
  const querySnapshot = await getDocs(collection(db, "rosters2"));
  const roster: Roster[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.id !== "_information") {
      const data = doc.data();
      const club = doc.id;
      const len = data.student_ids?.length ?? 0;

      for (let i = 0; i < len; i++) {
        roster.push({
          student_id: data.student_ids[i],
          firstName: data.firstNames[i],
          lastName: data.lastNames[i],
          club: club,
        });
      }
    }
  });

  return roster;
}

export async function updateClub(c: Club, o: Club): Promise<void> {
  const q = query(
    collection(db, "clubs"),
    where('name', '==', o.name)
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

export async function removeStudent(r: Roster): Promise<void> {
  const d = await getDoc(doc(db, "rosters2", r.club));
  const data = d.data()!;

  const found_idx = data?.student_ids?.indexOf(r.student_id) ?? -1;

  // this should NEVER, EVER happen, preconditions should be ran before this occurs
  if (found_idx === -1) throw Error(`Attempting to delete student registration for ${r.student_id} which doesn't exist for club ${r.club}.`);

  const student_ids: number[] = data.student_ids;
  const firstNames: string[] = data.firstNames;
  const lastNames: string[] = data.lastNames;

  await setDoc(doc(db, "rosters2", r.club), {
    student_ids: student_ids.filter((_id, idx) => idx !== found_idx),
    firstNames: firstNames.filter((_fn, idx) => idx !== found_idx),
    lastNames: lastNames.filter((_ln, idx) => idx !== found_idx),
  });
}

/**
 * Write a new document for a student to join a Club to the rosters collection. Fails if the student is already
 * registered in the club.
 *
 * @return If adding the student was successful.
 */
export async function addStudent(student: Roster): Promise<boolean> {
  const d = await getDoc(doc(db, "rosters2", student.club));
  const data = d.data();

  if (data === undefined) {
    await setDoc(doc(db, "rosters2", student.club), {
      student_ids: [student.student_id],
      firstNames: [student.firstName],
      lastNames: [student.lastName],
    });
    return true;
  }

  const student_ids: number[] = data.student_ids ?? [];
  const firstNames: string[] = data.firstNames ?? [];
  const lastNames: string[] = data.lastNames ?? [];

  const found_idx = student_ids.indexOf(student.student_id);
  if (found_idx !== -1) return false;

  await setDoc(doc(db, "rosters2", student.club), {
    student_ids: [...student_ids, student.student_id],
    firstNames: [...firstNames, student.firstName],
    lastNames: [...lastNames, student.lastName],
  });
  return true;
}
