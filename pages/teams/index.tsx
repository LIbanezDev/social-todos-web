import React from 'react';
import Layout from '../../components/layout/Layout';
import { GetAllTeamsDocument, useGetAllTeamsQuery } from '../../__generated__/GraphQLTypes';
import CreateTeamForm from '../../components/team/CreateTeamForm';
import TeamsList from '../../components/team/TeamsList';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
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
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';

export interface TeamFilters {
	name: string;
	publicTeam: boolean;
}

const Teams = () => {
	const { query } = useRouter();
	const { data, loading } = useGetAllTeamsQuery({
		variables: {
			offset: 0,
			limit: 6,
		},
	});
	const [openCreateTeamDialog, setOpenCreateTeamDialog] = React.useState<boolean>(false);
	const [filters, setFilters] = React.useState<TeamFilters>({
		name: null,
		publicTeam: null,
	});

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
				<Grid item xs={12} sm={8} justify='flex-end'>
					<Button variant='contained' color='primary' onClick={() => setOpenCreateTeamDialog(true)}>
						Crear un equipo
					</Button>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<TeamsList filters={filters} teamsResult={data} />
			</Grid>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const apollo = initializeApollo();
	await apollo.query({
		query: GetAllTeamsDocument,
		variables: {
			offset: 0,
			limit: 6,
		},
	});
	const cache = apollo.cache.extract();
	return {
		props: {
			initialApolloState: cache,
		},
	};
};

export default Teams;
