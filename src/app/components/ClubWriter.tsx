'use client';

import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Box, SxProps, Theme} from "@mui/material";
import {writeClub} from "@/lib/firebaseClient";
import {Club} from "@/lib/objects";
import {ModalButton} from "@/app/components/ModalButton";

async function sendClub(data: FormReturn): Promise<void> {
  const dataProcessed: Club = {
    name: data.name,
    sponsors_name: data.sponsors_name.split("|"),
    sponsors_contact: data.sponsors_contact.split("|"),
    student_leads_name: data.student_leads_name.split("|"),
    student_leads_contact: data.student_leads_contact.split("|"),
    type: data.type,
    ...(data.description !== '' && {description: data.description}),
    ...(data.time !== '' && {time: data.time}),
    ...(data.location !== '' && {location: data.location}),
    ...(data.other !== '' && {other: data.other}),
    approved: false
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
  const textFieldStyling: SxProps<Theme> = {
    width: '100%',
    minWidth: '200px',
    flex: 1,
    marginTop: 2,
    marginBottom: 3,
    marginLeft: 1,
    marginRight: 1,
    "& .MuiInputLabel-root": {
      color: 'var(--foreground)',
      opacity: '95%',
      "& Mui.focused": {
        color: 'var(--fssgold)',
      }
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      color: 'white',

      '& fieldset': {
        borderColor: 'var(--fssgold)', // default border
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: 'var(--fssgold)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--foreground)',
        borderWidth: 2,
      },

      input: {
        caretColor: 'white',
      },
    },
    "& input::placeholder": {
      color: 'gray',
      opacity: 0.95
    },
  }

  return (
    <ModalButton
      buttonClass=" p-2 flex items-center justify-center m-3 w-[40vw] h-[60px] text-xl !text-[var(--mid)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer bg-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3 className="!text-[var(--mid)]">
          Create Clubs Here!
        </h3>
      }
      modalTitle={"Club Creation Form"}
      modalContainerClass="
      w-[55vw] h-[55vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray"
      modalBody={
        <div
          className="w-full h-[70vh] mt-[2vh] rounded-md flex flex-col justify-start overflow-auto items-center content-evenly p-2"
        >
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
            <Box display="flex" flexDirection="row" gap="3"
                 className="w-[50vw] h-[70vh] flex-wrap h-full flex-shrink overflow-y-auto overflow-x-hidden">
              <TextFieldElement sx={{...textFieldStyling, flexBasis: '100%'}} name="name" label="Club Name" required/>

              <TextFieldElement sx={textFieldStyling} name="sponsors_name" label="Sponsors Names (seperate by |)"
                                required/>
              <TextFieldElement sx={textFieldStyling} name="sponsors_contact" label="Sponsors Contacts (seperate by |)"
                                required/>

              <TextFieldElement sx={textFieldStyling} name="student_leads_name"
                                label="Student Lead Names (seperate by |)"
                                required/>
              <TextFieldElement sx={textFieldStyling} name="student_leads_contact"
                                label="Student Lead Contacts (seperate by |)" required/>

              <TextFieldElement sx={textFieldStyling} name="type" label="Type" required/>
              <TextFieldElement sx={textFieldStyling} name="description" label="Description"/>
              <TextFieldElement sx={textFieldStyling} name="time" label="Meeting times"/>
              <TextFieldElement sx={textFieldStyling} name="location" label="Location"/>
              <TextFieldElement sx={textFieldStyling} name="other" label="Other"/>

              <Button type={'submit'} color={'primary'} sx={{width: '100%'}}>
                Submit
              </Button>
            </Box>
          </FormContainer>
        </div>
      }/>

  )
}