import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'

export const useRepositories = (searchContent) => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { searchContent }
    });
    
    return {
        repositories: data ? data.repositories : {},
        loading,
        error
    };
};