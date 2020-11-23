import React, { useState } from 'react';
import { GetChatWithQuery } from '../__generated__/GraphQLTypes';
import Layout from '../components/layout/Layout';
import { useFetchUser } from '../lib/hooks/useFetchUser';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import { Grid, Typography } from '@material-ui/core';
import Users from '../components/Users';

const Chat = () => {
	const userLoading = useFetchUser({ required: true });
	const [messages, setMessages] = useState<GetChatWithQuery>(null);
	const [selectedUserId, setSelectedUserId] = useState('0');

	return (
		<Layout
			{...userLoading}
			setMessages={setMessages}
			currentChat={selectedUserId}
			description='Chat de Social Todos'
			title='Social Todos - Chat'
		>
			<Grid item xs={12} sm={12}>
				<Typography variant='h1'> Social Todos Chat </Typography>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Users setMessages={setMessages} setSelectedUser={setSelectedUserId} selectedUser={selectedUserId} />
				<SendMessage setMessages={setMessages} to={selectedUserId} />
			</Grid>
			<Grid item xs={12} sm={8}>
				<Messages messages={messages} />
			</Grid>
		</Layout>
	);
};

export default Chat;
