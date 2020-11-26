import React from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useGetMyReceivedFriendRequestsQuery, useGetUserByIdQuery } from '../../__generated__/GraphQLTypes';
import { useFetchUser } from '../../lib/hooks/useFetchUser';
import { Avatar, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import Image from 'next/image';
import { GitHub } from '@material-ui/icons';
import { getUserImageURL } from '../../utils/userImage';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const Profile = () => {
	const classes = useStyles();
	const { query } = useRouter();
	const userLoading = useFetchUser({ required: true });
	const { data: pendientFR, loading: loadingFRS } = useGetMyReceivedFriendRequestsQuery();
	const [value, setValue] = React.useState(0);
	const { data, loading } = useGetUserByIdQuery({
		variables: {
			id: parseInt(query.id as string),
		},
	});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Layout
			{...userLoading}
			title={'Social Todos - ' + data?.user.name}
			description='Mi perfil de social todos'
			authRequired={true}
		>
			{loading && userLoading.loading ? (
				<CircularProgress />
			) : (
				<div className={classes.root}>
					{data && (
						<>
							<AppBar position='static' color='default'>
								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor='primary'
									textColor='primary'
									variant='fullWidth'
									aria-label='full width tabs example'
								>
									<Tab label='Mi Información' {...a11yProps(0)} />
									<Tab label='Equipos' {...a11yProps(1)} />
									<Tab label='Amigos' {...a11yProps(2)} />
									{userLoading.user?.user.id === data.user.id && !loadingFRS && (
										<Tab label='Solicitudes de Amistad' {...a11yProps(3)} />
									)}
								</Tabs>
							</AppBar>

							<TabPanel value={value} index={0}>
								<Grid container className='animate__animated animate__fadeIn'>
									<Grid item xs={12} sm={4}>
										<Image
											src={getUserImageURL(data?.user.image)}
											width={200}
											height={200}
											alt={data?.user.name}
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Typography variant='body1'>
											{data?.user.name} <br />
											{data?.user.description} <br />
											{data?.user.email} <br />
											{data?.user.age} <br />
											{data?.user.github && <GitHub />}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Typography variant='body1'>{JSON.stringify(data?.user)}</Typography>
									</Grid>
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid container className='animate__animated animate__fadeIn'>
									<Grid item xs={12} sm={4}>
										<Typography variant='body1'>{JSON.stringify(data?.user.teams)}</Typography>
									</Grid>
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<Grid container className='animate__animated animate__fadeIn'>
									<Grid item xs={12} sm={4}>
										<Typography variant='body1'>{JSON.stringify(data?.user.friends)}</Typography>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Typography variant='body1'>Something</Typography>
									</Grid>
								</Grid>
							</TabPanel>
							{userLoading.user?.user.id === data.user.id && !loadingFRS && (
								<TabPanel value={value} index={3}>
									<Grid container className='animate__animated animate__fadeIn'>
										<Grid container>
											<Grid item xs={12}>
												<Typography variant={'h5'}> Solicitudes de amistad </Typography>
											</Grid>
										</Grid>
										<Grid container>
											<Grid item xs={12}>
												{pendientFR.myFriendRequests.map(fr => (
													<>
														<Avatar src={getUserImageURL(fr.sender.image)} />
														<Typography variant='body1'>{fr.sender.name}</Typography>
														<Button variant='contained' color='primary'>
															{' '}
															Aceptar{' '}
														</Button>
														<Button variant='contained' color='secondary'>
															{' '}
															Rechazar{' '}
														</Button>
													</>
												))}
											</Grid>
										</Grid>
									</Grid>
								</TabPanel>
							)}
						</>
					)}
				</div>
			)}
		</Layout>
	);
};

export default Profile;
