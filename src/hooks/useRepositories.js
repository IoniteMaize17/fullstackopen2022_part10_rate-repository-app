import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'

export const useRepositories = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network'
    });

    return {
        repositories: data ? data.repositories.edges.map(m => m.node) : [],
        loading,
        error
    };
};