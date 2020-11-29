import React, { useState } from 'react';
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
import { ExpandMore, Search } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoaderCard from '../../components/shared/SkeletonLoaderCard';
import { useFetchUser } from '../../lib/hooks/useFetchUser';

export interface TeamFilters {
	name: string;
	publicTeam: boolean;
	loading: boolean;
}

const Teams = () => {
	const [openCreateTeamDialog, setOpenCreateTeamDialog] = useState<boolean>(false);
	const [filters, setFilters] = useState<TeamFilters>({
		name: '',
		publicTeam: false,
		loading: false,
	});
	const { user, loading: loadingUser } = useFetchUser({ required: true });
	const { data, loading, fetchMore, refetch } = useGetPaginatedTeamsQuery({
		variables: {
			data: {
				pageSize: 9,
			},
		},
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

	const filterTeams = async () => {
		setFilters(prev => ({ ...prev, loading: true }));
		await refetch({
			data: {
				pageSize: 3,
				name: filters.name === '' ? null : filters.name,
				onlyPublic: filters.publicTeam,
			},
		});
		setFilters(prev => ({ ...prev, loading: false }));
	};

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({
			name: evt.target.value,
			publicTeam: filters.publicTeam,
			loading: false,
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
							<AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
								<Typography>Filtros</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={7}>
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
											control={<Switch size='small' checked={filters.publicTeam} onChange={toggleChecked} />}
											label={'Solo publicos'}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Button
											variant='contained'
											color='primary'
											type='submit'
											disabled={filters.loading}
											endIcon={filters.loading ? <CircularProgress size={24} color='inherit' /> : <Search />}
											onClick={filterTeams}
										>
											Buscar
										</Button>
									</Grid>
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
				{loading || loadingUser ? (
					<CircularProgress />
				) : (
					<InfiniteScroll
						dataLength={data.teamsPaginated.items.length}
						next={fetchMoreTeams}
						hasMore={data.teamsPaginated.hasMore}
						loader={<SkeletonLoaderCard />}
					>
						<Grid container>
							<TeamsList user={user} filters={filters} teamsResult={data.teamsPaginated.items} />
						</Grid>
					</InfiniteScroll>
				)}
			</Grid>
		</Layout>
	);
};

export default Teams;
