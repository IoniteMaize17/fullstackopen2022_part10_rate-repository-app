import { useMutation, useApolloClient } from '@apollo/client';
import { ACTION_DELETE_REVIEW, GET_CURRENT_USER } from '../graphql/mutations';

export const useRemoveReview = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(ACTION_DELETE_REVIEW, {
        refetchQueries: [  {query: GET_CURRENT_USER, variables: {
            includeReviews: true
        }} ],
    });

    const deleteReview = async ({ id }) => {
        const { data } = await mutate({ variables: { id } });
        apolloClient.resetStore();
        return data;
    };

    return [deleteReview, result];
};