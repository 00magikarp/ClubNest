'use client';

import { FormControl, Button, TextField } from "@mui/material";
import { Controller, TextFieldElement, UseFormReturn } from "react-hook-form-mui";
import { useState } from "react";

import { FormContainer } from "react-hook-form-mui";

const sendClubStatus = async (data: Boolean) => {
    const res = 
    data ? await archiveClub() : true;
}

export default function Home() {
    const [buttonState, setButtonState] = useState(true);

    return (
        <div>
            <header>
                FORM
            </header>
            <h1>
                Is your club continuing?
            </h1>
            <FormContainer<Boolean> onSuccess={data => console.log(data)}>
                <Controller name="submitValue" render={({ field }) => (
                    <Button onClick={() => {
                        setButtonState(!buttonState);
                        field.onChange(!buttonState);
                    }}
                    >
                        {buttonState ? "Yes" : "No"}
                    </Button>
                )} />
                <Button type="submit">
                    Submit
                </Button>
            </FormContainer>
        </div>
    );
}