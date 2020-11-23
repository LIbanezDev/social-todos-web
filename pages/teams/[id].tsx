import React from 'react';
import Layout from '../../components/layout/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { GetTeamByIdDocument, GetTeamsIdsDocument, useGetTeamByIdQuery } from '../../__generated__/GraphQLTypes';
import { useRouter } from 'next/router';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import {
	Avatar,
	Badge,
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
	const userLoading = useFetchUser({ required: true });
	const { data } = useGetTeamByIdQuery({
		variables: {
			id: parseInt(router.query.id as string),
		},
	});

	return (
		<Layout
			{...userLoading}
			title={data?.team.name || 'Team page'}
			description={
				'Detalles de equipo ' + data?.team.name + ', nombre, usuarios normales y administradores, y mas.'
			}
		>
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
									<IconButton/>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</Grid>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ctx => {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: GetTeamByIdDocument,
		variables: {
			id: parseInt(ctx.params.id as string),
		},
	});
	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({
		query: GetTeamsIdsDocument,
	});
	const paths = data.teams.map(team => ({
		params: { id: team.id.toString() },
	}));
	return {
		paths,
		fallback: true,
	};
};

export default TeamDetails;
