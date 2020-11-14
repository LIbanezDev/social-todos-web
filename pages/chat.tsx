import React, { useState } from 'react';
import { GetChatWithQuery } from '../__generated__/GraphQLTypes';
import Layout from '../components/layout/Layout';
import { useFetchUser } from '../hooks/useFetchUser';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import { Grid } from '@material-ui/core';
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
		>
			<Grid item xs={2}>
				<Users
					setMessages={setMessages}
					setSelectedUser={setSelectedUserId}
					selectedUser={selectedUserId}
				/>
				<SendMessage setMessages={setMessages} to={selectedUserId} />
			</Grid>
			<Grid item xs={10}>
				<Messages messages={messages} />
			</Grid>
		</Layout>
	);
};

export default Chat;
