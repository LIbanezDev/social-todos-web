import React from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useGetUserByIdQuery } from '../../__generated__/GraphQLTypes';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Image from 'next/image';
import { GitHub } from '@material-ui/icons';
import { getUserImageURL } from '../../utils/userImage';

const Profile = () => {
	const { query } = useRouter();
	const userLoading = useFetchUser({ required: true });
	const { data, loading } = useGetUserByIdQuery({
		variables: {
			id: parseInt(query.id as string),
		},
	});
	return (
		<Layout {...userLoading} title={'Social Todos - Mi Perfil'} description='Mi perfil de social todos'>
			{loading && userLoading.loading ? (
				<CircularProgress />
			) : (
				<React.Fragment>
					<Grid item xs={12} sm={4}>
						<Image src={getUserImageURL(data.user.image)} width={200} height={200} alt={data.user.name} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant='body1'>
							{data.user.name} <br />
							{data.user.description} <br />
							{data.user.email} <br />
							{data.user.age} <br />
							{data.user.github && <GitHub />}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<pre style={{ fontSize: '2rem' }}>{JSON.stringify(data, null, 4)}</pre>
					</Grid>
				</React.Fragment>
			)}
		</Layout>
	);
};

export default Profile;
