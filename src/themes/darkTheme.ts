import { createTheme, ThemeOptions } from '@mui/material/styles';

export const DARK_THEME: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#42a5f5',
            contrastText: "#fff"
        },
        secondary: {
            main: '#ffcc80',
        },
        background: {
            default: '#151637',
            paper: '#212746',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)',
            disabled: 'rgba(255,255,255,0.5)'
        },
        divider: 'rgba(255, 255, 255, 0.12)'
    },
    typography: {
        fontFamily: "'Roboto', sans-serif"
    }
});