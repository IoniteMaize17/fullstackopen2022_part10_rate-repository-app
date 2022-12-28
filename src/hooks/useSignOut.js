import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

export const useSignOut = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();

    const signOut = async () => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
        return true;
    };

    return [signOut];
};