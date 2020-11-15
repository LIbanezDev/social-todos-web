import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
	GetChatWithDocument,
	GetChatWithQuery,
	useSendMessageMutation,
} from '../__generated__/GraphQLTypes';
import {
	Button,
	CircularProgress,
	Grid,
	TextField,
	Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Send, InsertEmoticon } from '@material-ui/icons/';
import { useApolloClient } from '@apollo/client';
import dynamic from 'next/dynamic';
import { IEmojiData } from 'emoji-picker-react';

const Picker = dynamic(() => import('emoji-picker-react'), {
	ssr: false,
});

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export const SendMessage = ({
	setMessages,
	to,
}: {
	setMessages: Dispatch<SetStateAction<GetChatWithQuery>>;
	to: string;
}) => {
	const [inputValues, setInputValues] = useState({
		msg: '',
		isSubmitting: false,
	});
	const [sendMessage] = useSendMessageMutation();
	const classes = useStyles();
	const { cache } = useApolloClient();
	const [openEmojis, setOpenEmojis] = useState(false);

	const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
		setInputValues(prevState => ({
			...prevState,
			msg: prevState.msg + emojiObject.emoji,
		}));
	};

	const handleOpenEmojis = () => {
		setOpenEmojis(!openEmojis);
	};

	const handleSendMessage = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setInputValues(prev => ({ ...prev, isSubmiting: true }));
		const {
			data: { enviarMensaje: res },
		} = await sendMessage({
			variables: {
				msg: inputValues.msg,
				to: parseInt(to),
			},
		});
		if (!res.ok) {
			console.log('El mensaje no se ha podido enviar');
		} else {
			const { myChat }: GetChatWithQuery = cache.readQuery({
				query: GetChatWithDocument,
				variables: {
					with: parseInt(to),
				},
			});
			const newMessage = res.message;
			setMessages({
				myChat: [...myChat, newMessage],
			});
			cache.writeQuery({
				query: GetChatWithDocument,
				variables: {
					with: parseInt(to),
				},
				data: {
					myChat: [...myChat, newMessage],
				},
			});
			setInputValues({ msg: '', isSubmitting: false });
		}
	};

	const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputValues({
			...inputValues,
			[evt.target.name]: evt.target.value,
		});
	};

	return (
		<form className={classes.root} autoComplete='off' noValidate>
			<Grid item xs={12}>
				<TextField
					id='outlined-basic'
					label='Mensaje...'
					variant='outlined'
					type='text'
					name='msg'
					value={inputValues.msg}
					onChange={handleInputChange}
				/>
				{openEmojis && <Picker onEmojiClick={onEmojiClick} />}
			</Grid>
			<Grid item xs={4}>
				<Button
					variant='contained'
					color='primary'
					className={classes.button}
					disabled={inputValues.isSubmitting}
					endIcon={
						inputValues.isSubmitting ? (
							<CircularProgress />
						) : (
							<Send />
						)
					}
					onClick={handleSendMessage}
					type='submit'
				>
					Send
				</Button>
				<Button onClick={handleOpenEmojis}>
					<InsertEmoticon />
				</Button>
			</Grid>
		</form>
	);
};

export default SendMessage;
