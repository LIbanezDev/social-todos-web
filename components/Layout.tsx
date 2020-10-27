import * as React from 'react'
import {useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {User, useSubToAllSubscription} from "../generated/apolloComponents";
import {useSnackbar} from "notistack";

type Props = {
    user?: User,
    loading?: boolean,
    title?: string,
    refetch?: any
}

const Layout: React.FC<Props> = (
    {children, title = 'This is the default title', refetch}) => {
    const {data, loading} = useSubToAllSubscription()
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (!loading) {
            const {esperarNuevosMensajes:{content}} = data
            refetch().then(() => {
                    enqueueSnackbar(`Tienes un nuevo mensaje: ${content}!`, {
                        variant: 'success'
                    })
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
            <header>
                <nav>
                    <Link href='/'><a>Home</a></Link> | {' '}
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <hr/>
                <span>I'm here to stay (Footer)</span>
            </footer>
        </>
    )
}

export default Layout
