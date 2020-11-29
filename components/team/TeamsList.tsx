import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Add, Launch } from '@material-ui/icons';
import { GetPaginatedTeamsQuery, GetUserByIdQuery } from '../../__generated__/GraphQLTypes';
import { Button, Grid } from '@material-ui/core';
import Link from 'next/link';
import ConfirmJoinTeamDialog from './ConfirmJoinTeamDialog';
import { TeamFilters } from '../../pages/teams';
import { getUserImageURL } from '../../utils/userImage';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
}));

interface TeamsListProps {
	teamsResult: GetPaginatedTeamsQuery['teamsPaginated']['items'];
	filters: TeamFilters;
	user: GetUserByIdQuery;
}

const TeamsList = ({ teamsResult, user }: TeamsListProps) => {
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
			{teamsResult.map(team => (
				<Grid item xs={12} sm={3} key={team.id} style={{ marginBottom: 10 }}>
					<Card className={classes.root}>
						<CardMedia className={classes.media} image={getUserImageURL(team.image)} title='Contemplative Reptile' />
						<CardContent>
							<Typography gutterBottom component='h5' variant='h5'>
								{team.name}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								{team.description || 'Usuario sin descripcion'}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size='small'
								color='inherit'
								variant='contained'
								endIcon={<Add />}
								onClick={() => handleClickOpen(team.id, team.name, team.isPublic ? 'public' : 'private')}
								disabled={user.user.teams.findIndex(t => t.team.id === team.id) !== -1}
							>
								{user.user.teams.findIndex(t => t.team.id === team.id) !== -1 ? 'Ya eres parte del equipo' : 'Unirse'}
							</Button>
							<Link href={`/teams/${team.id}`}>
								<Button size='small' color='inherit' variant='contained' endIcon={<Launch />}>
									Abrir
								</Button>
							</Link>
						</CardActions>
					</Card>
				</Grid>
			))}
		</React.Fragment>
	);
};

export default TeamsList;
