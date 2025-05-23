import {FormContainer, TextFieldElement, SelectElement, useForm, Controller, useFormContext} from 'react-hook-form-mui'
import { Autocomplete, InputLabel, MenuItem } from '@mui/material'
import { SxProps, Theme } from '@mui/material'
import { getClubs } from '@/lib/localstorage'
import { Club } from '@/lib/objects'
import { ClubBox } from './ClubBox'
import { useEffect, useState } from 'react'

type FormProps = {
    selectElementStyle?: SxProps<Theme>,
    joinFormContainerStyle?: string | undefined,
    pLabelStyle?: string | undefined
}


export default function JoinForm({selectElementStyle, joinFormContainerStyle}: FormProps) {
        
    const [clubs, setClubs] = useState<Club[]>([]);
    const { handleSubmit } = useForm();

    useEffect(() => {
        getClubs().then(data => {
            setClubs(data);
        })
    }, [])

    const onSubmit = async () => {
        try {
            
        } catch (e) {

        }
    }

    return (
        <div className = {joinFormContainerStyle}>
            <FormContainer defaultValues={{gradeSelection: 'ENTER GRADE', nameEntry: 'NAME HERE', idEntry: 'ENTER STUDENT ID', autoCompleteEntry: 'ENTER CLUB'}}>
                <p>Grade Level:</p>
                <SelectElement name="gradeSelection" sx={selectElementStyle}
                options = {[
                    {id: '9th', label: '9th'},
                    {id: '10th', label: '10th'},
                    {id: '11th', label: '11th'},
                    {id: '12th', label: '12th'},
                ]}>
                </SelectElement>
                <p>Name:</p>
                <TextFieldElement name="nameEntry"></TextFieldElement>
                <p>Student ID:</p>
                <TextFieldElement name="idEntry"></TextFieldElement>
                <p>Club: </p>
                <Controller
                    name="clubSelection"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
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
                <button onClick={handleSubmit(onSubmit)}></button>
            </FormContainer>
        </div>
    )
}