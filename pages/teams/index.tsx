import React from 'react';
import Layout from '../../components/layout/Layout';
import { useFetchUser } from '../../hooks/useFetchUser';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import {
	GetAllTeamsDocument,
	useGetAllTeamsQuery,
} from '../../__generated__/GraphQLTypes';
import CreateTeamForm from '../../components/team/CreateTeamForm';
import TeamsList from '../../components/team/TeamsList';
import { Grid } from '@material-ui/core';

const Teams = () => {
	const userLoading = useFetchUser({ required: false });
	const { data, loading } = useGetAllTeamsQuery();
	return (
		<Layout title={'Teams'} {...userLoading}>
			<Grid item xs={12} sm={4}>
				<CreateTeamForm />
			</Grid>
			{!loading && <TeamsList teamsResult={data} />}
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
