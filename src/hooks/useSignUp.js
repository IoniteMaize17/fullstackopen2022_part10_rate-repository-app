import { useMutation, useApolloClient } from '@apollo/client';
import { ACTION_CREATE_USER } from '../graphql/mutations'

export const useSignUp = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(ACTION_CREATE_USER);

    const signUp = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        apolloClient.resetStore();
        return data;
    };

    return [signUp, result];
};