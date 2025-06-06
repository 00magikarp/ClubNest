'use client';

import {Controller, FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Box, SxProps, Theme, Autocomplete, TextField} from "@mui/material";
import { writeClub } from "@/lib/firebaseClient";
import {Club, TYPES} from "@/lib/objects";
import { ModalButton } from "@/app/components/ModalButton";
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

const buttonStyling: SxProps<Theme> = {
  padding: 5,
  borderRadius: 3,
  width: '40%',
  height: '40px',
  flex: 'true',
  margin: 2,
  color: 'var(--fssgold)',
  borderColor: '#00b6ae'
}

const DynamicSponsors = ({ textFieldStyling }: { textFieldStyling: SxProps<Theme> }) => {
  const [sponsors, setSponsors] = useState([{ name: "", contact: "" }]);

  const addSponsor = () => setSponsors([...sponsors, { name: "", contact: "" }]);
  const removeSponsor = () => sponsors.length > 1 && setSponsors([...sponsors.slice(0, -1)]);

  return (
    <Box sx={{ width: '100%', p: 2, boxShadow: 3, borderRadius: 2, mb: 3 }}>
      {sponsors.map((_, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextFieldElement
            sx={textFieldStyling}
            name={`sponsors[${index}].name`}
            label="Sponsor Name"
            required
          />
          <TextFieldElement
            sx={textFieldStyling}
            name={`sponsors[${index}].contact`}
            label="Sponsor Contact"
            required
          />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
        <Button onClick={addSponsor} variant="text" sx={{ color: 'var(--fssgold)', fontSize: '0.9rem' }}>+ Add</Button>
        <Button onClick={removeSponsor} variant="text" sx={{ color: 'var(--fssgold)', fontSize: '0.9rem' }}>- Remove</Button>
      </Box>
    </Box>
  );
};


const DynamicStudents = ({ textFieldStyling }: { textFieldStyling: SxProps<Theme> }) => {
  const [students, setStudents] = useState([{ name: "", contact: "" }]);

  const addStudent = () => setStudents([...students, { name: "", contact: "" }]);
  const removeStudent = () => students.length > 1 && setStudents([...students.slice(0, -1)]);

  return (
    <Box sx={{ width: '100%', p: 2, boxShadow: 3, borderRadius: 2, mb: 3 }}>
      {students.map((_, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextFieldElement
            sx={textFieldStyling}
            name={`students[${index}].name`}
            label="Student Name"
            required
          />
          <TextFieldElement
            sx={textFieldStyling}
            name={`students[${index}].contact`}
            label="Student Contact"
            required
          />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
        <Button onClick={addStudent} variant="text" sx={{ color: 'var(--fssgold)', fontSize: '0.9rem' }}>+ Add</Button>
        <Button onClick={removeStudent} variant="text" sx={{ color: 'var(--fssgold)', fontSize: '0.9rem' }}>- Remove</Button>
      </Box>
    </Box>
  );
};


async function sendClub(data: FormReturn, clubs: Club[]): Promise<void> {
  if (clubs.map((c: Club) => c.name).includes(data.name)) {
    window.alert("Error:\nClub name already exists.")
    return;
  }
  const dataProcessed: Club = {
    name: data.name,
    sponsors_name: data.sponsors?.map((s: Lead) => s.name) ?? [],
    sponsors_contact: data.sponsors?.map((s: Lead) => s.contact) ?? [],
    student_leads_name: data.students?.map((s: Lead) => s.name) ?? [],
    student_leads_contact: data.students?.map((s: Lead) => s.contact) ?? [],
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

type Lead = {
  name: string;
  contact: string;
}

type FormReturn = {
  name: string;
  students: Lead[];
  sponsors: Lead[];
  type: string;
  description: string | undefined;
  time: string | undefined;
  location: string | undefined;
  other: string | undefined;
}

type ClubWriterProps = {
  clubs: Club[];
}

export function ClubWriter( { clubs } : ClubWriterProps) {
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
      color: 'var(--foreground)',

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
      buttonClass="p-2 flex items-center justify-center m-3 mr-0 w-[5vw] min-w-[55px] h-[50px] text-xl !text-[var(--mid)] rounded-md select-text
      transform transition-transform duration-200 hover:scale-102 cursor-pointer bg-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3 className="!text-[var(--mid)]">
          <CreateIcon/>
        </h3>
      }
      modalTitle={"Club Creation Form"}
      modalContainerClass="
  w-[55vw] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2
  -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)] border-1 border-[var(--fssgold)]
  shadow-2xl p-4 text-gray
  max-h-[90vh] overflow-y-auto
"
      modalBody={
        <div
          className="w-full mt-[2vh] rounded-md flex flex-col justify-start overflow-auto items-center content-evenly p-2"
        >

          <FormContainer<FormReturn>
            defaultValues={{
              name: '',
              sponsors: [{}],
              students: [{}],
              type: '',
              description: '',
              time: '',
              location: '',
              other: '',
            }}
            onSuccess={data => sendClub(data, clubs)}
          >
            <Box display="flex" flexDirection="column" gap={4} className="w-full">

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Basic Info</h2>
                <TextFieldElement sx={textFieldStyling} name="name" label="Club Name" required/>
                <Controller
                  name="type"
                  rules={{ required: 'This field is required' }}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Autocomplete
                      sx={{
                        color: 'white',
                        '& .MuiSvgIcon-root': {
                          color: 'var(--foreground)',
                        },
                        ...textFieldStyling
                      }}
                      options={TYPES.filter((s: string) => s !== "All")}
                      getOptionLabel={(option: string) => option}
                      value={value || null}
                      onChange={(_, newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          label="Type *"
                          name="autoCompleteEntry"
                          sx={{
                            textFieldStyling
                          }}
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                )}/>
                <TextFieldElement sx={textFieldStyling} name="description" label="Description" />
              </Box>

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Sponsors</h2>
                <DynamicSponsors textFieldStyling={textFieldStyling} />
              </Box>

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Student Leads</h2>
                <DynamicStudents textFieldStyling={textFieldStyling} />
              </Box>

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Logistics</h2>
                <TextFieldElement sx={textFieldStyling} name="time" label="Meeting Times" />
                <TextFieldElement sx={textFieldStyling} name="location" label="Location" />
                <TextFieldElement sx={textFieldStyling} name="other" label="Other Info" />
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button type="submit" color="primary" sx={{ ...buttonStyling, width: '200px', margin: 0 }}>
                  Submit
                </Button>
              </Box>
            </Box>
          </FormContainer>

        </div>
      } />

  )
}