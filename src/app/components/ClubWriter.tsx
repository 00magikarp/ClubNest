'use client';

import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from "@mui/material";
import {writeClub} from "@/lib/firebaseClient";

function sendClubs(data: object) {

}

export function ClubWriter() {
  return (
    <div className="w-full h-full bg-[var(--mid)] rounded-md border-[var(--fssgold)] border-2 flex flex-col justify-center items-center content-evenly p-4">
      <h2 className="text-xl !text-[var(--text-color)] mb-10">Club Writer</h2>
      <FormContainer
        defaultValues={{name: ''}}
        onSuccess={data => console.log(data)}
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