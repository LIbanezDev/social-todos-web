import React from 'react';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { GetChatWithQuery } from '../__generated__/GraphQLTypes';
import { useFetchUser } from '../hooks/useFetchUser';

const Messages = ({ messages }: { messages: GetChatWithQuery | null }) => {
	const { user } = useFetchUser({ required: true });
	return (
		<Paper elevation={1}>
			{!messages ? (
				<Typography variant='body2'> Selecciona un chat </Typography>
			) : (
				messages.myChat.map(msg => (
					<Grid
						container
						key={msg.date}
						justify={
							msg.sender.id === user.me.id
								? 'flex-end'
								: 'flex-start'
						}
					>
						<Grid item xs={3}>
							<Typography>
								<Avatar
									aria-label='recipe'
									src={
										!msg.sender.image
											? 'https://storage.googleapis.com/social_todos/users/default-graph.png'
											: msg.sender.image.slice(0, 8) ===
											  'https://'
											? msg.sender.image
											: `https://storage.googleapis.com/social_todos/${
													msg.sender.image ||
													'users/default-avatar.jpg'
											  }`
									}
								/>
								{msg.content}
							</Typography>
						</Grid>
					</Grid>
				))
			)}
		</Paper>
	);
};

export default Messages;
