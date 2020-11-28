import React from 'react';
import Layout from '../../components/layout/Layout';
import { useGetPaginatedTeamsQuery } from '../../__generated__/GraphQLTypes';
import CreateTeamForm from '../../components/team/CreateTeamForm';
import TeamsList from '../../components/team/TeamsList';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@material-ui/lab';

export interface TeamFilters {
	name: string;
	publicTeam: boolean;
}

const Teams = () => {
	const { data, loading, fetchMore } = useGetPaginatedTeamsQuery({
		variables: {
			data: {
				pageSize: 9,
			},
		},
	});
	const [openCreateTeamDialog, setOpenCreateTeamDialog] = React.useState<boolean>(false);
	const [filters, setFilters] = React.useState<TeamFilters>({
		name: '',
		publicTeam: null,
	});

	const fetchMoreTeams = async () => {
		await fetchMore({
			variables: {
				data: {
					cursor: data.teamsPaginated.cursor,
					pageSize: 9,
				},
			},
		});
	};

	const toggleChecked = () => {
		setFilters(prev => ({
			...prev,
			publicTeam: !prev.publicTeam,
		}));
	};

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({
			name: evt.target.value,
			publicTeam: filters.publicTeam,
		});
	};

	return (
		<Layout
			authRequired={true}
			title={'Social Todos - Teams'}
			description='Social Todos - Lista de equipos disponibles, tanto privados como publicos'
		>
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
			<Grid container style={{ marginBottom: 10 }}>
				<Grid item xs={12} sm={4}>
					<Grid container>
						<Accordion elevation={3}>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls='panel1a-content'
								id='panel1a-header'
							>
								<Typography>Filtros</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid item xs={12} sm={7} style={{ marginRight: 10 }}>
									<TextField
										id='search-by-name'
										value={filters.name}
										onChange={handleInputChange}
										label='Buscar por nombre'
										variant='outlined'
									/>
								</Grid>
								<Grid item xs={12} sm={5}>
									<FormControlLabel
										control={
											<Switch
												size='small'
												checked={filters.publicTeam}
												onChange={toggleChecked}
											/>
										}
										label={'Solo publicos'}
									/>
								</Grid>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Button variant='contained' color='primary' onClick={() => setOpenCreateTeamDialog(true)}>
						Crear un equipo
					</Button>
				</Grid>
			</Grid>
			<Grid container>
				{loading ? (
					<CircularProgress />
				) : (
					<InfiniteScroll
						dataLength={data.teamsPaginated.items.length}
						next={fetchMoreTeams}
						hasMore={data.teamsPaginated.hasMore}
						loader={
							<Grid container spacing={2}>
								{[...Array(6)].map(() => (
									<Grid item xs={12} sm={4}>
										<Skeleton variant='rect' width={480} height={20} />
										<Skeleton variant='rect' width={480} height={160} />
									</Grid>
								))}
							</Grid>
						}
					>
						<Grid container spacing={2}>
							<TeamsList filters={filters} teamsResult={data.teamsPaginated.items} />
						</Grid>
					</InfiniteScroll>
				)}
			</Grid>
		</Layout>
	);
};

export default Teams;
