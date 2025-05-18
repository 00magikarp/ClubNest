'use client';

import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from "@mui/material";

export function ClubWriter() {
  return (
    <div className="w-full h-full bg-[var(--mid)] rounded-md border-[var(--fssgold)] border-2 flex flex-col justify-center items-center content-evenly p-4">
      <h2 className="text-xl !text-[var(--text-color)] mb-10">Club Writer</h2>
      <FormContainer
        defaultValues={{name: ''}}
        onSuccess={data => console.log(data)}
      >
        <Stack spacing={2}>
          {
            //TODO: https://mui.com/material-ui/react-text-field/ add some more
          }
          <TextFieldElement name="name" label="Name" required/>
          <Button type={'submit'} color={'primary'}>
            Submit
          </Button>
        </Stack>
      </FormContainer>
    </div>
  )
}