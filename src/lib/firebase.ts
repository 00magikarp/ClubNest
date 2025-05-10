import dotenv from "dotenv";
import { FirebaseApp, initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection, getDocs, Firestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Club } from "@/app/components/ClubBox";

dotenv.config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
await signInWithEmailAndPassword(auth, process.env.FIREBASE_ADMIN_EMAIL!, process.env.FIREBASE_ADMIN_PASS!);
const db: Firestore = getFirestore(app);

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
      student_ids: data.student_ids,
      student_names: data.student_names,
      type: data.type,
      description: data.description,
      time: data.time,
      location: data.location,
      other: data.other
    })
  });
  cl.sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
  return cl;
}

export class DocumentWriteError extends Error {
  constructor(message: string = "Error writing to a document") {
    super(message);
    this.name = "DocumentWriteError";
  }
}

// // list of clubs
// const cl: Club[] = await readClubs();
// console.log(JSON.stringify(cl, null, 2))