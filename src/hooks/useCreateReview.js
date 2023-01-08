import { useMutation, useApolloClient } from '@apollo/client';
import { ACTION_CREATE_REVIEW } from '../graphql/mutations';
import { GET_CURRENT_USER } from '../graphql/queries'

export const useCreateReview = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(ACTION_CREATE_REVIEW, {
        refetchQueries: [  {query: GET_CURRENT_USER, variables: {
            includeReviews: true
        }} ],
    });

    const createReview = async ({ repositoryName, ownerName, rating, text }) => {
        const ratingNumber = Number(rating);
        const { data } = await mutate({ variables: { repositoryName, ownerName, rating: ratingNumber, text } });
        apolloClient.resetStore();
        return data;
    };

    return [createReview, result];
};