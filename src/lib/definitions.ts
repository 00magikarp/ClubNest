import {SxProps, Theme} from "@mui/material";

export type Club = {
  name: string;
  sponsors_name: string[];
  sponsors_contact: string[];
  student_leads_name: string[];
  student_leads_contact: string[];
  type: string;
  description?: string | undefined;
  time?: string | undefined;
  location?: string | undefined;
  other?: string | undefined;
  approved: number; // 0 = NOT, 1 = ARCHIVED, 2 = APPROVED
};

export type Roster = {
  firstName: string;
  lastName: string;
  student_id: number;
  club: string;
}

export type Student = {
  club: string;
  id: number;
  firstName: string;
  lastName: string;
}

// Alphabetical
export const TYPES: string[] = [
  "All",
  "Academics",
  "Activism",
  "Business",
  "Hobbies",
  "Humanities",
  "Identity",
  "STEM",
  "Other"
];

export const TEXT_FIELD_STYLING: SxProps<Theme> = {
  width: '100%',
  minWidth: "0",
  maxWidth: "100%",
  flex: 1,
  marginTop: 2,
  marginBottom: 2,
  "& .MuiInputLabel-root": {
    color: 'var(--foreground)',
    opacity: '95%',
    "& Mui.focused": {
      color: 'var(--fssgold)',
    }
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    color: 'var(--foreground)',

    '& fieldset': {
      borderColor: 'var(--border)',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'var(--fssgold)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--foreground)',
      borderWidth: 2,
    },

    input: {
      caretColor: 'white',
    },
  },
  "& input::placeholder": {
    color: 'gray',
    opacity: 0.95
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: '#ff6b6b',
    fontSize: '0.75rem',
    marginTop: '4px'
  },
  "& .MuiOutlinedInput-root.Mui-error": {
    '& fieldset': {
      borderColor: '#ff6b6b',
    },
    '&:hover fieldset': {
      borderColor: '#ff6b6b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff6b6b',
    },
  }
}

export const DATA_GRID_STYLING: SxProps<Theme> = {
  boxShadow: 2,
    border: 2,
    borderColor: 'var(--fssgold)',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    '& .MuiDataGrid-cell': {
    borderColor: 'var(--border)',
  },
  '& .MuiDataGrid-cell:hover': {
    color: 'var(--fssgold)',
      backgroundColor: 'var(--mid)',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'var(--mid)',
  },
  '& .MuiDataGrid-columnHeaders': {
    borderColor: 'var(--border)',
      backgroundColor: 'var(--background)',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: 'var(--foreground)',
  },
  '& .MuiDataGrid-columnSeparator': {
    color: 'var(--border)',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
  },
  '& .MuiDataGrid-toolbarContainer': {
    backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
  },
  '& .MuiButton-root': {
    color: 'var(--foreground)',
  },
  '& .MuiIconButton-root': {
    color: 'var(--foreground)',
  },
  '& .MuiTablePagination-root': {
    color: 'var(--foreground)',
  },
  '& .MuiTablePagination-selectLabel': {
    color: 'var(--foreground)',
  },
  '& .MuiTablePagination-displayedRows': {
    color: 'var(--foreground)',
  },
  '& .MuiTablePagination-select': {
    color: 'var(--foreground)',
  },
  '& .MuiTablePagination-actions': {
    color: 'var(--foreground)',
  },
  '& .MuiTablePagination-actions .MuiIconButton-root': {
    color: 'var(--foreground)',
  },
  '& .MuiSelect-icon': {
    color: 'var(--foreground)',
  },
}