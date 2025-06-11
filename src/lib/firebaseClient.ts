import { Club, Roster } from "@/lib/definitions";

export async function writeClub(data: Club): Promise<void> {
  const res = await fetch(`${window.location.origin}/api/writeClub`, {
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
  const res = await fetch(`${window.location.origin}/api/readClubs`);
  const text = await res.text(); // Read raw response
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", text, err);
    throw new Error("Invalid JSON response from /api/readClubs");
  }
}

export async function writeStudent(data: Roster): Promise<boolean> {
  const res = await fetch(`${window.location.origin}/api/writeStudent`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const err = await res.json()
    console.error(err);
    return false;
  }
  return res.status != 400;

}

export async function readRoster(): Promise<Roster[]> {
  const res = await fetch(`${window.location.origin}/api/readRoster`);
  const text = await res.text(); // Read raw response
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", text, err);
    throw new Error("Invalid JSON response from /api/readClubs");
  }
}

export async function updateClub(newClub: Club, oldClub: Club): Promise<void> {
  const res = await fetch(`${window.location.origin}/api/updateClub`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newClub, oldClub }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Write failed: ${err.error}`);
  }
}

export async function deleteClub(data: Club): Promise<void> {
  const res = await fetch(`${window.location.origin}/api/deleteClub`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Write failed: ${err.error}`);
  }
}

export async function removeStudent(data: Roster): Promise<void> {
  const res = await fetch(`${window.location.origin}/api/removeStudent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Write failed: ${err.error}`);
  }
}