import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../lib/apolloClient'
import {AppProps} from "next/app";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from "next/router";
import React, {useState} from "react";
import theme from "../styles/theme";
import {ThemeProvider} from "@material-ui/styles";
import {SnackbarProvider} from "notistack";
import {createMuiTheme, CssBaseline, Paper} from "@material-ui/core";

Router.events.on('routeChangeStart', () => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})
Router.events.on('routerChangeError', () => {
    NProgress.done()
})

export default function App({Component, pageProps}: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState)
    const [darkMode, setDarkMode] = useState(false)

    const adaptableTheme = createMuiTheme({
        palette: {
            ...theme,
            type: darkMode ? 'dark' : 'light'
        }
    })

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={adaptableTheme}>
            <Paper style={{height: '100vh'}}>
                <ApolloProvider client={apolloClient}>
                    <SnackbarProvider
                        maxSnack={10}
                        anchorOrigin={{vertical: "top", horizontal: "right"}}
                        autoHideDuration={2500}>
                        <CssBaseline/>
                        {/*<Button color="inherit" endIcon={<NightsStay/>} onClick={() => {
                            setDarkMode(prev => !prev)
                        }}>
                            Dark Mode
                        </Button>*/}
                        <Component {...pageProps} setDarkMode={setDarkMode}/>
                    </SnackbarProvider>
                </ApolloProvider>
            </Paper>
        </ThemeProvider>
    )
}
