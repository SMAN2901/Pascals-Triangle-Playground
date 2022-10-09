import { createTheme, ThemeOptions } from '@mui/material/styles';

export const LIGHT_THEME: ThemeOptions = createTheme({
    palette: {
        mode: "light",
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
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)'
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    },
    typography: {
        fontFamily: "'Roboto', sans-serif"
    }
});