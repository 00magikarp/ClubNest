'use client';

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps} from "@mui/material";
<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import {TYPES} from "@/lib/objects";
>>>>>>> 176b13cce3552bfa6924fd972bbf7e919707ab6f

type DropDownProps = {
    formControlClass?: string | undefined
    selectClass?: string | undefined
    inputLabelStyle?: SxProps | undefined
    dropDownTextClass?: string | undefined

    passToPageAction: (data: string) => void
}

export function DropDown({formControlClass, selectClass, inputLabelStyle, dropDownTextClass, passToPageAction}: DropDownProps) {
    const [selectedOption, setSelectedOption] = useState('All');

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectedOption(e.target.value);
        passToPageAction(e.target.value)
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