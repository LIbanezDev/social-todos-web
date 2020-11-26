import React from 'react';
import { useGetAllUsersQuery, useGetMyPendientFriendRequestsQuery } from '../../__generated__/GraphQLTypes';
import { CircularProgress, Grid } from '@material-ui/core';
import Layout from '../../components/layout/Layout';
import UserCard from '../../components/user/UserCard';
import { useFetchUser } from '../../lib/hooks/useFetchUser';

const Teams = () => {
	const { data, loading } = useGetAllUsersQuery();
	const userLoading = useFetchUser({ required: true });
	const { data: result, loading: loadingFR } = useGetMyPendientFriendRequestsQuery();

	return (
		<Layout
			description={'Lista de usuarios registrados en Social Todos'}
			title={'Social Todos - Usuarios'}
			authRequired={true}
		>
			{loading || loadingFR || userLoading.loading ? (
				<CircularProgress />
			) : (
				data.users.map(user => {
					return (
						userLoading.user.user.id !== user.id && (
							<Grid item xs={12} sm={3} key={user.id} style={{ marginBottom: 10 }}>
								<UserCard
									{...user}
									alreadySendFR={
										result.myPendientFriendRequests.findIndex(fr => fr.receiver.id == user.id) !==
										-1
									}
								/>
							</Grid>
						)
					);
				})
			)}
		</Layout>
	);
};

export default Teams;
