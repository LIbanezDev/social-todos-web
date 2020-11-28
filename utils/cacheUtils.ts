import {
	GetChatWithDocument,
	GetChatWithQuery,
	GetMyPendientFriendRequestsDocument,
	GetMyPendientFriendRequestsQuery,
	Message,
	SubToAllSubscription,
} from '../__generated__/GraphQLTypes';
import { ApolloCache } from '@apollo/client';
import * as React from 'react';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export const updateCache = (
	cache: ApolloCache<object>,
	data: SubToAllSubscription,
	setMessages: React.Dispatch<React.SetStateAction<GetChatWithQuery>>,
	enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey,
	currentChat: string | null
) => {
	try {
		if (data.waitNotifications.__typename === 'Message') {
			const { content, sender, receiver } = data.waitNotifications;
			const queryConfig = {
				query: GetChatWithDocument,
				variables: {
					with: parseInt(sender.id),
				},
			};
			enqueueSnackbar(`Tienes un nuevo mensaje: ${content}!`, {
				variant: 'success',
			});
			const cacheData: GetChatWithQuery = cache.readQuery(queryConfig);
			cache.writeQuery({
				...queryConfig,
				data: {
					myChat: [...cacheData.myChat, data.waitNotifications],
				},
			});
			if (currentChat) {
				if (currentChat === sender.id || currentChat === receiver.id) {
					// @ts-ignore
					setMessages(prevState => ({
						myChat: [...prevState.myChat, data.waitNotifications],
					}));
				}
			}
		}

		if (data.waitNotifications.__typename === 'FriendRequest') {
			const queryConfig = {
				query: GetMyPendientFriendRequestsDocument,
			};
			console.log(data.waitNotifications);
			enqueueSnackbar(`Tienes una nueva solicitud de amistad de: ${data.waitNotifications.sender.name}!`, {
				variant: 'success',
			});
			const cacheData: GetMyPendientFriendRequestsQuery = cache.readQuery(queryConfig);
			cache.writeQuery({
				...queryConfig,
				data: {
					myFriendRequests: [...cacheData.myPendientFriendRequests, data.waitNotifications],
				},
			});
		}
	} catch (e: unknown) {}
};

export const mergePaginatedData = (existing, incoming)  =>{
	// Slicing is necessary because the existing data is
	// immutable, and frozen in development.
	const merged = existing ? existing.items.slice(0) : [];
	for (let i = 0; i < incoming.items.length; ++i) {
		merged[existing ? existing.items.length + i : i] = incoming.items[i];
	}
	return {...incoming, items: merged};
}
