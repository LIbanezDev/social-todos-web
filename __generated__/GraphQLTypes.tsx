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

export type UserToTeam = {
  __typename?: 'UserToTeam';
  userIsAdmin: Scalars['Boolean'];
  user: User;
  team: Team;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isPublic: Scalars['Boolean'];
  users: Array<UserToTeam>;
  projects: Array<Project>;
};

export type ProjectToKeyWord = {
  __typename?: 'ProjectToKeyWord';
  project: Project;
  keyWord: KeyWord;
};

export type KeyWord = {
  __typename?: 'KeyWord';
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: Array<Project>;
};

/** Entidad que relaciona projectos y usuarios */
export type UserToProject = {
  __typename?: 'UserToProject';
  id: Scalars['ID'];
  role: Scalars['String'];
  user: User;
  project: Project;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  content: Scalars['String'];
  state: Todo_State;
  project: Project;
};

/** El estado de las todos, hay 3 posibles: Aun no empezada - En progreso - Finalizada */
export enum Todo_State {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED'
}

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  team: User;
  image?: Maybe<Scalars['String']>;
  keywords: Array<KeyWord>;
  users: Array<UserToProject>;
  messages: Array<Message>;
  todos: Array<Todo>;
};

/** Mensajes enviados entre los usuarios. */
export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  content: Scalars['String'];
  sender: User;
  project: Project;
  receiver: User;
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
  friends: Array<User>;
  sentMessages: Array<Message>;
  receivedMessages: Array<Message>;
  teams: Array<UserToTeam>;
  projects: Array<UserToProject>;
};

/** Amistad entre usuarios */
export type FriendRequest = {
  __typename?: 'FriendRequest';
  id: Scalars['ID'];
  friendshipState: Scalars['Boolean'];
  sender: User;
  receiver: User;
};

export type MutationError = {
  __typename?: 'MutationError';
  path?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
};

export type MessageResponse = IMutationResponse & {
  __typename?: 'MessageResponse';
  ok: Scalars['Boolean'];
  msg?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<MutationError>>;
  message?: Maybe<Message>;
};

export type TeamResponse = IMutationResponse & {
  __typename?: 'TeamResponse';
  ok: Scalars['Boolean'];
  msg?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<MutationError>>;
  team?: Maybe<Team>;
};

export type TeamPaginatedResponse = {
  __typename?: 'TeamPaginatedResponse';
  items: Array<Team>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
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

export type UserResponse = IMutationResponse & {
  __typename?: 'UserResponse';
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

export type UserPaginatedResponse = {
  __typename?: 'UserPaginatedResponse';
  items: Array<User>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
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
  description?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  bornDate: Scalars['DateTime'];
  image?: Maybe<Scalars['Upload']>;
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

export type PaginateInput = {
  pageSize: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type CreateTeamInput = {
  /** Team Name */
  name: Scalars['String'];
  /** Team optional password */
  password?: Maybe<Scalars['String']>;
  /** Team optional description */
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
};

/** Informacion necesaria para unirse a un equipo. */
export type JoinTeamInput = {
  /** ID del equipo a ingresar. */
  id: Scalars['Float'];
  /** Contraseña del equipo a ingresar, nulo si es publico. */
  password?: Maybe<Scalars['String']>;
};

/** Obtener informacion paginada en base a cursor */
export type TeamPaginatedInput = {
  pageSize: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  onlyPublic?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  myFriends: Array<FriendRequest>;
  myFriendRequests: Array<FriendRequest>;
  myChat: Array<Message>;
  /** Trending giphpys */
  trendingGifs?: Maybe<Array<Giphy>>;
  /** Search gifs */
  searchGifs?: Maybe<Array<Giphy>>;
  /** Get Teams! */
  teams: Array<Team>;
  /** Get paginated teams */
  teamsPaginated: TeamPaginatedResponse;
  /** Get One Team by team id param */
  team?: Maybe<Team>;
  seed: Scalars['Boolean'];
  /** Get user by id. If you want to see your own info set id = -1 */
  user?: Maybe<User>;
  users: UserPaginatedResponse;
};


export type QueryMyFriendRequestsArgs = {
  type: FriendRequestType;
};


export type QueryMyChatArgs = {
  with: Scalars['Int'];
};


export type QueryTrendingGifsArgs = {
  offset?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
};


export type QuerySearchGifsArgs = {
  query: Scalars['String'];
};


export type QueryTeamsArgs = {
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
};


export type QueryTeamsPaginatedArgs = {
  data: TeamPaginatedInput;
};


export type QueryTeamArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUsersArgs = {
  data: PaginateInput;
};

/** Tipo de solicitud para consultar, enviadas o recividas. */
export enum FriendRequestType {
  Received = 'RECEIVED',
  Sent = 'SENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  sendFriendRequest: UserResponse;
  answerFriendRequest: Scalars['Boolean'];
  enviarMensaje: MessageResponse;
  joinTeam: TeamResponse;
  createTeam: TeamResponse;
  register: UserResponse;
  login: LoginResponse;
  loginWithToken: LoginResponse;
};


export type MutationSendFriendRequestArgs = {
  to: Scalars['Float'];
};


export type MutationAnswerFriendRequestArgs = {
  accept: Scalars['Boolean'];
  requestId: Scalars['Float'];
};


export type MutationEnviarMensajeArgs = {
  message: Scalars['String'];
  to: Scalars['Float'];
};


export type MutationJoinTeamArgs = {
  data: JoinTeamInput;
};


export type MutationCreateTeamArgs = {
  data: CreateTeamInput;
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
  waitNotifications: NotificationSubscription;
};

export type NotificationSubscription = Message | FriendRequest;

type MutationResponse_MessageResponse_Fragment = (
  { __typename?: 'MessageResponse' }
  & Pick<MessageResponse, 'ok' | 'msg'>
  & { errors?: Maybe<Array<(
    { __typename?: 'MutationError' }
    & Pick<MutationError, 'msg' | 'path'>
  )>> }
);

type MutationResponse_TeamResponse_Fragment = (
  { __typename?: 'TeamResponse' }
  & Pick<TeamResponse, 'ok' | 'msg'>
  & { errors?: Maybe<Array<(
    { __typename?: 'MutationError' }
    & Pick<MutationError, 'msg' | 'path'>
  )>> }
);

type MutationResponse_UserResponse_Fragment = (
  { __typename?: 'UserResponse' }
  & Pick<UserResponse, 'ok' | 'msg'>
  & { errors?: Maybe<Array<(
    { __typename?: 'MutationError' }
    & Pick<MutationError, 'msg' | 'path'>
  )>> }
);

type MutationResponse_LoginResponse_Fragment = (
  { __typename?: 'LoginResponse' }
  & Pick<LoginResponse, 'ok' | 'msg'>
  & { errors?: Maybe<Array<(
    { __typename?: 'MutationError' }
    & Pick<MutationError, 'msg' | 'path'>
  )>> }
);

export type MutationResponseFragment = MutationResponse_MessageResponse_Fragment | MutationResponse_TeamResponse_Fragment | MutationResponse_UserResponse_Fragment | MutationResponse_LoginResponse_Fragment;

export type RegisterMutationVariables = Exact<{
  data: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'age' | 'email'>
    )> }
    & MutationResponse_UserResponse_Fragment
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
    & Pick<LoginResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
    & MutationResponse_LoginResponse_Fragment
  ) }
);

export type SocialLoginMutationVariables = Exact<{
  token: Scalars['String'];
  type: External_Auth_Apps;
}>;


export type SocialLoginMutation = (
  { __typename?: 'Mutation' }
  & { loginWithToken: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & MutationResponse_LoginResponse_Fragment
  ) }
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
  & { waitNotifications: (
    { __typename?: 'Message' }
    & MessagePayloadFragment
  ) | (
    { __typename?: 'FriendRequest' }
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'image'>
    ) }
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

export type GetTeamsIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsIdsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id'>
  )> }
);

export type GetPaginatedTeamsQueryVariables = Exact<{
  data: TeamPaginatedInput;
}>;


export type GetPaginatedTeamsQuery = (
  { __typename?: 'Query' }
  & { teamsPaginated: (
    { __typename?: 'TeamPaginatedResponse' }
    & Pick<TeamPaginatedResponse, 'cursor' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'isPublic' | 'description' | 'image'>
    )> }
  ) }
);

export type GetTeamByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetTeamByIdQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'description' | 'image' | 'isPublic'>
    & { users: Array<(
      { __typename?: 'UserToTeam' }
      & Pick<UserToTeam, 'userIsAdmin'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'image'>
      ) }
    )> }
  )> }
);

export type GetAllTeamsQueryVariables = Exact<{
  offset: Scalars['Float'];
  limit: Scalars['Float'];
}>;


export type GetAllTeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'isPublic' | 'description' | 'image'>
  )> }
);

export type CreateTeamMutationVariables = Exact<{
  data: CreateTeamInput;
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'TeamResponse' }
    & Pick<TeamResponse, 'ok' | 'msg'>
    & { errors?: Maybe<Array<(
      { __typename?: 'MutationError' }
      & Pick<MutationError, 'msg' | 'path'>
    )>>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'image' | 'description' | 'isPublic'>
    )> }
  ) }
);

export type JoinTeamMutationVariables = Exact<{
  data: JoinTeamInput;
}>;


export type JoinTeamMutation = (
  { __typename?: 'Mutation' }
  & { joinTeam: (
    { __typename?: 'TeamResponse' }
    & Pick<TeamResponse, 'ok' | 'msg'>
    & { errors?: Maybe<Array<(
      { __typename?: 'MutationError' }
      & Pick<MutationError, 'msg' | 'path'>
    )>> }
  ) }
);

export type GetAllUsersQueryVariables = Exact<{
  data: PaginateInput;
}>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserPaginatedResponse' }
    & Pick<UserPaginatedResponse, 'cursor' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'image' | 'description' | 'github' | 'google'>
    )> }
  ) }
);

export type GetMySentFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMySentFriendRequestsQuery = (
  { __typename?: 'Query' }
  & { myFriendRequests: Array<(
    { __typename?: 'FriendRequest' }
    & { receiver: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  )> }
);

export type GetMyReceivedFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyReceivedFriendRequestsQuery = (
  { __typename?: 'Query' }
  & { myFriendRequests: Array<(
    { __typename?: 'FriendRequest' }
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'image'>
    ) }
  )> }
);

export type GetMyFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFriendsQuery = (
  { __typename?: 'Query' }
  & { myFriends: Array<(
    { __typename?: 'FriendRequest' }
    & Pick<FriendRequest, 'id'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'image'>
    ) }
  )> }
);

export type SendFriendRequestMutationVariables = Exact<{
  to: Scalars['Float'];
}>;


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { sendFriendRequest: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'ok' | 'msg'>
    & { errors?: Maybe<Array<(
      { __typename?: 'MutationError' }
      & Pick<MutationError, 'msg' | 'path'>
    )>> }
  ) }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'age' | 'description' | 'github' | 'image' | 'google'>
    & { teams: Array<(
      { __typename?: 'UserToTeam' }
      & Pick<UserToTeam, 'userIsAdmin'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      ) }
    )>, friends: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'image' | 'github' | 'google'>
    )> }
  )> }
);

export const MutationResponseFragmentDoc = gql`
    fragment MutationResponse on IMutationResponse {
  ok
  msg
  errors {
    msg
    path
  }
}
    `;
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
    ...MutationResponse
    user {
      id
      age
      email
    }
  }
}
    ${MutationResponseFragmentDoc}`;
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
    ...MutationResponse
    token
    user {
      id
      name
    }
  }
}
    ${MutationResponseFragmentDoc}`;
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
export const SocialLoginDocument = gql`
    mutation socialLogin($token: String!, $type: EXTERNAL_AUTH_APPS!) {
  loginWithToken(data: {token: $token, type: $type}) {
    ...MutationResponse
    token
  }
}
    ${MutationResponseFragmentDoc}`;
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
  waitNotifications {
    ... on Message {
      ...MessagePayload
    }
    ... on FriendRequest {
      sender {
        name
        image
      }
    }
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
export const GetTeamsIdsDocument = gql`
    query getTeamsIds {
  teams {
    id
  }
}
    `;
export type GetTeamsIdsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetTeamsIdsQuery, GetTeamsIdsQueryVariables>, 'query'>;

    export const GetTeamsIdsComponent = (props: GetTeamsIdsComponentProps) => (
      <ApolloReactComponents.Query<GetTeamsIdsQuery, GetTeamsIdsQueryVariables> query={GetTeamsIdsDocument} {...props} />
    );
    

/**
 * __useGetTeamsIdsQuery__
 *
 * To run a query within a React component, call `useGetTeamsIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsIdsQuery, GetTeamsIdsQueryVariables>) {
        return Apollo.useQuery<GetTeamsIdsQuery, GetTeamsIdsQueryVariables>(GetTeamsIdsDocument, baseOptions);
      }
export function useGetTeamsIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsIdsQuery, GetTeamsIdsQueryVariables>) {
          return Apollo.useLazyQuery<GetTeamsIdsQuery, GetTeamsIdsQueryVariables>(GetTeamsIdsDocument, baseOptions);
        }
export type GetTeamsIdsQueryHookResult = ReturnType<typeof useGetTeamsIdsQuery>;
export type GetTeamsIdsLazyQueryHookResult = ReturnType<typeof useGetTeamsIdsLazyQuery>;
export type GetTeamsIdsQueryResult = Apollo.QueryResult<GetTeamsIdsQuery, GetTeamsIdsQueryVariables>;
export const GetPaginatedTeamsDocument = gql`
    query getPaginatedTeams($data: TeamPaginatedInput!) {
  teamsPaginated(data: $data) {
    cursor
    hasMore
    items {
      id
      name
      isPublic
      description
      image
    }
  }
}
    `;
export type GetPaginatedTeamsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables>, 'query'> & ({ variables: GetPaginatedTeamsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPaginatedTeamsComponent = (props: GetPaginatedTeamsComponentProps) => (
      <ApolloReactComponents.Query<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables> query={GetPaginatedTeamsDocument} {...props} />
    );
    

/**
 * __useGetPaginatedTeamsQuery__
 *
 * To run a query within a React component, call `useGetPaginatedTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedTeamsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPaginatedTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables>) {
        return Apollo.useQuery<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables>(GetPaginatedTeamsDocument, baseOptions);
      }
export function useGetPaginatedTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables>) {
          return Apollo.useLazyQuery<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables>(GetPaginatedTeamsDocument, baseOptions);
        }
export type GetPaginatedTeamsQueryHookResult = ReturnType<typeof useGetPaginatedTeamsQuery>;
export type GetPaginatedTeamsLazyQueryHookResult = ReturnType<typeof useGetPaginatedTeamsLazyQuery>;
export type GetPaginatedTeamsQueryResult = Apollo.QueryResult<GetPaginatedTeamsQuery, GetPaginatedTeamsQueryVariables>;
export const GetTeamByIdDocument = gql`
    query getTeamById($id: Float!) {
  team(id: $id) {
    id
    name
    description
    image
    isPublic
    users {
      userIsAdmin
      user {
        id
        name
        image
      }
    }
  }
}
    `;
export type GetTeamByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetTeamByIdQuery, GetTeamByIdQueryVariables>, 'query'> & ({ variables: GetTeamByIdQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetTeamByIdComponent = (props: GetTeamByIdComponentProps) => (
      <ApolloReactComponents.Query<GetTeamByIdQuery, GetTeamByIdQueryVariables> query={GetTeamByIdDocument} {...props} />
    );
    

/**
 * __useGetTeamByIdQuery__
 *
 * To run a query within a React component, call `useGetTeamByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTeamByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamByIdQuery, GetTeamByIdQueryVariables>) {
        return Apollo.useQuery<GetTeamByIdQuery, GetTeamByIdQueryVariables>(GetTeamByIdDocument, baseOptions);
      }
export function useGetTeamByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamByIdQuery, GetTeamByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetTeamByIdQuery, GetTeamByIdQueryVariables>(GetTeamByIdDocument, baseOptions);
        }
export type GetTeamByIdQueryHookResult = ReturnType<typeof useGetTeamByIdQuery>;
export type GetTeamByIdLazyQueryHookResult = ReturnType<typeof useGetTeamByIdLazyQuery>;
export type GetTeamByIdQueryResult = Apollo.QueryResult<GetTeamByIdQuery, GetTeamByIdQueryVariables>;
export const GetAllTeamsDocument = gql`
    query getAllTeams($offset: Float!, $limit: Float!) {
  teams(offset: $offset, limit: $limit) {
    id
    name
    isPublic
    description
    image
  }
}
    `;
export type GetAllTeamsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>, 'query'> & ({ variables: GetAllTeamsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAllTeamsComponent = (props: GetAllTeamsComponentProps) => (
      <ApolloReactComponents.Query<GetAllTeamsQuery, GetAllTeamsQueryVariables> query={GetAllTeamsDocument} {...props} />
    );
    

/**
 * __useGetAllTeamsQuery__
 *
 * To run a query within a React component, call `useGetAllTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAllTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
        return Apollo.useQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, baseOptions);
      }
export function useGetAllTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, baseOptions);
        }
export type GetAllTeamsQueryHookResult = ReturnType<typeof useGetAllTeamsQuery>;
export type GetAllTeamsLazyQueryHookResult = ReturnType<typeof useGetAllTeamsLazyQuery>;
export type GetAllTeamsQueryResult = Apollo.QueryResult<GetAllTeamsQuery, GetAllTeamsQueryVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($data: CreateTeamInput!) {
  createTeam(data: $data) {
    ok
    msg
    errors {
      msg
      path
    }
    team {
      id
      name
      image
      description
      isPublic
    }
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;
export type CreateTeamComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateTeamMutation, CreateTeamMutationVariables>, 'mutation'>;

    export const CreateTeamComponent = (props: CreateTeamComponentProps) => (
      <ApolloReactComponents.Mutation<CreateTeamMutation, CreateTeamMutationVariables> mutation={CreateTeamDocument} {...props} />
    );
    

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const JoinTeamDocument = gql`
    mutation joinTeam($data: JoinTeamInput!) {
  joinTeam(data: $data) {
    ok
    msg
    errors {
      msg
      path
    }
  }
}
    `;
export type JoinTeamMutationFn = Apollo.MutationFunction<JoinTeamMutation, JoinTeamMutationVariables>;
export type JoinTeamComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<JoinTeamMutation, JoinTeamMutationVariables>, 'mutation'>;

    export const JoinTeamComponent = (props: JoinTeamComponentProps) => (
      <ApolloReactComponents.Mutation<JoinTeamMutation, JoinTeamMutationVariables> mutation={JoinTeamDocument} {...props} />
    );
    

/**
 * __useJoinTeamMutation__
 *
 * To run a mutation, you first call `useJoinTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinTeamMutation, { data, loading, error }] = useJoinTeamMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJoinTeamMutation(baseOptions?: Apollo.MutationHookOptions<JoinTeamMutation, JoinTeamMutationVariables>) {
        return Apollo.useMutation<JoinTeamMutation, JoinTeamMutationVariables>(JoinTeamDocument, baseOptions);
      }
export type JoinTeamMutationHookResult = ReturnType<typeof useJoinTeamMutation>;
export type JoinTeamMutationResult = Apollo.MutationResult<JoinTeamMutation>;
export type JoinTeamMutationOptions = Apollo.BaseMutationOptions<JoinTeamMutation, JoinTeamMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers($data: PaginateInput!) {
  users(data: $data) {
    cursor
    hasMore
    items {
      id
      name
      image
      description
      github
      google
    }
  }
}
    `;
export type GetAllUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllUsersQuery, GetAllUsersQueryVariables>, 'query'> & ({ variables: GetAllUsersQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAllUsersComponent = (props: GetAllUsersComponentProps) => (
      <ApolloReactComponents.Query<GetAllUsersQuery, GetAllUsersQueryVariables> query={GetAllUsersDocument} {...props} />
    );
    

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMySentFriendRequestsDocument = gql`
    query getMySentFriendRequests {
  myFriendRequests(type: SENT) {
    receiver {
      id
    }
  }
}
    `;
export type GetMySentFriendRequestsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables>, 'query'>;

    export const GetMySentFriendRequestsComponent = (props: GetMySentFriendRequestsComponentProps) => (
      <ApolloReactComponents.Query<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables> query={GetMySentFriendRequestsDocument} {...props} />
    );
    

/**
 * __useGetMySentFriendRequestsQuery__
 *
 * To run a query within a React component, call `useGetMySentFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySentFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySentFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySentFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables>) {
        return Apollo.useQuery<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables>(GetMySentFriendRequestsDocument, baseOptions);
      }
export function useGetMySentFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables>) {
          return Apollo.useLazyQuery<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables>(GetMySentFriendRequestsDocument, baseOptions);
        }
export type GetMySentFriendRequestsQueryHookResult = ReturnType<typeof useGetMySentFriendRequestsQuery>;
export type GetMySentFriendRequestsLazyQueryHookResult = ReturnType<typeof useGetMySentFriendRequestsLazyQuery>;
export type GetMySentFriendRequestsQueryResult = Apollo.QueryResult<GetMySentFriendRequestsQuery, GetMySentFriendRequestsQueryVariables>;
export const GetMyReceivedFriendRequestsDocument = gql`
    query getMyReceivedFriendRequests {
  myFriendRequests(type: RECEIVED) {
    sender {
      id
      name
      image
    }
  }
}
    `;
export type GetMyReceivedFriendRequestsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables>, 'query'>;

    export const GetMyReceivedFriendRequestsComponent = (props: GetMyReceivedFriendRequestsComponentProps) => (
      <ApolloReactComponents.Query<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables> query={GetMyReceivedFriendRequestsDocument} {...props} />
    );
    

/**
 * __useGetMyReceivedFriendRequestsQuery__
 *
 * To run a query within a React component, call `useGetMyReceivedFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyReceivedFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyReceivedFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyReceivedFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables>) {
        return Apollo.useQuery<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables>(GetMyReceivedFriendRequestsDocument, baseOptions);
      }
export function useGetMyReceivedFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables>) {
          return Apollo.useLazyQuery<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables>(GetMyReceivedFriendRequestsDocument, baseOptions);
        }
export type GetMyReceivedFriendRequestsQueryHookResult = ReturnType<typeof useGetMyReceivedFriendRequestsQuery>;
export type GetMyReceivedFriendRequestsLazyQueryHookResult = ReturnType<typeof useGetMyReceivedFriendRequestsLazyQuery>;
export type GetMyReceivedFriendRequestsQueryResult = Apollo.QueryResult<GetMyReceivedFriendRequestsQuery, GetMyReceivedFriendRequestsQueryVariables>;
export const GetMyFriendsDocument = gql`
    query getMyFriends {
  myFriends {
    id
    sender {
      id
      name
      image
    }
  }
}
    `;
export type GetMyFriendsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMyFriendsQuery, GetMyFriendsQueryVariables>, 'query'>;

    export const GetMyFriendsComponent = (props: GetMyFriendsComponentProps) => (
      <ApolloReactComponents.Query<GetMyFriendsQuery, GetMyFriendsQueryVariables> query={GetMyFriendsDocument} {...props} />
    );
    

/**
 * __useGetMyFriendsQuery__
 *
 * To run a query within a React component, call `useGetMyFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFriendsQuery, GetMyFriendsQueryVariables>) {
        return Apollo.useQuery<GetMyFriendsQuery, GetMyFriendsQueryVariables>(GetMyFriendsDocument, baseOptions);
      }
export function useGetMyFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFriendsQuery, GetMyFriendsQueryVariables>) {
          return Apollo.useLazyQuery<GetMyFriendsQuery, GetMyFriendsQueryVariables>(GetMyFriendsDocument, baseOptions);
        }
export type GetMyFriendsQueryHookResult = ReturnType<typeof useGetMyFriendsQuery>;
export type GetMyFriendsLazyQueryHookResult = ReturnType<typeof useGetMyFriendsLazyQuery>;
export type GetMyFriendsQueryResult = Apollo.QueryResult<GetMyFriendsQuery, GetMyFriendsQueryVariables>;
export const SendFriendRequestDocument = gql`
    mutation sendFriendRequest($to: Float!) {
  sendFriendRequest(to: $to) {
    ok
    msg
    errors {
      msg
      path
    }
  }
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export type SendFriendRequestComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>, 'mutation'>;

    export const SendFriendRequestComponent = (props: SendFriendRequestComponentProps) => (
      <ApolloReactComponents.Mutation<SendFriendRequestMutation, SendFriendRequestMutationVariables> mutation={SendFriendRequestDocument} {...props} />
    );
    

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      to: // value for 'to'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, baseOptions);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const GetUserByIdDocument = gql`
    query getUserById($id: Float!) {
  user(id: $id) {
    id
    name
    email
    age
    description
    github
    image
    google
    teams {
      userIsAdmin
      team {
        id
        name
      }
    }
    friends {
      id
      name
      email
      image
      github
      google
    }
  }
}
    `;
export type GetUserByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserByIdQuery, GetUserByIdQueryVariables>, 'query'> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserByIdComponent = (props: GetUserByIdComponentProps) => (
      <ApolloReactComponents.Query<GetUserByIdQuery, GetUserByIdQueryVariables> query={GetUserByIdDocument} {...props} />
    );
    

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;