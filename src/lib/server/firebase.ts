import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, process.env.FIREBASE_ADMIN_EMAIL!, process.env.FIREBASE_ADMIN_PASS!);
const db = getFirestore(app);

let signInPromise: Promise<void> | null = null;

async function signInAdmin() {
  if (!signInPromise) {
    signInPromise = signInWithEmailAndPassword(
      auth,
      process.env.FIREBASE_ADMIN_EMAIL!,
      process.env.FIREBASE_ADMIN_PASS!
    ).then(() => {}).catch((err) => {
      signInPromise = null; // reset on failure
      throw err;
    });
  }
  return signInPromise;
}

export { db, signInAdmin };