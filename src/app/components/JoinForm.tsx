'use client';

import { FormContainer, TextFieldElement, Controller } from 'react-hook-form-mui'
import { Autocomplete, Box, Button, SxProps, Theme } from '@mui/material'
import {Club, Student} from '@/lib/objects'
import {writeStudent} from "@/lib/firebaseClient";
import {clubs} from "@/app/page";
import {useEffect, useState} from "react";


type FormProps = {
    selectElementStyle?: SxProps<Theme>,
    joinFormContainerStyle?: string | undefined,
    pLabelStyle?: string | undefined
}

type FormReturn = {
    club: Club;
    id: string;
    firstName: string;
    lastName: string;
}

async function sendData(data: FormReturn): Promise<void> {
    if (isNaN(Number(data.id))) {
        window.alert("Error: ID is not a number.")
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


export default function JoinForm({ selectElementStyle, joinFormContainerStyle }: FormProps) {
    const textFieldStyling: SxProps<Theme> = {
        margin: 1,
        border: 3,
        borderRadius: 3,
        borderColor: 'var(--fssgold)',
        "& input": {
            caretColor:'white',
            color: 'white'
        },
        "& input::placeholder": {
            color: 'gray',
            opacity: 0.95
        },

    }

    return (
        <div className={joinFormContainerStyle}>
            <FormContainer<FormReturn>
              onSuccess={data => sendData(data)}
              defaultValues={{ firstName: '', lastName: '', id: '', club: '' }}>
                <Box display="flex" flexDirection="column" gap="3">
                <TextFieldElement name="firstName" placeholder='FIRST NAME HERE' sx={textFieldStyling} required/>
                <TextFieldElement name="lastName" placeholder='LAST NAME HERE' sx={textFieldStyling} required/>
                <TextFieldElement name="id" placeholder='ENTER STUDENT ID' sx={textFieldStyling} required/>
                <Controller
                    name="club"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
                            sx={{
                                color: 'white',
                                ...textFieldStyling
                            }}
                            options={clubs}
                            getOptionLabel={(option: Club) => option.name}
                            value={value || null}
                            onChange={(_, newValue) => onChange(newValue)}
                            renderInput={(params) => (
                                <TextFieldElement
                                    name="autoCompleteEntry"
                                    {...params}
                                    label="Select a club"
                                    error={!!error}
                                    helperText={error?.message}
                                    required={value in clubs}
                                />
                            )}
                        />
                    )}
                />
                <Button type="submit" variant="contained" className="rounded-3">Submit</Button>
                </Box>
            </FormContainer>
        </div>
    )
}