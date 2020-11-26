import React from 'react';
import Layout from '../components/layout/Layout';
import Gifs from '../components/Gifs';
import { GetTrendingGifsDocument, useGetTrendingGifsQuery } from '../__generated__/GraphQLTypes';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import { Typography } from '@material-ui/core';

export default function Home() {
	const { data, loading } = useGetTrendingGifsQuery();
	return (
		<Layout
			title='Social Todos - Inicio'
			authRequired={false}
			description='Inicio Social Todos, crea, organiza todos e interactua con tu equipo u amigos'
		>
			<Typography variant='h1'> Social Todos </Typography>
			{!loading && <Gifs queryResult={data} />}
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const apollo = initializeApollo();
	await apollo.query({
		query: GetTrendingGifsDocument,
	});
	const cache = apollo.cache.extract();
	return {
		props: {
			initialApolloState: cache,
		},
		revalidate: 1,
	};
};
