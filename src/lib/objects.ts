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
};

export type Roster = {
  name: string;
  ids: number[];
  names: string[];
}

export type Student = {
  club: string;
  id: number;
  firstName: string;
  lastName: string;
}