import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GetAllUsersQuery, useSendFriendRequestMutation } from '../../__generated__/GraphQLTypes';
import { getUserImageURL } from '../../utils/userImage';
import { Add, HourglassEmpty, Launch } from '@material-ui/icons';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

const UserCard = ({
	id,
	name,
	image,
	description,
	alreadySendFR,
}: GetAllUsersQuery['users']["items"][0] & { alreadySendFR: boolean }) => {
	const classes = useStyles();
	const [sendFR] = useSendFriendRequestMutation();
	const { enqueueSnackbar } = useSnackbar();
	const [isDisabled, setIsDisabled] = React.useState(false);

	const sendFriendRequest = async (to: string) => {
		const { data, errors } = await sendFR({
			variables: {
				to: parseInt(to),
			},
		});
		if (errors) {
			return enqueueSnackbar('Hubo un error al enviar la solicitud, intente mas tarde', {
				variant: 'error',
			});
		}
		if (data.sendFriendRequest.ok) {
			setIsDisabled(true);
		}
		enqueueSnackbar(data.sendFriendRequest.msg, {
			variant: data.sendFriendRequest.ok ? 'success' : 'error',
		});
	};

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={getUserImageURL(image)} title='Contemplative Reptile' />
			<CardContent>
				<Typography gutterBottom component='h5' variant='h5'>
					{name}
				</Typography>
				<Typography variant='body2' color='textSecondary' component='p'>
					{description || 'Usuario sin descripcion'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size='small'
					color='inherit'
					variant='contained'
					endIcon={alreadySendFR || isDisabled ? <HourglassEmpty /> : <Add />}
					onClick={() => sendFriendRequest(id)}
					disabled={alreadySendFR || isDisabled}
				>
					{alreadySendFR || isDisabled ? 'Solicitud pendiente' : 'Agregar a amigos'}
				</Button>
				<Link href={`/users/${id}`}>
					<Button size='small' color='inherit' variant='contained' endIcon={<Launch />}>
						Ver perfil
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};

export default UserCard;
