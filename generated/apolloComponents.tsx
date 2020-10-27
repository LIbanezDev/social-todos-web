import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';
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

export type MutationError = {
    __typename?: 'MutationError';
    path?: Maybe<Scalars['String']>;
    msg?: Maybe<Scalars['String']>;
};

export type Photo = {
    __typename?: 'Photo';
    id: Scalars['ID'];
    name: Scalars['String'];
    description: Scalars['String'];
    filename: Scalars['String'];
    views?: Maybe<Scalars['Float']>;
    isPublished: Scalars['Boolean'];
    user?: Maybe<User>;
};

/** Registered users */
export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    name: Scalars['String'];
    age: Scalars['Float'];
    email: Scalars['String'];
    photos: Array<Photo>;
    sentMessages: Array<Message>;
    receivedMessages: Array<Message>;
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


export type MessagePayload = {
    __typename?: 'MessagePayload';
    content: Scalars['String'];
    receiverId: Scalars['Float'];
    senderId: Scalars['Float'];
};

export type MessageResponse = IMutationResponse & {
    __typename?: 'MessageResponse';
    ok: Scalars['Boolean'];
    msg?: Maybe<Scalars['String']>;
    errors?: Maybe<Array<MutationError>>;
    message?: Maybe<Message>;
};

export type PhotoResponse = IMutationResponse & {
    __typename?: 'PhotoResponse';
    ok: Scalars['Boolean'];
    msg?: Maybe<Scalars['String']>;
    errors?: Maybe<Array<MutationError>>;
    photo?: Maybe<Photo>;
};

export type PhotosResponse = IMutationResponse & {
    __typename?: 'PhotosResponse';
    ok: Scalars['Boolean'];
    msg?: Maybe<Scalars['String']>;
    errors?: Maybe<Array<MutationError>>;
    photos: Array<Photo>;
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

/** Informacion necesaria para agregar fotos! */
export type PhotoData = {
    name: Scalars['String'];
    description: Scalars['String'];
    filename: Scalars['String'];
    isPublished: Scalars['Boolean'];
    actorID: Scalars['Float'];
    views: Scalars['Float'];
};

/** Informacion opcional para editar fotos! */
export type PhotoEditData = {
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    filename?: Maybe<Scalars['String']>;
    isPublished?: Maybe<Scalars['Boolean']>;
    actorID?: Maybe<Scalars['Float']>;
};

/** Informacion necesaria para crear nuevos usuarios */
export type UserRegisterInput = {
    name: Scalars['String'];
    age: Scalars['Float'];
    email: Scalars['String'];
    password: Scalars['String'];
    image?: Maybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    myChat: Array<Message>;
    photos: Array<Photo>;
    photo?: Maybe<Photo>;
    me?: Maybe<User>;
    users: Array<User>;
};


export type QueryMyChatArgs = {
    with: Scalars['Int'];
};


export type QueryPhotoArgs = {
    ID: Scalars['Float'];
};

export type Mutation = {
    __typename?: 'Mutation';
    enviarMensaje: MessageResponse;
    createPhoto: PhotoResponse;
    deletePhoto: PhotoResponse;
    editPhoto: PhotoResponse;
    register: RegisterResponse;
    login: LoginResponse;
    uploadFile: Scalars['Boolean'];
};


export type MutationEnviarMensajeArgs = {
    message: Scalars['String'];
    to: Scalars['Float'];
};


export type MutationCreatePhotoArgs = {
    data: PhotoData;
};


export type MutationDeletePhotoArgs = {
    ID: Scalars['Float'];
};


export type MutationEditPhotoArgs = {
    data: PhotoEditData;
    ID: Scalars['Float'];
};


export type MutationRegisterArgs = {
    data: UserRegisterInput;
};


export type MutationLoginArgs = {
    password: Scalars['String'];
    email: Scalars['String'];
};


export type MutationUploadFileArgs = {
    file: Scalars['Upload'];
};


export type Subscription = {
    __typename?: 'Subscription';
    esperarNuevosMensajes: MessagePayload;
};

export type RegisterMutationVariables = Exact<{
    data: UserRegisterInput;
}>;


export type RegisterMutation = (
    { __typename?: 'Mutation' }
    & {
    register: (
        { __typename?: 'RegisterResponse' }
        & Pick<RegisterResponse, 'ok' | 'msg'>
        & {
        errors?: Maybe<Array<(
            { __typename?: 'MutationError' }
            & Pick<MutationError, 'msg' | 'path'>
            )>>, user?: Maybe<(
            { __typename?: 'User' }
            & Pick<User, 'id' | 'age' | 'email'>
            )>
    }
        )
}
    );

export type LoginMutationVariables = Exact<{
    email: Scalars['String'];
    pass: Scalars['String'];
}>;


export type LoginMutation = (
    { __typename?: 'Mutation' }
    & {
    login: (
        { __typename?: 'LoginResponse' }
        & Pick<LoginResponse, 'ok' | 'msg' | 'token'>
        & {
        errors?: Maybe<Array<(
            { __typename?: 'MutationError' }
            & Pick<MutationError, 'msg' | 'path'>
            )>>, user?: Maybe<(
            { __typename?: 'User' }
            & Pick<User, 'id' | 'name'>
            )>
    }
        )
}
    );

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
    { __typename?: 'Query' }
    & {
    me?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'age' | 'email'>
        & {
        photos: Array<(
            { __typename?: 'Photo' }
            & Pick<Photo, 'id' | 'filename' | 'description' | 'isPublished' | 'name'>
            )>
    }
        )>
}
    );

export type SubToAllSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubToAllSubscription = (
    { __typename?: 'Subscription' }
    & {
    esperarNuevosMensajes: (
        { __typename?: 'MessagePayload' }
        & Pick<MessagePayload, 'content' | 'receiverId' | 'senderId'>
        )
}
    );

export type SendMessageMutationVariables = Exact<{
    msg: Scalars['String'];
    to: Scalars['Float'];
}>;


export type SendMessageMutation = (
    { __typename?: 'Mutation' }
    & {
    enviarMensaje: (
        { __typename?: 'MessageResponse' }
        & Pick<MessageResponse, 'ok' | 'msg'>
        & {
        errors?: Maybe<Array<(
            { __typename?: 'MutationError' }
            & Pick<MutationError, 'msg' | 'path'>
            )>>, message?: Maybe<(
            { __typename?: 'Message' }
            & Pick<Message, 'id'>
            )>
    }
        )
}
    );

export type GetChatWithQueryVariables = Exact<{
    with: Scalars['Int'];
}>;


export type GetChatWithQuery = (
    { __typename?: 'Query' }
    & {
    myChat: Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'id' | 'content' | 'date'>
        & {
        receiver: (
            { __typename?: 'User' }
            & Pick<User, 'id'>
            ), sender: (
            { __typename?: 'User' }
            & Pick<User, 'id'>
            )
    }
        )>
}
    );

export type DeletePhotoMutationVariables = Exact<{
    id: Scalars['Float'];
}>;


export type DeletePhotoMutation = (
    { __typename?: 'Mutation' }
    & {
    deletePhoto: (
        { __typename?: 'PhotoResponse' }
        & Pick<PhotoResponse, 'ok' | 'msg'>
        & {
        errors?: Maybe<Array<(
            { __typename?: 'MutationError' }
            & Pick<MutationError, 'msg' | 'path'>
            )>>, photo?: Maybe<(
            { __typename?: 'Photo' }
            & Pick<Photo, 'id' | 'name'>
            & {
            user?: Maybe<(
                { __typename?: 'User' }
                & Pick<User, 'id' | 'name'>
                )>
        }
            )>
    }
        )
}
    );

export type EditPhotoMutationVariables = Exact<{
    id: Scalars['Float'];
    data: PhotoEditData;
}>;


export type EditPhotoMutation = (
    { __typename?: 'Mutation' }
    & {
    editPhoto: (
        { __typename?: 'PhotoResponse' }
        & Pick<PhotoResponse, 'ok' | 'msg'>
        & {
        errors?: Maybe<Array<(
            { __typename?: 'MutationError' }
            & Pick<MutationError, 'msg' | 'path'>
            )>>, photo?: Maybe<(
            { __typename?: 'Photo' }
            & Pick<Photo, 'id' | 'name'>
            & {
            user?: Maybe<(
                { __typename?: 'User' }
                & Pick<User, 'id' | 'name'>
                )>
        }
            )>
    }
        )
}
    );

export type AddPhotoMutationVariables = Exact<{
    data: PhotoData;
}>;


export type AddPhotoMutation = (
    { __typename?: 'Mutation' }
    & {
    createPhoto: (
        { __typename?: 'PhotoResponse' }
        & Pick<PhotoResponse, 'ok' | 'msg'>
        & {
        errors?: Maybe<Array<(
            { __typename?: 'MutationError' }
            & Pick<MutationError, 'msg' | 'path'>
            )>>, photo?: Maybe<(
            { __typename?: 'Photo' }
            & Pick<Photo, 'id' | 'filename'>
            )>
    }
        )
}
    );

export type GetPhotoQueryVariables = Exact<{
    id: Scalars['Float'];
}>;


export type GetPhotoQuery = (
    { __typename?: 'Query' }
    & {
    photo?: Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'filename'>
        & {
        user?: Maybe<(
            { __typename?: 'User' }
            & Pick<User, 'id' | 'name' | 'age'>
            )>
    }
        )>
}
    );

export type GetPhotosAndPhotoQueryVariables = Exact<{
    id: Scalars['Float'];
}>;


export type GetPhotosAndPhotoQuery = (
    { __typename?: 'Query' }
    & {
    photos: Array<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'id' | 'filename' | 'description'>
        & {
        user?: Maybe<(
            { __typename?: 'User' }
            & Pick<User, 'id'>
            )>
    }
        )>, photo?: Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'filename' | 'description'>
        & {
        user?: Maybe<(
            { __typename?: 'User' }
            & Pick<User, 'id'>
            )>
    }
        )>
}
    );

export type UploadFileMutationVariables = Exact<{
    file: Scalars['Upload'];
}>;


export type UploadFileMutation = (
    { __typename?: 'Mutation' }
    & Pick<Mutation, 'uploadFile'>
    );


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
            age
            email
            photos {
                id
                filename
                description
                isPublished
                name
            }
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
export const SubToAllDocument = gql`
    subscription subToAll {
        esperarNuevosMensajes {
            content
            receiverId
            senderId
        }
    }
`;
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
                id
            }
        }
    }
`;
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
            id
            content
            date
            receiver {
                id
            }
            sender {
                id
            }
        }
    }
`;
export type GetChatWithComponentProps =
    Omit<ApolloReactComponents.QueryComponentOptions<GetChatWithQuery, GetChatWithQueryVariables>, 'query'>
    & ({ variables: GetChatWithQueryVariables; skip?: boolean; } | { skip: boolean; });

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
export const DeletePhotoDocument = gql`
    mutation deletePhoto($id: Float!) {
        deletePhoto(ID: $id) {
            ok
            msg
            errors {
                msg
                path
            }
            photo {
                id
                name
                user {
                    id
                    name
                }
            }
        }
    }
`;
export type DeletePhotoMutationFn = Apollo.MutationFunction<DeletePhotoMutation, DeletePhotoMutationVariables>;
export type DeletePhotoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeletePhotoMutation, DeletePhotoMutationVariables>, 'mutation'>;

export const DeletePhotoComponent = (props: DeletePhotoComponentProps) => (
    <ApolloReactComponents.Mutation<DeletePhotoMutation, DeletePhotoMutationVariables> mutation={DeletePhotoDocument} {...props} />
);


/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhotoMutation, DeletePhotoMutationVariables>) {
    return Apollo.useMutation<DeletePhotoMutation, DeletePhotoMutationVariables>(DeletePhotoDocument, baseOptions);
}

export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<DeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const EditPhotoDocument = gql`
    mutation editPhoto($id: Float!, $data: PhotoEditData!) {
        editPhoto(ID: $id, data: $data) {
            ok
            msg
            errors {
                msg
                path
            }
            photo {
                id
                name
                user {
                    id
                    name
                }
            }
        }
    }
`;
export type EditPhotoMutationFn = Apollo.MutationFunction<EditPhotoMutation, EditPhotoMutationVariables>;
export type EditPhotoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditPhotoMutation, EditPhotoMutationVariables>, 'mutation'>;

export const EditPhotoComponent = (props: EditPhotoComponentProps) => (
    <ApolloReactComponents.Mutation<EditPhotoMutation, EditPhotoMutationVariables> mutation={EditPhotoDocument} {...props} />
);


/**
 * __useEditPhotoMutation__
 *
 * To run a mutation, you first call `useEditPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPhotoMutation, { data, loading, error }] = useEditPhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditPhotoMutation(baseOptions?: Apollo.MutationHookOptions<EditPhotoMutation, EditPhotoMutationVariables>) {
    return Apollo.useMutation<EditPhotoMutation, EditPhotoMutationVariables>(EditPhotoDocument, baseOptions);
}

export type EditPhotoMutationHookResult = ReturnType<typeof useEditPhotoMutation>;
export type EditPhotoMutationResult = Apollo.MutationResult<EditPhotoMutation>;
export type EditPhotoMutationOptions = Apollo.BaseMutationOptions<EditPhotoMutation, EditPhotoMutationVariables>;
export const AddPhotoDocument = gql`
    mutation addPhoto($data: PhotoData!) {
        createPhoto(data: $data) {
            ok
            msg
            errors {
                msg
                path
            }
            photo {
                id
                filename
            }
        }
    }
`;
export type AddPhotoMutationFn = Apollo.MutationFunction<AddPhotoMutation, AddPhotoMutationVariables>;
export type AddPhotoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddPhotoMutation, AddPhotoMutationVariables>, 'mutation'>;

export const AddPhotoComponent = (props: AddPhotoComponentProps) => (
    <ApolloReactComponents.Mutation<AddPhotoMutation, AddPhotoMutationVariables> mutation={AddPhotoDocument} {...props} />
);


/**
 * __useAddPhotoMutation__
 *
 * To run a mutation, you first call `useAddPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPhotoMutation, { data, loading, error }] = useAddPhotoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddPhotoMutation(baseOptions?: Apollo.MutationHookOptions<AddPhotoMutation, AddPhotoMutationVariables>) {
    return Apollo.useMutation<AddPhotoMutation, AddPhotoMutationVariables>(AddPhotoDocument, baseOptions);
}

export type AddPhotoMutationHookResult = ReturnType<typeof useAddPhotoMutation>;
export type AddPhotoMutationResult = Apollo.MutationResult<AddPhotoMutation>;
export type AddPhotoMutationOptions = Apollo.BaseMutationOptions<AddPhotoMutation, AddPhotoMutationVariables>;
export const GetPhotoDocument = gql`
    query getPhoto($id: Float!) {
        photo(ID: $id) {
            filename
            user {
                id
                name
                age
            }
        }
    }
`;
export type GetPhotoComponentProps =
    Omit<ApolloReactComponents.QueryComponentOptions<GetPhotoQuery, GetPhotoQueryVariables>, 'query'>
    & ({ variables: GetPhotoQueryVariables; skip?: boolean; } | { skip: boolean; });

export const GetPhotoComponent = (props: GetPhotoComponentProps) => (
    <ApolloReactComponents.Query<GetPhotoQuery, GetPhotoQueryVariables> query={GetPhotoDocument} {...props} />
);


/**
 * __useGetPhotoQuery__
 *
 * To run a query within a React component, call `useGetPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPhotoQuery(baseOptions?: Apollo.QueryHookOptions<GetPhotoQuery, GetPhotoQueryVariables>) {
    return Apollo.useQuery<GetPhotoQuery, GetPhotoQueryVariables>(GetPhotoDocument, baseOptions);
}

export function useGetPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPhotoQuery, GetPhotoQueryVariables>) {
    return Apollo.useLazyQuery<GetPhotoQuery, GetPhotoQueryVariables>(GetPhotoDocument, baseOptions);
}

export type GetPhotoQueryHookResult = ReturnType<typeof useGetPhotoQuery>;
export type GetPhotoLazyQueryHookResult = ReturnType<typeof useGetPhotoLazyQuery>;
export type GetPhotoQueryResult = Apollo.QueryResult<GetPhotoQuery, GetPhotoQueryVariables>;
export const GetPhotosAndPhotoDocument = gql`
    query getPhotosAndPhoto($id: Float!) {
        photos {
            id
            filename
            description
            user {
                id
            }
        }
        photo(ID: $id) {
            filename
            description
            user {
                id
            }
        }
    }
`;
export type GetPhotosAndPhotoComponentProps =
    Omit<ApolloReactComponents.QueryComponentOptions<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables>, 'query'>
    & ({ variables: GetPhotosAndPhotoQueryVariables; skip?: boolean; } | { skip: boolean; });

export const GetPhotosAndPhotoComponent = (props: GetPhotosAndPhotoComponentProps) => (
    <ApolloReactComponents.Query<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables> query={GetPhotosAndPhotoDocument} {...props} />
);


/**
 * __useGetPhotosAndPhotoQuery__
 *
 * To run a query within a React component, call `useGetPhotosAndPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotosAndPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotosAndPhotoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPhotosAndPhotoQuery(baseOptions?: Apollo.QueryHookOptions<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables>) {
    return Apollo.useQuery<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables>(GetPhotosAndPhotoDocument, baseOptions);
}

export function useGetPhotosAndPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables>) {
    return Apollo.useLazyQuery<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables>(GetPhotosAndPhotoDocument, baseOptions);
}

export type GetPhotosAndPhotoQueryHookResult = ReturnType<typeof useGetPhotosAndPhotoQuery>;
export type GetPhotosAndPhotoLazyQueryHookResult = ReturnType<typeof useGetPhotosAndPhotoLazyQuery>;
export type GetPhotosAndPhotoQueryResult = Apollo.QueryResult<GetPhotosAndPhotoQuery, GetPhotosAndPhotoQueryVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;
export type UploadFileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UploadFileMutation, UploadFileMutationVariables>, 'mutation'>;

export const UploadFileComponent = (props: UploadFileComponentProps) => (
    <ApolloReactComponents.Mutation<UploadFileMutation, UploadFileMutationVariables> mutation={UploadFileDocument} {...props} />
);


/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
    return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, baseOptions);
}

export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
