export type Club = {
  name: string;
  sponsors_name: string[];
  sponsors_contact: string[];
  student_leads_name: string[];
  student_leads_contact: string[];
  type: string;
  description?: string | undefined;
  time?: string | undefined;
  location?: string | undefined;
  other?: string | undefined;
  approved: boolean;
};

export type Roster = {
  firstName: string;
  lastName: string;
  id: number;
  club: string;
}

export type Student = {
  club: string;
  id: number;
  firstName: string;
  lastName: string;
}

// Alphabetical
export const TYPES: string[] = [
  "Activism",
  "Arts",
  "Business",
  "Identity",
  "Fitness",
  "Hobbies",
  "STEM",
  "Service",
  "Other"
];
