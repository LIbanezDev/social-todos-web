import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Eject, Lock, LockOpen} from '@material-ui/icons';
import {GetPaginatedTeamsQuery} from '../../__generated__/GraphQLTypes';
import {Button, Grid, Tooltip} from '@material-ui/core';
import Link from 'next/link';
import ConfirmJoinTeamDialog from './ConfirmJoinTeamDialog';
import {TeamFilters} from '../../pages/teams';

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

interface TeamsListProps {
	teamsResult: GetPaginatedTeamsQuery['teamsPaginated']['items'];
	filters: TeamFilters;
}

const TeamsList = ({ teamsResult }: TeamsListProps) => {
	const classes = useStyles();
	const [openDialog, setOpenDialog] = useState<{
		public: boolean;
		private: boolean;
		open: boolean;
	}>({
		open: false,
		public: false,
		private: false,
	});
	const [teamSelected, setTeamSelected] = useState<{
		id: string;
		name: string;
	}>({
		id: '0',
		name: '',
	});

	const handleClickOpen = (teamId: string, teamName: string, dialogType: 'public' | 'private') => {
		setOpenDialog({
			open: true,
			private: false,
			public: false,
			[dialogType]: true,
		});
		setTeamSelected({
			id: teamId,
			name: teamName,
		});
	};

	const handleClose = () => {
		setOpenDialog({
			open: false,
			public: false,
			private: false,
		});
	};

	return (
		<React.Fragment>
			<ConfirmJoinTeamDialog
				open={openDialog.open}
				handleClose={handleClose}
				teamSelected={teamSelected}
				publicTeam={openDialog.public}
			/>
			{teamsResult
				.map(team => (
					<Grid item xs={12} sm={4} key={team.id}>
						<Card className={classes.root} elevation={5}>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									{team.isPublic ? (
										<Link href={`/teams/${team.id}`}>
											<Button color={'primary'}>
												<Typography component='h5' variant='h5'>
													{team.name}
												</Typography>
											</Button>
										</Link>
									) : (
										<Typography component='h5' variant='h5'>
											{team.name}
										</Typography>
									)}
									<Typography variant='subtitle1' color='textSecondary'>
										{team.description}
									</Typography>
								</CardContent>
								<div className={classes.controls}>
									<IconButton color='default' disabled>
										{team.isPublic ? (
											<LockOpen className={classes.playIcon} />
										) : (
											<Lock className={classes.playIcon} />
										)}
									</IconButton>
									<IconButton color='primary'>
										<Tooltip title={'Join Team'} aria-label={'join team'}>
											<Eject
												className={classes.playIcon}
												onClick={() =>
													handleClickOpen(
														team.id,
														team.name,
														team.isPublic ? 'public' : 'private'
													)
												}
											/>
										</Tooltip>
									</IconButton>
								</div>
							</div>
							<CardMedia
								className={classes.cover}
								image={'https://storage.googleapis.com/social_todos/' + team.image}
								title='Team Image'
							/>
						</Card>
					</Grid>
				))}
		</React.Fragment>
	);
};

export default TeamsList;
