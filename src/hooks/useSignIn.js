import { useMutation, useApolloClient } from '@apollo/client';
import { ACTION_LOGIN } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage';

export const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(ACTION_LOGIN);

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return true;
    };

    return [signIn, result];
};