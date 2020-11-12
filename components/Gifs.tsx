import React from 'react';
import {GetTrendingGifsQuery} from "../__generated__/GraphQLTypes";
import {Typography} from "@material-ui/core";

const Gifs = ({queryResult}: { queryResult: GetTrendingGifsQuery }) => {

    return (
        <Typography>
            {
                queryResult.trendingGifs.map((gif) => {
                    return <img src={gif.images.fixed_height.url} alt={gif.title} key={gif.id}/>
                })
            }
            {JSON.stringify(queryResult, null, 4)}
        </Typography>
    );
};

export default Gifs;
