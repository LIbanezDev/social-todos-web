import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useGetTeamByIdQuery } from '../../__generated__/GraphQLTypes';
import { useRouter } from 'next/router';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import {
	Avatar,
	Badge,
	CircularProgress,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getUserImageURL } from '../../utils/userImage';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const TeamDetails = () => {
	const router = useRouter();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [show, setShow] = useState(false);
	const { user, loading: loadingUser } = useFetchUser({ required: true });
	const { data, loading } = useGetTeamByIdQuery({
		variables: {
			id: parseInt(router.query.id as string),
		},
	});

	useEffect(() => {
		// Checking if user belongs to private team
		if (!loadingUser && !loading && !data.team.isPublic) {
			if (data.team.users.findIndex(u => u.user.id === user.user.id) === -1) {
				router.replace('/teams').then(() =>
					enqueueSnackbar('Es un equipo privado!', {
						variant: 'warning',
					})
				);
			} else {
				setShow(true);
			}
		}
	}, [loadingUser, loading]);

	return (
		<Layout
			title={data?.team.name || 'Team page'}
			description={'Detalles de equipo ' + data?.team.name + ', nombre, usuarios normales y administradores, y mas.'}
			authRequired={true}
		>
			{!show ? (
				<CircularProgress />
			) : (
				<>
					<Grid item xs={8}>
						<Grid container>
							<Grid item xs={12}>
								<Link href={'/teams'}>
									<IconButton color={'inherit'}>
										<ArrowBackIcon />
									</IconButton>
								</Link>
							</Grid>
							<Grid item>{JSON.stringify(data, null, 4)}</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<List dense className={classes.root}>
							{data?.team.users.map(user => {
								return (
									<ListItem key={user.user.id}>
										<ListItemAvatar>
											{user.userIsAdmin ? (
												<Badge badgeContent={'MOD'} color='primary'>
													<Avatar alt={user.user.name} src={getUserImageURL(user.user.image)} />
												</Badge>
											) : (
												<Avatar alt={user.user.name} src={getUserImageURL(user.user.image)} />
											)}
										</ListItemAvatar>
										<ListItemText id={user.user.id} primary={user.user.name} />
										<ListItemSecondaryAction>
											<IconButton />
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
					</Grid>
				</>
			)}
		</Layout>
	);
};

export default TeamDetails;
