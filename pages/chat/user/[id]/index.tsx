import React from 'react';
import {useRouter} from "next/router";
import {useGetChatWithQuery} from "../../../../generated/apolloComponents";
import Layout from "../../../../components/Layout";
import {useFetchUser} from "../../../../hooks/useFetchUser";
import SendMessage from "../../../../components/SendMessage";

const Index = () => {
    const {query} = useRouter()
    const userLoading = useFetchUser({required: true})
    const {data, refetch} = useGetChatWithQuery({
        variables: {
            with: parseInt(query.id as string)
        }
    })
    return (
        <Layout {...userLoading} refetch={refetch}>
            <h2> This is your chat with user {query.id} </h2>
            <SendMessage refetch={refetch} to={parseInt(query.id as string)}/>
            <pre> {JSON.stringify(data, null, 4)}</pre>
        </Layout>
    );
};

export default Index;
