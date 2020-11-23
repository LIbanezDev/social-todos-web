import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { useSnackbar } from 'notistack';
import { External_Auth_Apps, useSocialLoginMutation } from '../../__generated__/GraphQLTypes';

const GoogleButton = () => {
	const [socialLogin] = useSocialLoginMutation();
	const { enqueueSnackbar } = useSnackbar();

	const responseGoogle = async (response: GoogleLoginResponse) => {
		console.log(response.profileObj);
		const { data, errors } = await socialLogin({
			variables: {
				token: response.tokenId,
				type: External_Auth_Apps.Google,
			},
		});
		if (errors) {
			return enqueueSnackbar('Error con la solicitud, intente nuevamente', {
				variant: 'error',
			});
		}
		if (data.loginWithToken.ok) {
			enqueueSnackbar('Bienvenido a la aplicación!', {
				variant: 'success',
			});
			localStorage.setItem('token', data.loginWithToken.token);
			window.location.href = '/';
		}
	};

	return (
		<GoogleLogin
			clientId='266693440871-e3l5gabolj8m3a79jnm95bbikrba9kkh.apps.googleusercontent.com'
			buttonText='Entrar con Google'
			onSuccess={responseGoogle}
			onFailure={() => {
				enqueueSnackbar('Login Fallido', { variant: 'error' });
			}}
			cookiePolicy={'single_host_origin'}
		/>
	);
};

export default GoogleButton;
