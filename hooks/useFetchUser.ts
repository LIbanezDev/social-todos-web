import {useEffect, useState} from 'react'
import {ApolloClient, ApolloQueryResult, useApolloClient} from "@apollo/client";
import {MeDocument, MeQuery, User} from "../generated/apolloComponents";

declare global {
    interface Window {
        __user: any;
    }
}

export async function fetchUser(client: ApolloClient<object>): Promise<Partial<User> | null> {

    if (typeof window !== 'undefined' && window.__user) {
        return window.__user
    }

    const {data: {me}}: ApolloQueryResult<MeQuery> = await client.query({query: MeDocument})

    if (!me) {
        delete window.__user
        return null
    }

    if (typeof window !== 'undefined') {
        window.__user = me
    }

    return me
}

interface FetchUserProps {
    required?: boolean
}

export function useFetchUser({required}: FetchUserProps) {

    const [loading, setLoading] = useState(
        () => !(typeof window !== 'undefined' && window.__user)
    )

    const apolloClient = useApolloClient()

    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null
        }
        return window.__user || null
    })

    useEffect(() => {
            if (!loading && user) {
                return
            }
            setLoading(true)
            let isMounted = true

            fetchUser(apolloClient)
                .then((user) => {
                    // Only set the user if the component is still mounted
                    if (isMounted) {
                        // When the user is not logged in but login is required
                        if (required && !user) {
                            window.location.href = '/auth'
                            return
                        }
                        setUser(user)
                        setLoading(false)
                    }
                })

            return () => {
                isMounted = false
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return {user, loading}
}
