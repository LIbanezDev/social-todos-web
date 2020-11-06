import * as React from 'react'
import {useEffect} from 'react'
import Head from 'next/head'
import {GetChatWithDocument, GetChatWithQuery, MeQuery, useSubToAllSubscription} from "../../__generated__/GraphQLTypes";
import {useSnackbar} from "notistack";
import Header from "./Header";
import {Grid} from "@material-ui/core";
import {useApolloClient} from "@apollo/client";

type Props = {
    loading?: boolean,
    title?: string,
    setMessages?: React.Dispatch<React.SetStateAction<GetChatWithQuery>>
    currentChat?: string
}

const Layout: React.FC<Props> = (
    {children, title = 'This is the default title', setMessages, currentChat}) => {
    const {data, loading: newMessageLoading} = useSubToAllSubscription()
    const {cache} = useApolloClient()
    const {enqueueSnackbar} = useSnackbar()


    useEffect(() => {
        if (!newMessageLoading) {
            const {esperarNuevosMensajes: newMessage} = data

            const queryConfig = {
                query: GetChatWithDocument,
                variables: {
                    with: parseInt(newMessage.sender.id)
                }
            }
            try {
                const cacheMsgs: GetChatWithQuery = cache.readQuery(queryConfig)
                cache.writeQuery({
                    ...queryConfig,
                    data: {
                        myChat: [...cacheMsgs.myChat, newMessage]
                    }
                })
            } catch (e) {
            }
            if (currentChat && currentChat === newMessage.sender.id || currentChat === newMessage.receiver.id) {
                setMessages(prevState => ({
                    myChat: [...prevState.myChat, newMessage]
                }))
            }
            enqueueSnackbar(`Tienes un nuevo mensaje: ${newMessage.content}!`, {
                variant: 'success'
            })
        }
    }, [data])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8'/>
                <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            </Head>
            <Header/>
            <main>
                <Grid container style={{padding: "10px"}} spacing={1}>
                    {children}
                </Grid>
            </main>
            <footer>
                <hr/>
                <span>I'm here to stay (Footer)</span>
            </footer>
        </>
    )
}

export default Layout
