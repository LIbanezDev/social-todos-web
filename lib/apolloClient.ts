import { useMemo } from 'react';
import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getConcatenatedSubscriptionsLink } from './subscriptionsLink';
import { setContext } from '@apollo/client/link/context';

const httpUploadLink: ApolloLink = createUploadLink({
	uri:
		process.env.NODE_ENV === 'production'
			? 'https://social-todos-graph.herokuapp.com/graphql'
			: 'https://social-todos-graph.herokuapp.com/graphql',
	// 'http://localhost:4000/graphql'
});

const authLink = process.browser
	? setContext((_, prevContext: { headers: object }) => {
			// get the authentication token from local storage if it exists
			const token = localStorage.getItem('token');
			// return the headers to the context so httpLink can read them
			return {
				headers: {
					...prevContext.headers,
					authorization: token ? token : '',
				},
			};
	  })
	: null;

const authHttpUploadLink = process.browser
	? authLink.concat(httpUploadLink)
	: httpUploadLink;

const link = getConcatenatedSubscriptionsLink(authHttpUploadLink);

export function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link,
		cache: new InMemoryCache(),
	});
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export function initializeApollo(
	initialState: null | object = null
): ApolloClient<NormalizedCacheObject> {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();
		// Restore the cache using the data passed from getStaticProps/getServerSideProps
		// combined with the existing cached data
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function useApollo(initialState) {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}
