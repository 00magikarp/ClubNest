import { Club, Roster } from "@/lib/objects";

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

export async function readRoster(): Promise<Roster[]> {
  const res = await fetch("/api/readRoster");
  const text = await res.text(); // Read raw response
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", text, err);
    throw new Error("Invalid JSON response from /api/readClubs");
  }
}

export async function updateClub(data: Club): Promise<void> {
  const res = await fetch("/api/updateClub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Write failed: ${err.error}`);
  }
}

export async function deleteClub(data: Club): Promise<void> {
  const res = await fetch("/api/deleteClub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Write failed: ${err.error}`);
  }
}
