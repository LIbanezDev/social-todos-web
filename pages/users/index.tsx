import React from 'react';
import { useGetAllUsersQuery, useGetMyPendientFriendRequestsQuery } from '../../__generated__/GraphQLTypes';
import { CircularProgress, Grid } from '@material-ui/core';
import Layout from '../../components/layout/Layout';
import UserCard from '../../components/user/UserCard';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import { Skeleton } from '@material-ui/lab';
import InfiniteScroll from 'react-infinite-scroll-component';

const Teams = () => {
	const { data, loading, fetchMore } = useGetAllUsersQuery({
		variables: {
			data: {
				pageSize: 8,
			},
		},
	});
	const userLoading = useFetchUser({ required: true });
	const { data: result, loading: loadingFR } = useGetMyPendientFriendRequestsQuery();

	const fetchMoreUsers = async () => {
		await fetchMore({
			variables: {
				data: {
					cursor: data.users.cursor,
					pageSize: 4,
				},
			},
		});
	};

	return (
		<Layout
			description={'Lista de usuarios registrados en Social Todos'}
			title={'Social Todos - Usuarios'}
			authRequired={true}
		>
			<Grid container>
				{loading || loadingFR || userLoading.loading ? (
					<CircularProgress />
				) : (
					<InfiniteScroll
						dataLength={data.users.items.length}
						next={fetchMoreUsers}
						hasMore={data.users.hasMore}
						loader={
							<Grid container>
								{[...Array(8)].map(() => (
									<Grid item xs={12} sm={3} style={{ marginBottom: 10 }}>
										<Skeleton variant='rect' height={140} width={345} />
									</Grid>
								))}
							</Grid>
						}
					>
						<Grid container>
							{data.users.items.map(user => {
								return (
									userLoading.user.user.id !== user.id && (
										<Grid item xs={12} sm={3} key={user.id} style={{ marginBottom: 10 }}>
											<UserCard
												{...user}
												alreadySendFR={
													result.myPendientFriendRequests.findIndex(
														fr => fr.receiver.id == user.id
													) !== -1
												}
											/>
										</Grid>
									)
								);
							})}
						</Grid>
					</InfiniteScroll>
				)}
			</Grid>
		</Layout>
	);
};

export default Teams;
