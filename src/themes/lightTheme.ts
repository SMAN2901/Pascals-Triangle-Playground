import { createTheme, ThemeOptions } from '@mui/material/styles';

export const LIGHT_THEME: ThemeOptions = createTheme({
    palette: {
        primary: {
            main: '#242b52',
        },
        secondary: {
            main: '#00b0ff',
        },
        background: {
            default: '#eeeeee',
            paper: '#ffffff',
        },
        success: {
            main: '#4caf50',
            light: 'rgba(111,191,115,0.38)',
        },
    },
});