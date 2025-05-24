import { FormContainer, TextFieldElement, SelectElement, useForm, Controller, useFormContext } from 'react-hook-form-mui'
import { Autocomplete, InputLabel, MenuItem, Box, Button, SxProps, Theme } from '@mui/material'
import { getClubs } from '@/lib/localstorage'
import { Club } from '@/lib/objects'
import { useEffect, useState } from 'react'


type FormProps = {
    selectElementStyle?: SxProps<Theme>,
    joinFormContainerStyle?: string | undefined,
    pLabelStyle?: string | undefined
}


export default function JoinForm({ selectElementStyle, joinFormContainerStyle }: FormProps) {

    const textFieldStyling: SxProps<Theme> = {
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

    const [clubs, setClubs] = useState<Club[]>([]);
    const formContext = useForm();
    const { handleSubmit } = formContext;

    useEffect(() => {
        getClubs().then(data => {
            setClubs(data);
        })
    }, [])

    const onSubmit = async (data: any) => {
        console.log(data)
    }

    return (
        <div className={joinFormContainerStyle}>
            <FormContainer
                formContext={formContext}
                onSuccess={onSubmit}
                defaultValues={{ gradeSelection: '', nameEntry: '', idEntry: '', autoCompleteEntry: null }}>
                <p>Grade Level:</p>
                <Box display="flex" flexDirection="column" gap="3">
                <SelectElement name="gradeSelection" sx={selectElementStyle}
                    options={[
                        { id: '9th', label: '9th' },
                        { id: '10th', label: '10th' },
                        { id: '11th', label: '11th' },
                        { id: '12th', label: '12th' },
                    ]}/>
                <TextFieldElement name="nameEntry" placeholder='NAME HERE' sx={textFieldStyling}></TextFieldElement>
                <TextFieldElement name="idEntry" placeholder='ENTER STUDENT ID' sx={textFieldStyling}></TextFieldElement>
                <Controller
                    name="clubSelection"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
                            sx={{
                                color: 'white',

                            }}
                            options={clubs}
                            getOptionLabel={(option: Club) => option.name}
                            value={value}
                            onChange={(_, newValue) => onChange(newValue)}
                            renderInput={(params) => (
                                <TextFieldElement
                                    name="autoCompleteEntry"
                                    {...params}
                                    label="Select a club"
                                    error={!!error}
                                    helperText={error?.message}
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