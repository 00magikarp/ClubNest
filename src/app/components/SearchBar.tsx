'use client';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import React from 'react';

interface SearchBarProps {
    onSearchAction: (query: string) => void;
}

const GoldOutlinedTextField = styled(TextField)({
    '& label': {
        color: 'var(--fssgold)',
    },
    '& label.Mui-focused': {
        color: 'var(--fssgold)',
    },
    '& .MuiOutlinedInput-root': {
        color: 'var(--foreground)',
        backgroundColor: 'var(--bars)',
        '& fieldset': {
            borderColor: 'var(--fssgold)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--fssgold)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--fssgold)',
        },
    },
});

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchAction }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchAction(event.target.value);
    };

    return (
        <GoldOutlinedTextField
            variant="outlined"
            fullWidth
            placeholder="Search clubs..."
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon style={{ color: 'var(--fssgold)' }} />
                    </InputAdornment>
                ),
            }}
        />
    );
};