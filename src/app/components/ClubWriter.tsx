'use client';

import {Controller, FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Box, SxProps, Theme, Autocomplete, TextField} from "@mui/material";
import { writeClub } from "@/lib/firebaseClient";
import {Club, TEXT_FIELD_STYLING, TYPES} from "@/lib/definitions";
import { ModalButton } from "@/app/components/ModalButton";
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

// Validation rules
const validationRules = {
  clubName: {
    required: 'Club name is required',
    minLength: { value: 3, message: 'Club name must be at least 3 characters' },
    maxLength: { value: 100, message: 'Club name must be less than 100 characters' },
    pattern: {
      value: /^[a-zA-Z0-9\s\-']+$/,
      message: 'Club name can only contain letters, numbers, spaces, hyphens, and apostrophes'
    }
  },
  personName: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 50, message: 'Name must be less than 50 characters' },
    pattern: {
      value: /^[a-zA-Z\s\-']+$/,
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
  },
  email: {
    required: 'Contact email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Please enter a valid email address'
    }
  },
  description: {
    maxLength: { value: 500, message: 'Description must be less than 500 characters' }
  },
  time: {
    maxLength: { value: 100, message: 'Meeting times must be less than 100 characters' }
  },
  location: {
    maxLength: { value: 100, message: 'Location must be less than 100 characters' }
  },
  other: {
    maxLength: { value: 300, message: 'Other info must be less than 300 characters' }
  }
};

const DynamicSponsors = ({ textFieldStyling }: { textFieldStyling: SxProps<Theme> }) => {
  const [sponsors, setSponsors] = useState([{ name: "", contact: "" }]);

  const addSponsor = () => setSponsors([...sponsors, { name: "", contact: "" }]);
  const removeSponsor = () => sponsors.length > 1 && setSponsors([...sponsors.slice(0, -1)]);

  return (
    <Box sx={{ width: '100%', p: 2, boxShadow: 3, borderRadius: 2, mb: 3, flexWrap: 'wrap' }}>
      {sponsors.map((_, index) => (
        <Box key={index} sx={{ display: "flex", flexDirection: { xs: "column", lg: "row"}, gap: 2, mb: 2 }}>
          <TextFieldElement
            sx={textFieldStyling}
            name={`sponsors[${index}].name`}
            label="Sponsor Name"
            rules={validationRules.personName}
          />
          <TextFieldElement
            sx={textFieldStyling}
            name={`sponsors[${index}].contact`}
            label="Sponsor Email"
            rules={validationRules.email}
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
        <Box key={index} sx={{ display: "flex", flexDirection: { xs: "column", lg: "row"}, gap: 2, mb: 2 }}>
          <TextFieldElement
            sx={textFieldStyling}
            name={`students[${index}].name`}
            label="Student Name"
            rules={validationRules.personName}
          />
          <TextFieldElement
            sx={textFieldStyling}
            name={`students[${index}].contact`}
            label="Student Email"
            rules={validationRules.email}
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
      min-w-[360px] w-[55vw] min-h-[525px] rounded-xl absolute top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)] border-1 border-[var(--fssgold)]
      shadow-2xl p-4 text-gray
      max-h-[90vh] overflow-y-auto
"
      modalBody={
        <div
          className="w-full mt-[4vh] rounded-md flex flex-col justify-start overflow-auto items-center content-evenly p-2"
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
            <Box display="flex" flexDirection="column" gap={4} className="w-full overflow-hidden">

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Basic Info</h2>
                <TextFieldElement
                  sx={TEXT_FIELD_STYLING}
                  name="name"
                  label="Club Name"
                  rules={validationRules.clubName}
                />
                <Controller
                  name="type"
                  rules={{ required: 'Club type is required' }}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Autocomplete
                      sx={{
                        color: 'white',
                        '& .MuiSvgIcon-root': {
                          color: 'var(--foreground)',
                        },
                        ...TEXT_FIELD_STYLING
                      }}
                      options={TYPES.filter((s: string) => s !== "All")}
                      getOptionLabel={(option: string) => option}
                      value={value || null}
                      onChange={(_, newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          label="Type *"
                          name="autoCompleteEntry"
                          sx={TEXT_FIELD_STYLING}
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}/>
                <TextFieldElement
                  sx={TEXT_FIELD_STYLING}
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  rules={validationRules.description}
                />
              </Box>

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Sponsors</h2>
                <DynamicSponsors textFieldStyling={TEXT_FIELD_STYLING} />
              </Box>

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Student Leads</h2>
                <DynamicStudents textFieldStyling={TEXT_FIELD_STYLING} />
              </Box>

              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Logistics</h2>
                <TextFieldElement
                  sx={TEXT_FIELD_STYLING}
                  name="time"
                  label="Meeting Times"
                  rules={validationRules.time}
                  placeholder="Mondays at Lunch"
                />
                <TextFieldElement
                  sx={TEXT_FIELD_STYLING}
                  name="location"
                  label="Location"
                  rules={validationRules.location}
                  placeholder="ISP Hub"
                />
                <TextFieldElement
                  sx={TEXT_FIELD_STYLING}
                  name="other"
                  label="Other Info"
                  multiline
                  rows={2}
                  rules={validationRules.other}
                  placeholder="Website, social media, etc."
                />
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <button type="submit" className="px-6 py-3 rounded-lg font-medium text-lg min-w-[120px] hover:scale-105 transform transition-all duration-200 border-2 border-[var(--fssgold)] bg-[var(--background)] text-[var(--fssgold)] hover:bg-[var(--fssgold)] hover:text-[var(--background)]">
                  Submit
                </button>
              </Box>
            </Box>
          </FormContainer>
        </div>
      } />
  )
}