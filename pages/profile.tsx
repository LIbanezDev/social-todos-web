import React from 'react';
import { useFetchUser } from '../hooks/useFetchUser';
import Layout from '../components/layout/Layout';
import { CircularProgress, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import Image from 'next/image';

const Profile = () => {
	const userLoading = useFetchUser({ required: true });

	return (
		<Layout {...userLoading} title={'Social Todos - Mi Perfil'} description="Mi perfil de social todos">
			{userLoading.loading ? (
				<CircularProgress />
			) : (
				<React.Fragment>
					<Image
						src={
							userLoading.user?.me.github ||
							userLoading.user?.me.google
								? userLoading.user.me.image
								: `https://storage.googleapis.com/social_todos/${userLoading.user.me.image}`
						}
						width={200}
						height={200}
						alt={userLoading.user?.me.name}
					/>
					<Typography variant='body1'>
						{userLoading.user.me.name} <br />
						{userLoading.user.me.description} <br />
						{userLoading.user.me.email} <br />
						{userLoading.user.me.age} <br />
						{userLoading.user.me.github && <GitHub />}
					</Typography>
					<pre style={{ fontSize: '2rem' }}>
						{JSON.stringify(userLoading.user.me, null, 4)}
					</pre>
				</React.Fragment>
			)}
		</Layout>
	);
};

export default Profile;
