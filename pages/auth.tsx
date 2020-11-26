import React from 'react';
import Layout from '../components/layout/Layout';
import { useFetchUser } from '../lib/hooks/useFetchUser';
import { useRouter } from 'next/router';
import { CircularProgress, Grid } from '@material-ui/core';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const Auth = () => {
	const { replace } = useRouter();
	const { user, loading } = useFetchUser({ required: false });

	if (!loading && user) {
		replace('/');
	}

	return (
		<Layout
			title='Social Todos - Ingresa o registrate!'
			authRequired={false}
			description='Pagina de autenticacion de usuarios para la aplicacion Social Todos,
					contiene login con github y google'
		>
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<Grid item xs={12} sm={4}>
						<Login />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Register />
					</Grid>
				</>
			)}
		</Layout>
	);
};

export default Auth;
