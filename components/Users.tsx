import React, { Dispatch, SetStateAction } from 'react';
import {
	Avatar,
	CircularProgress,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
	GetChatWithDocument,
	GetChatWithQuery,
	useGetUsersQuery,
} from '../__generated__/GraphQLTypes';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { useFetchUser } from '../hooks/useFetchUser';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const Users = ({
	setMessages,
	setSelectedUser,
	selectedUser,
}: {
	setMessages: Dispatch<SetStateAction<GetChatWithQuery>>;
	setSelectedUser: Dispatch<SetStateAction<string>>;
	selectedUser: string;
}) => {
	const classes = useStyles();
	const { query } = useApolloClient();
	const { user, loading: loadingMe } = useFetchUser({ required: true });
	const { data: users, loading: loadingUsers } = useGetUsersQuery();

	const setChat = async (userId: number) => {
		const { data }: ApolloQueryResult<GetChatWithQuery> = await query({
			query: GetChatWithDocument,
			variables: {
				with: userId,
			},
		});
		setMessages(data);
	};

	const handleChangeChatClick = async (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: string
	) => {
		await setChat(parseInt(id));
		setSelectedUser(id);
	};

	return (
		<Paper elevation={1} className={classes.root}>
			{loadingUsers || loadingMe ? (
				<CircularProgress />
			) : (
				<List component='nav' aria-label='main mailbox folders'>
					{users.users.map(u => {
						if (u.id !== user.me.id) {
							return (
								<ListItem
									button
									selected={selectedUser === u.id}
									onClick={event => {
										handleChangeChatClick(event, u.id);
									}}
								>
									<ListItemIcon>
										<Avatar
											alt='Remy Sharp'
											src={
												u.image.slice(0, 8) ===
												'https://'
													? u.image
													: `https://storage.googleapis.com/social_todos/${
															u.image ||
															'users/default-avatar.jpg'
													  }`
											}
										/>
									</ListItemIcon>
									<ListItemText primary={u.name} />
								</ListItem>
							);
						}
					})}
				</List>
			)}
		</Paper>
	);
};
export default Users;
