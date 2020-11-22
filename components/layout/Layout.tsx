import * as React from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import {
	GetChatWithQuery,
	useSubToAllSubscription,
} from '../../__generated__/GraphQLTypes';
import { useSnackbar } from 'notistack';
import Header from './Header';
import { Grid } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import { updateCache } from '../../utils/cacheUtils';

type Props = {
	loading?: boolean;
	title?: string;
	setMessages?: React.Dispatch<React.SetStateAction<GetChatWithQuery>>;
	currentChat?: string;
	description: string
};

const Layout: React.FC<Props> = ({
	children,
	title = 'Social Todos',
	setMessages,
	currentChat,
	description = ''
}) => {
	const { data, loading: newNotificationLoading } = useSubToAllSubscription();
	const { cache } = useApolloClient();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (!newNotificationLoading) {
			updateCache(cache, data, setMessages, enqueueSnackbar, currentChat);
		}
	}, [data]);

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			<Header />
			<main>
				<Grid container>{children}</Grid>
			</main>
			<footer>
				<hr />
				<span>I'm here to stay (Footer)</span>
			</footer>
		</>
	);
};

export default Layout;
