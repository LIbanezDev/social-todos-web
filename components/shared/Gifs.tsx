import React from 'react';
import { GetTrendingGifsQuery } from '../../__generated__/GraphQLTypes';
import { Typography } from '@material-ui/core';
import Image from 'next/image';

const Gifs = ({ queryResult }: { queryResult: GetTrendingGifsQuery }) => {
	return (
		<Typography>
			{queryResult.trendingGifs.map(gif => (
				<Image height='300' width='300' src={gif.images.fixed_height.url} alt={gif.title} key={gif.id} />
			))}
			{JSON.stringify(queryResult, null, 4)}
		</Typography>
	);
};

export default Gifs;
