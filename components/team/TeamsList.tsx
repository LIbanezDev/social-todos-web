import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { CloudDownload, FileCopy } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import { GetAllTeamsQuery } from '../../__generated__/GraphQLTypes';
import { Button, Grid } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 250,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 26,
		width: 26,
	},
}));

const TeamsList = ({ teamsResult }: { teamsResult: GetAllTeamsQuery }) => {
	const classes = useStyles();

	return (
		<>
			{teamsResult.teams.map(team => (
				<Grid item xs={12} sm={4}>
					<Card className={classes.root} elevation={5}>
						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Link href={`/teams/${team.id}`}>
									<Button color={'primary'}>
										<Typography component='h5' variant='h5'>
											{team.name}
										</Typography>
									</Button>
								</Link>
								<Typography
									variant='subtitle1'
									color='textSecondary'
								>
									{team.description}
								</Typography>
								<Typography
									variant='subtitle1'
									color='textSecondary'
								>
									{team.isPublic}
								</Typography>
							</CardContent>
							<div className={classes.controls}>
								<IconButton aria-label='previous'>
									<CloudDownload
										className={classes.playIcon}
										style={{ color: green[500] }}
									/>
								</IconButton>
								<IconButton aria-label='next'>
									<FileCopy
										className={classes.playIcon}
										color='primary'
									/>
								</IconButton>
							</div>
						</div>
						<CardMedia
							className={classes.cover}
							image={
								'https://storage.googleapis.com/social_todos/' +
								team.image
							}
							title='Team Image'
						/>
					</Card>
				</Grid>
			))}
		</>
	);
};

export default TeamsList;
