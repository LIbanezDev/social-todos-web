// https://space-x-lv.herokuapp.com/graphql
// if you instantiate in the server, the error will be thrown
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

export const getConcatenatedSubscriptionsLink = (
	authHttpLink: ApolloLink
): ApolloLink => {
	if (process.browser) {
		if (localStorage.getItem('token')) {
			const wsLink = new WebSocketLink({
				uri:
					process.env.NODE_ENV === 'production'
						? 'wss://social-todos-graph.herokuapp.com/graphql'
						: 'ws://localhost:4000/graphql',
				options: {
					reconnect: true,
					connectionParams: {
						authorization: localStorage.getItem('token'),
					},
				},
			});
			return split(
				({ query }) => {
					const definition = getMainDefinition(query);
					return (
						definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
					);
				},
				wsLink,
				authHttpLink
			);
		}
		return authHttpLink;
	}
	return authHttpLink;
};
