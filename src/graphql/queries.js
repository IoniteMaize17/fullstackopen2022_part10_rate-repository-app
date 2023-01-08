import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query($searchContent: String) {
    repositories(searchKeyword: $searchContent) {
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
                createdAt
            }
        }
    }
}
`;

export const GET_CURRENT_USER = gql`
query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
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
      }
    }
  }
`

export const GET_REPOSITORY = gql`
query ($id: ID!) {
    repository(id: $id) {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        url
        reviews {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
            }
        }
    }
}
`