import React, { FC } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './menuClasses';
import { useFetchUser } from '../../hooks/useFetchUser';
import { Typography } from '@material-ui/core';
import { ExitToApp, Lock } from '@material-ui/icons';
import Link from 'next/link';
import { navRoutes } from './pageRoutes';
import { useRouter } from 'next/router';

const MenuDrawer: FC = ({ children }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const { user, loading } = useFetchUser({ required: false });
	const { pathname } = useRouter();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<nav className={classes.nav}>
				<AppBar
					position='fixed'
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar variant='dense'>
						{!loading &&
							(!user ? (
								<Link href={'/auth'}>
									<IconButton
										color='inherit'
										aria-label='open drawer'
										edge='start'
										component='span'
										className={classes.menuButton}
									>
										<Lock />
									</IconButton>
								</Link>
							) : (
								<>
									<IconButton
										color='inherit'
										aria-label='open drawer'
										onClick={handleDrawerOpen}
										edge='start'
										className={clsx(
											classes.menuButton,
											open && classes.hide
										)}
									>
										<MenuIcon />
									</IconButton>
								</>
							))}
						<Typography variant='h6' noWrap>
							Social Todos
						</Typography>
					</Toolbar>
				</AppBar>
			</nav>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{navRoutes.map(route => (
						<Link key={route.route} href={route.route}>
							<ListItem
								button
								key={route.route}
								selected={pathname === route.route}
							>
								<ListItemIcon>
									{route.Icon && <route.Icon />}
								</ListItemIcon>
								<ListItemText primary={route.text} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
				<List>
					<ListItem
						button
						onClick={() => {
							localStorage.removeItem('token');
							window.location.href = '/';
						}}
					>
						<ListItemIcon>
							<ExitToApp />
						</ListItemIcon>
						<ListItemText primary={'Salir'} />
					</ListItem>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				{children}
			</main>
		</div>
	);
};

export default MenuDrawer;
