import React from "react";
import {Box, Button, Card, CardContent, FormGroup, TextField, Typography} from '@material-ui/core';
import {Field, Form, Formik} from 'formik';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSnackbar} from "notistack";
import GoogleButton from "./GoogleButton";
import {External_Auth_Apps, useLoginMutation, useSocialLoginMutation} from "../../__generated__/GraphQLTypes";
import GithubButton from "./GithubButton";


const initialValues = {
    email: 'lucas.one@usm.cl',
    pass: 'pass1',
};

const Login = () => {
    const [login] = useLoginMutation()
    const [socialLogin] = useSocialLoginMutation()
    const {enqueueSnackbar} = useSnackbar();

    const onSuccess = async code => {
        const {data, errors} = await socialLogin({
            variables: {
                token: code.code,
                type: External_Auth_Apps.GitHub
            }
        })

        if (errors) return enqueueSnackbar('Hubo un error con la peticion, intente mas tarde.', {
            variant: 'error'
        })

        if (data.loginWithToken.ok) localStorage.setItem('token', data.loginWithToken.token)

        enqueueSnackbar(data.loginWithToken.msg, {
            variant: data.loginWithToken.ok ? 'success' : "error"
        })

        if (data.loginWithToken.ok) window.location.href = "/"
    }

    const onFailure = response => console.error(response);
    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <Card elevation={5}>
                    <CardContent>
                        <Typography variant="srOnly">Login</Typography>
                        <Formik
                            initialValues={initialValues} onSubmit={async (values) => {

                            const {data: {login: res}} = await login({
                                variables: values
                            })

                            if (res.ok) {
                                enqueueSnackbar('Bienvenido a la aplicación!', {
                                    variant: 'success'
                                })
                                localStorage.setItem('token', res.token)
                                window.location.href = "/"
                            } else {
                                enqueueSnackbar('Contraseña incorrecta', {
                                    variant: 'error'
                                })
                            }

                        }}>
                            {({isSubmitting}) => (
                                <Form autoComplete="off">
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="email" as={TextField} label="Email"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="pass" type="password" as={TextField} label="Password"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            startIcon={isSubmitting ? <CircularProgress size={24}/> : null}
                                            disabled={isSubmitting}>
                                            Login
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                        <Box marginBottom={2}>
                            <GoogleButton/>
                        </Box>
                        <Box marginBottom={2}>
                            <GithubButton clientId="4d39a3c2879f21dc07d5"
                                          redirectUri="https://social-todos-web.vercel.app/api/github/callback"
                                          onSuccess={onSuccess}
                                          onFailure={onFailure}
                                          buttonText="Ingresar con GitHub"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default Login
