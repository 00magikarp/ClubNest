import {FormContainer, TextFieldElement, SelectElement, useForm, Controller} from 'react-hook-form-mui'
import { Autocomplete, InputLabel, MenuItem } from '@mui/material'
import { SxProps, Theme } from '@mui/material'
import { getClubs } from '@/lib/localstorage'
import { Club } from '@/lib/objects'
import { ClubBox } from './ClubBox'
import { useEffect, useState } from 'react'

type FormProps = {
    selectElementStyle?: SxProps<Theme>,
    joinFormContainerStyle?: string | undefined,
    clubs?: Club[] | null
}


export default function JoinForm({selectElementStyle, joinFormContainerStyle, clubs}: FormProps) {
    const formContext = useForm({
        defaultValues: {gradeSelection: '9th', nameEntry: 'Foo Bar Baz', idEntry: '123456', clubSelection: null}
    })

    const {control} = formContext;
    
    const [clubOptions, setClubOptions] = useState<Club[]>([]);

    // useEffect(() => {
    //     if (clubs) {
    //         clubs.then(setClubOptions);
    //     }
    // }, [clubs])

    return (
        <div className = {joinFormContainerStyle}>
            <FormContainer defaultValues={{gradeSelection: '9th', nameEntry: 'Foo Bar Baz', idEntry: '123456', autoCompleteEntry: ''}}>
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
                 <Controller
                    name="clubSelection"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
                            options={clubOptions}
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
            </FormContainer>
        </div>
    )
}