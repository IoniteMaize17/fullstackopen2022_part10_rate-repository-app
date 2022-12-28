import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
        edges {
            cursor,
            node {
                id
                fullName
                description
                language
                forksCount
                stargazersCount
                ratingAverage
                reviewCount
                ownerAvatarUrl
            }
        }
    }
}
`;

export const GET_ME = gql`
query {
    me {
      id
      username
    }
  }
`