import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import Head from 'next/head';

Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routerChangeError', () => {
	NProgress.done();
});

export default function App({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);
	const [darkMode, setDarkMode] = useState(false);

	const adaptableTheme = createMuiTheme({
		palette: {
			...theme,
			type: darkMode ? 'dark' : 'light',
		},
	});

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<ThemeProvider theme={adaptableTheme}>
				<ApolloProvider client={apolloClient}>
					<SnackbarProvider
						maxSnack={10}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						autoHideDuration={2500}
					>
						<CssBaseline />
						<Component {...pageProps} setDarkMode={setDarkMode} />
					</SnackbarProvider>
				</ApolloProvider>
			</ThemeProvider>
		</>
	);
}
