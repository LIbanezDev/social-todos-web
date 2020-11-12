import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** Data on versions of this GIF with a fixed height of 200 pixels. Good for mobile use. */
export type FixedImage = {
  __typename?: 'FixedImage';
  /** The publicly-accessible direct URL for this GIF for this size of the GIF */
  url: Scalars['String'];
  /** The width of this GIF in pixels. */
  width: Scalars['String'];
  /** The height of this GIF in pixels. */
  height: Scalars['String'];
  /** size: string */
  size: Scalars['String'];
};

/** The Images Object found in the GIF Object contains a series of Rendition Objects. These Rendition Objects includes the URLs and sizes for the many different renditions we offer for each GIF. */
export type Image = {
  __typename?: 'Image';
  /** Data on versions of this GIF with a fixed height of 200 pixels. Good for mobile use. */
  fixed_height: FixedImage;
  /** Data on versions of this GIF with a fixed width of 200 pixels. Good for mobile use. */
  fixed_width: FixedImage;
};

/** GIF Objects are returned from most of GIPHY API's Endpoints. These objects contain a variety of information, such as the Image Object, which itself includes the URLS for multiple different GIFS formats and sizes. */
export type Giphy = {
  __typename?: 'Giphy';
  /** By default, this is almost always GIF. */
  type: Scalars['String'];
  /** This GIF's unique ID */
  id: Scalars['String'];
  /** The unique URL for this GIF */
  url: Scalars['String'];
  /** The unique bit.ly URL for this GIF */
  bitly_url: Scalars['String'];
  /** A URL used for embedding this GIF */
  embed_url: Scalars['String'];
  /** The username this GIF is attached to, if applicable */
  username: Scalars['String'];
  /** The page on which this GIF was found */
  source: Scalars['String'];
  /** The MPAA-style rating for this content. Examples include Y, G, PG, PG-13 and R */
  rating: Scalars['String'];
  /** The title that appears on giphy.com for this GIF.d */
  title: Scalars['String'];
  /** The date this GIF was added to the GIPHY database. */
  create_datetime: Scalars['String'];
  /** An object containing data for various available formats and sizes of this GIF. */
  images: Image;
};

export type MutationError = {
  __typename?: 'MutationError';
  path?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  name: Scalars['String'];
  users: Array<User>;
};

/** Registered users */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  age: Scalars['Float'];
  description: Scalars['String'];
  google: Scalars['Boolean'];
  github: Scalars['Boolean'];
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  sentMessages: Array<Message>;
  receivedMessages: Array<Message>;
  teams: Array<Team>;
};

/** Mensajes enviados entre los usuarios. */
export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  content: Scalars['String'];
  sender: User;
  receiver: User;
};


export type MessageResponse = IMutationResponse & {
  __typename?: 'MessageResponse';
  ok: Scalars['Boolean'];
  msg?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<MutationError>>;
  message?: Maybe<Message>;
};

export type RegisterResponse = IMutationResponse & {
  __typename?: 'RegisterResponse';
  ok: Scalars['Boolean'];
  msg?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<MutationError>>;
  user?: Maybe<User>;
};

export type LoginResponse = IMutationResponse & {
  __typename?: 'LoginResponse';
  ok: Scalars['Boolean'];
  msg?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<MutationError>>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type IMutationResponse = {
  ok: Scalars['Boolean'];
  msg?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<MutationError>>;
};

/** Informacion necesaria para crear nuevos usuarios */
export type UserRegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  bornDate: Scalars['DateTime'];
  image?: Maybe<Scalars['Upload']>;
  imageURL?: Maybe<Scalars['String']>;
};


/** Datos necesarios para ingresar mediante una aplicacion externa como GitHub o Google */
export type SocialRegisterInput = {
  token: Scalars['String'];
  type: External_Auth_Apps;
};

/** External auth apps like GitHub or Google */
export enum External_Auth_Apps {
  Google = 'Google',
  GitHub = 'GitHub'
}

export type Query = {
  __typename?: 'Query';
  /** Trending giphpys */
  trendingGifs?: Maybe<Array<Giphy>>;
  /** Search gifs */
  searchGifs?: Maybe<Array<Giphy>>;
  myChat: Array<Message>;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryTrendingGifsArgs = {
  offset?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
};


export type QuerySearchGifsArgs = {
  query: Scalars['String'];
};


export type QueryMyChatArgs = {
  with: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  enviarMensaje: MessageResponse;
  register: RegisterResponse;
  login: LoginResponse;
  loginWithToken: LoginResponse;
};


export type MutationEnviarMensajeArgs = {
  message: Scalars['String'];
  to: Scalars['Float'];
};


export type MutationRegisterArgs = {
  data: UserRegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginWithTokenArgs = {
  data: SocialRegisterInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  esperarNuevosMensajes: Message;
};

export type RegisterMutationVariables = Exact<{
  data: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'ok' | 'msg'>
    & { errors?: Maybe<Array<(
      { __typename?: 'MutationError' }
      & Pick<MutationError, 'msg' | 'path'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'age' | 'email'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  pass: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'ok' | 'msg' | 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'MutationError' }
      & Pick<MutationError, 'msg' | 'path'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'age' | 'description' | 'github' | 'image' | 'google'>
  )> }
);

export type SocialLoginMutationVariables = Exact<{
  token: Scalars['String'];
  type: External_Auth_Apps;
}>;


export type SocialLoginMutation = (
  { __typename?: 'Mutation' }
  & { loginWithToken: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'ok' | 'msg' | 'token'>
  ) }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'image'>
  )> }
);

export type GetTrendingGifsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendingGifsQuery = (
  { __typename?: 'Query' }
  & { trendingGifs?: Maybe<Array<(
    { __typename?: 'Giphy' }
    & Pick<Giphy, 'id' | 'title' | 'url'>
    & { images: (
      { __typename?: 'Image' }
      & { fixed_height: (
        { __typename?: 'FixedImage' }
        & Pick<FixedImage, 'url'>
      ) }
    ) }
  )>> }
);

export type MessagePayloadFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'content' | 'date'>
  & { receiver: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'age' | 'image'>
  ), sender: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'age' | 'image'>
  ) }
);

export type SubToAllSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubToAllSubscription = (
  { __typename?: 'Subscription' }
  & { esperarNuevosMensajes: (
    { __typename?: 'Message' }
    & MessagePayloadFragment
  ) }
);

export type SendMessageMutationVariables = Exact<{
  msg: Scalars['String'];
  to: Scalars['Float'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { enviarMensaje: (
    { __typename?: 'MessageResponse' }
    & Pick<MessageResponse, 'ok' | 'msg'>
    & { errors?: Maybe<Array<(
      { __typename?: 'MutationError' }
      & Pick<MutationError, 'msg' | 'path'>
    )>>, message?: Maybe<(
      { __typename?: 'Message' }
      & MessagePayloadFragment
    )> }
  ) }
);

export type GetChatWithQueryVariables = Exact<{
  with: Scalars['Int'];
}>;


export type GetChatWithQuery = (
  { __typename?: 'Query' }
  & { myChat: Array<(
    { __typename?: 'Message' }
    & MessagePayloadFragment
  )> }
);

export const MessagePayloadFragmentDoc = gql`
    fragment MessagePayload on Message {
  content
  date
  receiver {
    id
    name
    age
    image
  }
  sender {
    id
    name
    age
    image
  }
}
    `;
export const RegisterDocument = gql`
    mutation register($data: UserRegisterInput!) {
  register(data: $data) {
    ok
    msg
    errors {
      msg
      path
    }
    user {
      id
      age
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $pass: String!) {
  login(email: $email, password: $pass) {
    ok
    msg
    errors {
      msg
      path
    }
    token
    user {
      id
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      pass: // value for 'pass'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    name
    email
    age
    description
    github
    image
    google
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SocialLoginDocument = gql`
    mutation socialLogin($token: String!, $type: EXTERNAL_AUTH_APPS!) {
  loginWithToken(data: {token: $token, type: $type}) {
    ok
    msg
    token
  }
}
    `;
export type SocialLoginMutationFn = Apollo.MutationFunction<SocialLoginMutation, SocialLoginMutationVariables>;
export type SocialLoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SocialLoginMutation, SocialLoginMutationVariables>, 'mutation'>;

    export const SocialLoginComponent = (props: SocialLoginComponentProps) => (
      <ApolloReactComponents.Mutation<SocialLoginMutation, SocialLoginMutationVariables> mutation={SocialLoginDocument} {...props} />
    );
    

/**
 * __useSocialLoginMutation__
 *
 * To run a mutation, you first call `useSocialLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSocialLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [socialLoginMutation, { data, loading, error }] = useSocialLoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSocialLoginMutation(baseOptions?: Apollo.MutationHookOptions<SocialLoginMutation, SocialLoginMutationVariables>) {
        return Apollo.useMutation<SocialLoginMutation, SocialLoginMutationVariables>(SocialLoginDocument, baseOptions);
      }
export type SocialLoginMutationHookResult = ReturnType<typeof useSocialLoginMutation>;
export type SocialLoginMutationResult = Apollo.MutationResult<SocialLoginMutation>;
export type SocialLoginMutationOptions = Apollo.BaseMutationOptions<SocialLoginMutation, SocialLoginMutationVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    name
    image
  }
}
    `;
export type GetUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUsersQuery, GetUsersQueryVariables>, 'query'>;

    export const GetUsersComponent = (props: GetUsersComponentProps) => (
      <ApolloReactComponents.Query<GetUsersQuery, GetUsersQueryVariables> query={GetUsersDocument} {...props} />
    );
    

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetTrendingGifsDocument = gql`
    query getTrendingGifs {
  trendingGifs {
    id
    title
    url
    images {
      fixed_height {
        url
      }
    }
  }
}
    `;
export type GetTrendingGifsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetTrendingGifsQuery, GetTrendingGifsQueryVariables>, 'query'>;

    export const GetTrendingGifsComponent = (props: GetTrendingGifsComponentProps) => (
      <ApolloReactComponents.Query<GetTrendingGifsQuery, GetTrendingGifsQueryVariables> query={GetTrendingGifsDocument} {...props} />
    );
    

/**
 * __useGetTrendingGifsQuery__
 *
 * To run a query within a React component, call `useGetTrendingGifsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingGifsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingGifsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrendingGifsQuery(baseOptions?: Apollo.QueryHookOptions<GetTrendingGifsQuery, GetTrendingGifsQueryVariables>) {
        return Apollo.useQuery<GetTrendingGifsQuery, GetTrendingGifsQueryVariables>(GetTrendingGifsDocument, baseOptions);
      }
export function useGetTrendingGifsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrendingGifsQuery, GetTrendingGifsQueryVariables>) {
          return Apollo.useLazyQuery<GetTrendingGifsQuery, GetTrendingGifsQueryVariables>(GetTrendingGifsDocument, baseOptions);
        }
export type GetTrendingGifsQueryHookResult = ReturnType<typeof useGetTrendingGifsQuery>;
export type GetTrendingGifsLazyQueryHookResult = ReturnType<typeof useGetTrendingGifsLazyQuery>;
export type GetTrendingGifsQueryResult = Apollo.QueryResult<GetTrendingGifsQuery, GetTrendingGifsQueryVariables>;
export const SubToAllDocument = gql`
    subscription subToAll {
  esperarNuevosMensajes {
    ...MessagePayload
  }
}
    ${MessagePayloadFragmentDoc}`;
export type SubToAllComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubToAllSubscription, SubToAllSubscriptionVariables>, 'subscription'>;

    export const SubToAllComponent = (props: SubToAllComponentProps) => (
      <ApolloReactComponents.Subscription<SubToAllSubscription, SubToAllSubscriptionVariables> subscription={SubToAllDocument} {...props} />
    );
    

/**
 * __useSubToAllSubscription__
 *
 * To run a query within a React component, call `useSubToAllSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubToAllSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubToAllSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubToAllSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubToAllSubscription, SubToAllSubscriptionVariables>) {
        return Apollo.useSubscription<SubToAllSubscription, SubToAllSubscriptionVariables>(SubToAllDocument, baseOptions);
      }
export type SubToAllSubscriptionHookResult = ReturnType<typeof useSubToAllSubscription>;
export type SubToAllSubscriptionResult = Apollo.SubscriptionResult<SubToAllSubscription>;
export const SendMessageDocument = gql`
    mutation sendMessage($msg: String!, $to: Float!) {
  enviarMensaje(message: $msg, to: $to) {
    ok
    msg
    errors {
      msg
      path
    }
    message {
      ...MessagePayload
    }
  }
}
    ${MessagePayloadFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;
export type SendMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SendMessageMutation, SendMessageMutationVariables>, 'mutation'>;

    export const SendMessageComponent = (props: SendMessageComponentProps) => (
      <ApolloReactComponents.Mutation<SendMessageMutation, SendMessageMutationVariables> mutation={SendMessageDocument} {...props} />
    );
    

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      msg: // value for 'msg'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const GetChatWithDocument = gql`
    query getChatWith($with: Int!) {
  myChat(with: $with) {
    ...MessagePayload
  }
}
    ${MessagePayloadFragmentDoc}`;
export type GetChatWithComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetChatWithQuery, GetChatWithQueryVariables>, 'query'> & ({ variables: GetChatWithQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetChatWithComponent = (props: GetChatWithComponentProps) => (
      <ApolloReactComponents.Query<GetChatWithQuery, GetChatWithQueryVariables> query={GetChatWithDocument} {...props} />
    );
    

/**
 * __useGetChatWithQuery__
 *
 * To run a query within a React component, call `useGetChatWithQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatWithQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatWithQuery({
 *   variables: {
 *      with: // value for 'with'
 *   },
 * });
 */
export function useGetChatWithQuery(baseOptions?: Apollo.QueryHookOptions<GetChatWithQuery, GetChatWithQueryVariables>) {
        return Apollo.useQuery<GetChatWithQuery, GetChatWithQueryVariables>(GetChatWithDocument, baseOptions);
      }
export function useGetChatWithLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatWithQuery, GetChatWithQueryVariables>) {
          return Apollo.useLazyQuery<GetChatWithQuery, GetChatWithQueryVariables>(GetChatWithDocument, baseOptions);
        }
export type GetChatWithQueryHookResult = ReturnType<typeof useGetChatWithQuery>;
export type GetChatWithLazyQueryHookResult = ReturnType<typeof useGetChatWithLazyQuery>;
export type GetChatWithQueryResult = Apollo.QueryResult<GetChatWithQuery, GetChatWithQueryVariables>;