import { db, signInAdmin } from "./firebase";
import {collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, getDoc, setDoc} from "firebase/firestore";
import { Club, Roster } from "@/lib/definitions";

await signInAdmin();

declare global {
  // eslint-disable-next-line no-var
  var _appCache: {
    clubs?: Club[];
    rosters?: Roster[];
    clubTimestamp?: number;
    rosterTimestamp?: number;
  };
}

type GlobalCache = {
  cachedClubs?: Club[],
  cachedRosters?: Roster[],
  cachedClubsTimestamp?: number,
  cachedRostersTimestamp?: number
};

function getCache(): GlobalCache {
  if (!globalThis._appCache) {
    globalThis._appCache = {};
  }
  return globalThis._appCache as GlobalCache;
}
const appCache = getCache();

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
    await setDoc(doc(db, "clubs", "_information"), { 'last_updated_timestamp': Date.now() })
    if (!appCache.cachedClubs) appCache.cachedClubs = [data];
    else appCache.cachedClubs.push(data);
    appCache.cachedClubsTimestamp = Date.now();
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
  const informationDocRef = await getDoc(doc(db, "clubs", "_information"));
  const lastUpdated = informationDocRef.data()?.last_updated_timestamp ?? 0;

  if (appCache.cachedClubs && (appCache.cachedClubsTimestamp ?? 0) > lastUpdated) {
    return appCache.cachedClubs;
  }

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
  cl.sort((a, b) => a.name.localeCompare(b.name));
  appCache.cachedClubs = cl;
  appCache.cachedClubsTimestamp = Date.now();

  return cl;
}


export async function readRoster(): Promise<Roster[]> {
  const informationDocRef = await getDoc(doc(db, "rosters", "_information"));
  const lastUpdated = informationDocRef.data()?.last_updated_timestamp ?? 0;

  if (appCache.cachedRosters && (appCache.cachedRostersTimestamp ?? 0) > lastUpdated) {
    return appCache.cachedRosters;
  }

  const rosters: Roster[] = [];
  const querySnapshot = await getDocs(collection(db, "rosters"));
  querySnapshot.forEach((doc) => {
    if (doc.id !== "_information") {
      const data = doc.data();
      rosters.push({
        student_id: data.student_id,
        firstName: data.firstName,
        lastName: data.lastName,
        club: data.club
      });
    }
  });
  appCache.cachedRosters = rosters;
  appCache.cachedRostersTimestamp = Date.now();
  return rosters;
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
  await setDoc(doc(db, "clubs", "_information"), { 'last_updated_timestamp': Date.now() })

  appCache.cachedClubs = appCache.cachedClubs?.map(l => l.name === o.name ? c : l);
  appCache.cachedClubsTimestamp = Date.now();
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

  await setDoc(doc(db, "clubs", "_information"), { 'last_updated_timestamp': Date.now() });

  appCache.cachedClubs = appCache.cachedClubs?.filter(o => o.name !== c.name);
  appCache.cachedClubsTimestamp = Date.now();
}

export async function removeStudent(r: Roster): Promise<void> {
  const q = query(
    collection(db, "rosters"),
    where('id', '==', r.student_id),
    where('club', '==', r.club)
  );
  const rosterRef = await getDocs(q);

  // should be only one doc in the snapshot
  rosterRef.forEach((data) => {
    const d = doc(db, "rosters", data.id);
    deleteDoc(d);
  });

  await setDoc(doc(db, "rosters", "_information"), { 'last_updated_timestamp': Date.now() });

  appCache.cachedRosters = appCache.cachedRosters?.filter(o => (
    !(o.student_id === r.student_id && o.club === r.club)
  ));
  appCache.cachedRostersTimestamp = Date.now();
}

/**
 * Write a new document for a student to join a Club to the rosters collection. Fails if the student is already
 * registered in the club.
 *
 * @return If adding the student was successful.
 */
export async function addStudent(student: Roster): Promise<boolean> {
  const q = query(
    collection(db, "rosters"),
    where('club', '==', student.club),
    where('student_id', '==', student.student_id)
  );
  const rosterRef = await getDocs(q);
  if (!rosterRef.empty) {
    return false;
  }

  await addDoc(collection(db, "rosters"), student);
  await setDoc(doc(db, "rosters", "_information"), {'last_updated_timestamp': Date.now()})

  if (!appCache.cachedRosters) appCache.cachedRosters = [student];
  else appCache.cachedRosters.push(student);
  appCache.cachedRostersTimestamp = Date.now();

  return true;
}
