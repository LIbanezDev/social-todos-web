import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import { ExitToApp, Home, Lock, WhatsApp } from '@material-ui/icons';
import { useFetchUser } from '../../hooks/useFetchUser';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = () => {
	const classes = useStyles();
	const { user } = useFetchUser({ required: false });

	return (
		<header>
			<nav className={classes.root}>
				<AppBar position='static'>
					<Toolbar>
						<Link href='/'>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<Home />
							</IconButton>
						</Link>
						<Typography variant='h6' className={classes.title}>
							Social Todos
						</Typography>
						{user === null ? (
							<Link href={'/auth'}>
								<Button color='inherit' endIcon={<Lock />}>
									Auth
								</Button>
							</Link>
						) : (
							<>
								<Link href={'/chat'}>
									<Button
										color='inherit'
										endIcon={<WhatsApp />}
									>
										Chat
									</Button>
								</Link>
								<Link href={'/profile'}>
									<Button
										color='inherit'
										endIcon={<PersonIcon />}
									>
										Profile
									</Button>
								</Link>
								<Button
									color='inherit'
									onClick={() => {
										localStorage.removeItem('token');
										window.location.href = '/';
									}}
									endIcon={<ExitToApp />}
								>
									Logout
								</Button>
							</>
						)}
					</Toolbar>
				</AppBar>
			</nav>
		</header>
	);
};

export default Header;
