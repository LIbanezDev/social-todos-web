import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const SkeletonLoaderCard = () => {
	return (
		<Grid container>
			{[...Array(8)].map(() => (
				<Grid item xs={12} sm={3} style={{ marginBottom: 10 }}>
					<Skeleton variant='rect' height={140} width={345} />
				</Grid>
			))}
		</Grid>
	);
};

export default SkeletonLoaderCard;
