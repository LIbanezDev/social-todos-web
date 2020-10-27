import React from "react";
import {useUploadFileMutation} from "../generated/apolloComponents";

export const Upload = () => {
    const [uploadFile] = useUploadFileMutation();

    const onChangeHandler = async (event): Promise<void> => {
        console.log(event.target.files[0])
        const res = await uploadFile({
            variables: {file: event.target.files[0]}
        });
        console.log(res)
    }
    return (
        <input type="file" name="file" onChange={onChangeHandler}/>
    );
};
