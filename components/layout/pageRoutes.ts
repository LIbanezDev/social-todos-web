import { Group, Home, WhatsApp, PersonAdd } from '@material-ui/icons';
import { FC } from 'react';

interface Route {
	text: string;
	route: string;
	Icon?: FC;
}

export const navRoutes: Array<Route> = [
	{
		Icon: Home,
		route: '/',
		text: 'Inicio',
	},
	{
		Icon: PersonAdd,
		route: '/users',
		text: 'Usuarios',
	},
	{
		Icon: Group,
		route: '/teams',
		text: 'Equipos',
	},
	{
		Icon: WhatsApp,
		route: '/chat',
		text: 'Mi Chat',
	},
];
