import React from 'react';
import Layout from '../../components/layout/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import {
	GetTeamByIdDocument,
	GetTeamsIdsDocument,
	useGetTeamByIdQuery,
} from '../../__generated__/GraphQLTypes';
import { useRouter } from 'next/router';
import { useFetchUser } from '../../hooks/useFetchUser';

const TeamDetails = () => {
	const router = useRouter();
	const userLoading = useFetchUser({ required: true });
	const { data } = useGetTeamByIdQuery({
		variables: {
			id: parseInt(router.query.id as string),
		},
	});

	return (
		<Layout
			{...userLoading}
			title={data?.team.name || 'Team page'}
			description={
				'Detalles de equipo ' +
				data?.team.name +
				', nombre, usuarios normales y administradores, y mas.'
			}
		>
			<pre style={{ fontSize: '2rem' }}>
				{' '}
				{JSON.stringify(data, null, 4)}
			</pre>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ctx => {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: GetTeamByIdDocument,
		variables: {
			id: parseInt(ctx.params.id as string),
		},
	});
	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({
		query: GetTeamsIdsDocument,
	});
	const paths = data.teams.map(team => ({
		params: { id: team.id.toString() },
	}));
	return {
		paths,
		fallback: true,
	};
};

export default TeamDetails;
