'use client';

import { FormControl, InputLabel, MenuItem, Select, SxProps } from "@mui/material";
import React, {ReactNode, useState} from "react";

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

    const handleChange = (e: any) => {
        setSelectedOption(e.target.value);
        passToPage(e.target.value)
    }

    return (
        <FormControl className={formControlClass || ""}>
            <InputLabel sx={inputLabelStyle || null}>Club Category</InputLabel>
            <Select className={selectClass || ""} value={selectedOption} onChange={handleChange}>
            {
                TYPES.map((type: string, idx: number) => (
                    <MenuItem value = {type} key={idx} className="w-full bg-black">
                        <p className={dropDownTextClass}>{type}</p>
                    </MenuItem>
                ))
            };
            </Select>
        </FormControl>
    )
}