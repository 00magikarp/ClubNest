'use client';

import {FormContainer, Controller, TextFieldElement} from 'react-hook-form-mui'
import {Autocomplete, Box, TextField} from '@mui/material'
import {Club, Student, TEXT_FIELD_STYLING} from '@/lib/definitions'
import {writeStudent} from "@/lib/firebaseClient";
import {ModalButton} from "@/app/components/ModalButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type JoinFormProps = {
  clubs: Club[];
}

type FormReturn = {
  club: Club;
  id: string;
  firstName: string;
  lastName: string;
}

async function sendData(data: FormReturn): Promise<void> {
  if (isNaN(Number(data.id))) {
    window.alert("Error: ID is not a number.");
    return;
  }

  const s: Student = {
    club: data.club.name,
    id: Number(data.id),
    firstName: data.firstName,
    lastName: data.lastName
  }
  const res = await writeStudent(s);

  if (!res) {
    window.alert("Student already in club!");
  } else {
    window.alert("Successfully added student to club!")
  }
}


export default function JoinForm( { clubs } : JoinFormProps) {
  return (
    <ModalButton
      buttonClass="
      p-2 flex items-center justify-center m-3 w-[5vw] min-w-[55px] h-[50px] text-xl !text-[var(--mid)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer bg-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3 className="!text-[var(--mid)]">
          <PersonAddIcon/>
        </h3>
      }
      modalTitle={"Club Joining Form"}
      modalContainerClass="
      w-[55vw] min-h-[55vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-1 border-[var(--fssgold)] shadow-2xl p-4 text-gray"
      modalBody={
        <div className="flex flex-col flex-1 mt-8">
          <FormContainer<FormReturn>
            onSuccess={data => sendData(data)}
            // @ts-expect-error: club SHOULD be null as default
            defaultValues={{firstName: '', lastName: '', id: '', club: null}}
          >
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, width: '100%'}}>
              <Box sx={{p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)'}}>
                <h2 style={{color: 'var(--fssgold)', marginBottom: '1rem'}}>Student Info</h2>
                <Box sx={{display: "flex", flexDirection: {xs: "column", lg: "row"}, gap: 2}}>
                  <TextFieldElement label="First Name:" name="firstName" placeholder='John'
                                    sx={{...TEXT_FIELD_STYLING, marginBottom: 0}} required/>
                  <TextFieldElement label="Last Name:" name="lastName" placeholder='Doe' sx={TEXT_FIELD_STYLING}
                                    required/>
                </Box>
                <TextFieldElement label="Student ID:" name="id" placeholder='123456' sx={TEXT_FIELD_STYLING} required/>
              </Box>

              <Box sx={{p: 3, marginBottom: 5, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)'}}>
                <h2 style={{color: 'var(--fssgold)', marginBottom: '1rem'}}>Club Info</h2>
                <Controller
                  name="club"
                  rules={{ required: 'This field is required' }}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Autocomplete
                      sx={{
                        color: 'white',
                        '& .MuiSvgIcon-root': {
                          color: 'var(--foreground)',
                        },
                        ...TEXT_FIELD_STYLING
                      }}
                      options={clubs.filter((c: Club) => c.approved === 2)}
                      getOptionLabel={(option: Club) => option.name}
                      value={value || null}
                      onChange={(_, newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          label="Select a Club: *"
                          name="autoCompleteEntry"
                          placeholder="Club Name"
                          sx={TEXT_FIELD_STYLING}
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Box>

              <Box display="flex" justifyContent="center">
                <button type="submit" className="px-6 py-3 rounded-lg font-medium text-lg min-w-[120px] hover:scale-105 transform transition-all duration-200 border-2 border-[var(--fssgold)] bg-[var(--background)] text-[var(--fssgold)] hover:bg-[var(--fssgold)] hover:text-[var(--background)]">
                  Submit
                </button>
              </Box>
            </Box>
          </FormContainer>
        </div>
      }/>
  )
}