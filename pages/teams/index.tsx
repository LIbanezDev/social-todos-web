import React from 'react';
import Layout from '../../components/layout/Layout';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { GetAllTeamsDocument, useGetAllTeamsQuery } from '../../__generated__/GraphQLTypes';
import CreateTeamForm from '../../components/team/CreateTeamForm';
import TeamsList from '../../components/team/TeamsList';
import { Grid } from '@material-ui/core';

const Teams = () => {
	const userLoading = useFetchUser({ required: false });
	const { data, loading } = useGetAllTeamsQuery();

	return (
		<Layout
			title={'Social Todos - Teams'}
			{...userLoading}
			description='Social Todos - Lista de equipos disponibles, tanto privados como publicos'
		>
			<Grid item xs={12} sm={4}>
				<CreateTeamForm />
			</Grid>
			{!userLoading.loading && !loading && (
				<TeamsList teamsResult={data} teamsId={userLoading.user.user.teams.map(t => t.team.id)} />
			)}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: GetAllTeamsDocument,
	});
	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
};

export default Teams;
