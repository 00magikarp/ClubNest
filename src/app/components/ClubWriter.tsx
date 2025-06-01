'use client';

import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from "@mui/material";
import {writeClub} from "@/lib/firebaseClient";
import {Club} from "@/lib/objects";

async function sendClub(data: FormReturn): Promise<void> {
  const dataProcessed: Club = {
    name: data.name,
    sponsors_name: data.sponsors_name.split("|"),
    sponsors_contact: data.sponsors_contact.split("|"),
    student_leads_name: data.student_leads_name.split("|"),
    student_leads_contact: data.student_leads_contact.split("|"),
    type: data.type,
    ...(data.description !== '' && { description: data.description }),
    ...(data.time !== '' && { time: data.time }),
    ...(data.location !== '' && { location: data.location }),
    ...(data.other !== '' && { other: data.other }),
    approved: 0
  }
  await writeClub(dataProcessed)
  window.alert("Club sent successfully!")
}

type FormReturn = {
  name: string;
  sponsors_name: string;
  sponsors_contact: string;
  student_leads_name: string;
  student_leads_contact: string;
  type: string;
  description: string | undefined;
  time: string | undefined;
  location: string | undefined;
  other: string | undefined;
}


export function ClubWriter() {
  return (
    <div className="w-full h-full bg-[var(--mid)] rounded-md border-[var(--fssgold)] border-2 flex flex-col justify-center items-center content-evenly p-4">
      <h2 className="text-xl !text-[var(--text-color)] mb-10">Club Writer</h2>
      <FormContainer<FormReturn>
        defaultValues={{
          name: '',
          sponsors_name: '',
          sponsors_contact: '',
          student_leads_name: '',
          student_leads_contact: '',
          type: '',
          description: '',
          time: '',
          location: '',
          other: '',
        }}
        onSuccess={data => sendClub(data)}
      >
        <Stack spacing={2}>
          <TextFieldElement name="name" label="Name" required/>

          <TextFieldElement name="sponsors_name" label="Sponsors Names (seperate by |)" required/>
          <TextFieldElement name="sponsors_contact" label="Sponsors Contacts (seperate by |)" required/>
          <TextFieldElement name="student_leads_name" label="Student Lead Names (seperate by |)" required/>
          <TextFieldElement name="student_leads_contact" label="Student Lead Contacts (seperate by |)" required/>

          <TextFieldElement name="type" label="Type" required/>
          <TextFieldElement name="description" label="Description"/>
          <TextFieldElement name="time" label="Meeting times"/>
          <TextFieldElement name="location" label="Location"/>
          <TextFieldElement name="other" label="Other"/>

          <Button type={'submit'} color={'primary'}>
            Submit
          </Button>
        </Stack>
      </FormContainer>
    </div>
  )
}