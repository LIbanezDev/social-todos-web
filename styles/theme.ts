import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        info: {
            main: '#24292e'
        },
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#24292e',
        },
        warning: {
            main: '#e9db2b'
        },
        error: {
            main: '#d41c1c',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;