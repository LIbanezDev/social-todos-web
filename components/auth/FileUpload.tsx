import React from 'react';
import { IconButton, Theme } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
}));

export const Upload = ({
	onChange,
}: {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const classes = useStyles();
	return (
		<>
			<input
				type='file'
				accept='image/*'
				id='icon-button-file'
				onChange={onChange}
				className={classes.input}
			/>
			<label htmlFor='icon-button-file'>
				<IconButton
					color='primary'
					aria-label='upload picture'
					component='span'
				>
					<PhotoCamera color='secondary' />
				</IconButton>
			</label>
		</>
	);
};
