import React from 'react';
import Layout from '../components/layout/Layout';
import { useFetchUser } from '../hooks/useFetchUser';
import { useRouter } from 'next/router';
import { CircularProgress, Grid } from '@material-ui/core';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const Auth = () => {
	const { replace } = useRouter();
	const userLoading = useFetchUser({ required: false });

	if (userLoading.loading)
		return (
			<Layout title='Auth' {...userLoading}>
				<CircularProgress />
			</Layout>
		);

	if (userLoading.user) {
		replace('/');
	}

	return (
		<Layout title='Auth' {...userLoading}>
			<Grid item xs={12} sm={6}>
				<Login />
			</Grid>
			<Grid item xs={12} sm={6}>
				<Register />
			</Grid>
		</Layout>
	);
};

export default Auth;
