// Create a theme instance.
import { createMuiTheme } from '@material-ui/core';

export const palette = {
	info: {
		main: '#24292e',
	},
	primary: {
		main: '#1976d2',
	},
	secondary: {
		main: '#24292e',
	},
	warning: {
		main: '#e9db2b',
	},
	error: {
		main: '#d41c1c',
	},
	background: {
		default: '#fff',
	},
};

const theme = createMuiTheme({
	palette,
});

export default theme;
