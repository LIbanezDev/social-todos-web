import { useEffect, useState } from 'react';
import { ApolloClient, ApolloQueryResult, NormalizedCacheObject, useApolloClient } from '@apollo/client';
import { GetUserByIdDocument, GetUserByIdQuery } from '../../__generated__/GraphQLTypes';
import { useRouter } from 'next/router';

declare global {
	interface Window {
		__user: GetUserByIdQuery;
	}
}

export async function fetchUser(client: ApolloClient<NormalizedCacheObject>): Promise<GetUserByIdQuery> {
	if (typeof window !== 'undefined' && window.__user) {
		return window.__user;
	}

	const { data }: ApolloQueryResult<GetUserByIdQuery> = await client.query({
		query: GetUserByIdDocument,
		variables: {
			id: -1,
		},
	});

	if (!data.user) {
		delete window.__user;
		return null;
	}

	if (typeof window !== 'undefined') {
		window.__user = data;
	}

	return data;
}

interface FetchUserProps {
	required?: boolean;
}

export function useFetchUser({ required }: FetchUserProps) {
	const [loading, setLoading] = useState<boolean>(() => !(typeof window !== 'undefined' && window.__user));
	const { replace } = useRouter();
	const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;

	const [user, setUser] = useState<GetUserByIdQuery | null>(() => {
		if (typeof window === 'undefined') {
			return null;
		}
		return window.__user || null;
	});

	useEffect(() => {
		if (!loading && user) {
			return;
		}
		setLoading(true);
		let isMounted = true;

		fetchUser(apolloClient).then(user => {
			// Only set the user if the component is still mounted
			if (isMounted) {
				// When the user is not logged in but login is required
				if (required && !user) {
					if (localStorage.getItem('token')) {
						localStorage.removeItem('token');
					}
					replace('/auth');
					return;
				}
				setUser(user);
				setLoading(false);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	return { user, loading };
}
