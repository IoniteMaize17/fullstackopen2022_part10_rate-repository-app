import { gql } from '@apollo/client';

export const ACTION_LOGIN = gql`
mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const ACTION_CREATE_REVIEW = gql`
mutation ($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
  createReview(review: {
    repositoryName: $repositoryName,
    ownerName: $ownerName,
    rating: $rating,
    text: $text
  }) {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
    }
  }
}
`;

export const ACTION_DELETE_REVIEW = gql`
mutation ($id: ID!) {
  deleteReview(id: $id)
}
`;

export const ACTION_CREATE_USER = gql`
mutation ($username: String!, $password: String!) {
  createUser(user: { username: $username, password: $password }) {
    id
    username
  }
}
`;