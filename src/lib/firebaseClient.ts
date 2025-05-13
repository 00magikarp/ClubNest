// lib/client/firebaseClient.ts
import { Club } from "@/lib/objects";

export async function writeClub(data: Club): Promise<void> {
  const res = await fetch("/api/writeClub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Write failed: ${err.error}`);
  }
}

export async function readClubs(): Promise<Club[]> {
  const res = await fetch("/api/readClubs");
  const text = await res.text(); // Read raw response
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", text, err);
    throw new Error("Invalid JSON response from /api/readClubs");
  }
}
