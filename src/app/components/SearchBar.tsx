// components/SearchBar.tsx
'use client';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import React from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const GoldOutlinedTextField = styled(TextField)({
    '& label': {
        color: 'var(--fssgold)',
    },
    '& label.Mui-focused': {
        color: 'var(--fssgold)',
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
        backgroundColor: 'black',
        '& fieldset': {
            borderColor: 'var(--fssgold)',
        },
        '&:hover fieldset': {
            borderColor: 'gold',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--fssgold)',
        },
    },
});

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
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