import React, {useState} from 'react';
import {useRouter} from "next/router";
import {useGetChatWithQuery} from "../../../../generated/apolloComponents";
import Layout from "../../../../components/Layout";
import {useFetchUser} from "../../../../hooks/useFetchUser";
import SendMessage from "../../../../components/SendMessage";

const Index = () => {
    const {query} = useRouter()
    const [messages, setMessages] = useState([])
    const userLoading = useFetchUser({required: true})
    const {data} = useGetChatWithQuery({
        variables: {
            with: parseInt(query.id as string)
        },
        onCompleted: function (data) {
          setMessages(data.myChat)
        }
    })
    return (
        <Layout {...userLoading}>
            <h2> This is your chat with user {query.id} </h2>
            <SendMessage setMessages={setMessages} to={parseInt(query.id as string)}/>
            <pre> {JSON.stringify(messages, null, 4)}</pre>
        </Layout>
    );
};

export default Index;
