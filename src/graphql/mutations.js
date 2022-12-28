import { gql } from '@apollo/client';

export const ACTION_LOGIN = gql`
mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;