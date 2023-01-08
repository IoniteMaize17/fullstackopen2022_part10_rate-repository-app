import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries'
import { ReviewItem, ItemSeparator } from './SingleRepository';
import { FlatList } from 'react-native';
import { useNavigate } from 'react-router-native';

const MyReviews = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_CURRENT_USER, {
        variables: {
            includeReviews: true
        }
    });
    if (loading) {
        return null;
    }
    if (error) {
        return (
            <Text>Errors ...</Text>
        )
    }
    return (
        <FlatList
            data={data.me.reviews.edges ? data.me.reviews.edges.map((m => m.node)) : []}
            renderItem={({ item }) => <ReviewItem review={item} isAction={true} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;