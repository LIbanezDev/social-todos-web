import React from 'react';
import Layout from '../../components/layout/Layout';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import { useGetAllTeamsQuery } from '../../__generated__/GraphQLTypes';
import CreateTeamForm from '../../components/team/CreateTeamForm';
import TeamsList from '../../components/team/TeamsList';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';

const Teams = () => {
	const userLoading = useFetchUser({ required: false });
	const { data, loading } = useGetAllTeamsQuery();
	const [openCreateTeamDialog, setOpenCreateTeamDialog] = React.useState(false);
	return (
		<Layout
			title={'Social Todos - Teams'}
			{...userLoading}
			description='Social Todos - Lista de equipos disponibles, tanto privados como publicos'
		>
			<Grid item xs={12} sm={4}>
				<Grid container>
					<h2> Filtros </h2>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={8}>
				<Dialog
					open={openCreateTeamDialog}
					onClose={() => setOpenCreateTeamDialog(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>Crear un nuevo equipo</DialogTitle>
					<DialogContent>
						<CreateTeamForm />
					</DialogContent>
				</Dialog>
				<Button onClick={() => setOpenCreateTeamDialog(true)}> Open Create Team Dialog </Button>
			</Grid>
			{!userLoading.loading && !loading ? (
				<TeamsList teamsResult={data} teamsId={userLoading.user.user.teams.map(t => t.team.id)} />
			) : (
				<CircularProgress />
			)}
		</Layout>
	);
};

export default Teams;
