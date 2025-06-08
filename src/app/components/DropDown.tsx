'use client';

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps} from "@mui/material";
import React, { useState } from "react";
import {TYPES} from "@/lib/definitions";

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