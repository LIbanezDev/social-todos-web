import React from 'react';
import {useGetPhotoQuery} from "../generated/apolloComponents";

const Photo = () => {
    const {data} = useGetPhotoQuery({
        variables: {
            id: 14
        }
    })
    return (
        <div>
            <pre> {JSON.stringify(data, null, 4)}</pre>
        </div>
    );
};

export default Photo;
