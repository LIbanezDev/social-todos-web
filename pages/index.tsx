import React from 'react';
import { useFetchUser } from '../hooks/useFetchUser';
import Layout from '../components/layout/Layout';
import Gifs from '../components/Gifs';
import {
	GetTrendingGifsDocument,
	useGetTrendingGifsQuery,
} from '../__generated__/GraphQLTypes';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';

export default function Home() {
	const userLoading = useFetchUser({ required: false });
	const { data, loading } = useGetTrendingGifsQuery();
	return (
		<Layout title='Social Todos' {...userLoading}>
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
