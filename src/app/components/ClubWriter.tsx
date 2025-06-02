'use client';

import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { Button, Box, SxProps, Theme } from "@mui/material";
import { writeClub } from "@/lib/firebaseClient";
import { Club } from "@/lib/objects";
import { ModalButton } from "@/app/components/ModalButton";
import { useState } from 'react';

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
      <h3 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Club Sponsors</h3>
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
      <h3 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Student Leads</h3>
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
  w-[55vw] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2
  -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)] border-2 border-[var(--fssgold)]
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
            <Box display="flex" flexDirection="column" gap={4} className="w-full">

              {/* Basic Info Section */}
              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Basic Info</h2>
                <TextFieldElement sx={textFieldStyling} name="name" label="Club Name" required />
                <TextFieldElement sx={textFieldStyling} name="type" label="Type" required />
                <TextFieldElement sx={textFieldStyling} name="description" label="Description" />
              </Box>

              {/* Sponsors Section */}
              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Sponsors</h2>
                <DynamicSponsors textFieldStyling={textFieldStyling} />
              </Box>

              {/* Student Leads Section */}
              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Student Leads</h2>
                <DynamicStudents textFieldStyling={textFieldStyling} />
              </Box>

              {/* Logistics Section */}
              <Box sx={{ p: 3, boxShadow: 4, borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
                <h2 style={{ color: 'var(--fssgold)', marginBottom: '1rem' }}>Logistics</h2>
                <TextFieldElement sx={textFieldStyling} name="time" label="Meeting Times" />
                <TextFieldElement sx={textFieldStyling} name="location" label="Location" />
                <TextFieldElement sx={textFieldStyling} name="other" label="Other Info" />
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Button type="submit" color="primary" sx={{ ...buttonStyling, width: '200px' }}>
                  Submit
                </Button>
              </Box>
            </Box>
          </FormContainer>

        </div>
      } />

  )
}