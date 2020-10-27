import {useMemo} from 'react'
import {ApolloClient, InMemoryCache} from '@apollo/client'
import {createUploadLink} from "apollo-upload-client";
import {getConcatenatedSubscriptionsLink} from "./subscriptionsLink";
import {setContext} from "@apollo/client/link/context";

const httpUploadLink = createUploadLink({
    uri: process.env.NODE_ENV === 'production' ?
        'https://social-to-dos.vercel.app/api/graphql' :
        'http://localhost:4000/graphql',
    credentials: 'same-origin',
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});
const authHttpUploadLink = authLink.concat(httpUploadLink)

const link = getConcatenatedSubscriptionsLink(authHttpUploadLink)

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link,
        cache: new InMemoryCache(),
    })
}

let apolloClient;

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState})
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState) {
    return useMemo(() => initializeApollo(initialState), [initialState])
}
