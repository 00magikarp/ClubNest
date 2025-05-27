'use client';

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps} from "@mui/material";
import React, {useState} from "react";

export const TYPES: string[] = [
  "All",
  "Activism",
  "Arts",
  "Business",
  "Identity",
  "Fitness",
  "Hobbies",
  "STEM",
  "Service",
  "Other"
];

type DropDownProps = {
    formControlClass?: string | undefined
    selectClass?: string | undefined
    inputLabelStyle?: SxProps | undefined
    dropDownTextClass?: string | undefined

    passToPage: (data: string) => void
}

export function DropDown({formControlClass, selectClass, inputLabelStyle, dropDownTextClass, passToPage}: DropDownProps) {
    const [selectedOption, setSelectedOption] = useState('All');

    const handleChange = (e: SelectChangeEvent) => {
        setSelectedOption(e.target.value as string);
        passToPage(e.target.value as string)
    }

    return (
        <FormControl className={formControlClass || ""}>
            <InputLabel sx={inputLabelStyle || null}>Club Category</InputLabel>
            <Select className={selectClass || ""} value={selectedOption} onChange={handleChange} sx={{}}>
            {
                TYPES.map((type: string, idx: number) => (
                    <MenuItem value = {type} key={idx} className="w-full" sx={{}}>
                        <p className={dropDownTextClass}>{type}</p>
                    </MenuItem>
                ))
            }
            </Select>
        </FormControl>
    )
}