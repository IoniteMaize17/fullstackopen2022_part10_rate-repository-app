import { format } from 'date-fns'
import { Text, View, StyleSheet, Image, Pressable, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import THEME_CONFIG from '../theme';
import { useNavigate, useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useRemoveReview } from '../hooks/useRemoveReview';

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME_CONFIG.colors.white,
        padding: THEME_CONFIG.size.padding,
        marginBottom: 10
    }
})

const RepositoryInfo = ({ repository, is_detail }) => {
    const calculatorCount = (count) => {
        if (count < 1000) return count;
        return (count / 1000) == Math.round((count / 1000)) ? Math.round((count / 1000)) + 'K' : (count / 1000).toFixed(1) + 'K';
    }
    const handleShowDetail = () => {
        if (!is_detail) navigate(`/repository/${repository.id}`)
    }
    const handlePressOpenLink = () => {
        Linking.openURL(repository.url);
    }

    return (
        <Pressable onPress={handleShowDetail} style={styles.container} testID="repositoryItem">
            <View style={{
                flexDirection: 'row'
            }}>
                <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: repository.ownerAvatarUrl }}></Image>
                <View style={{ paddingLeft: THEME_CONFIG.size.padding, alignItems: 'baseline', flex: 1 }}>
                    <Text style={{ fontWeight: THEME_CONFIG.fontWeights.bold }}>{repository.fullName} {repository.createdAt}</Text>
                    <Text style={{ color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2 }}>Description: {repository.description}</Text>
                    <Text style={{ backgroundColor: THEME_CONFIG.colors.primary, padding: THEME_CONFIG.size.padding / 2, color: THEME_CONFIG.colors.white, borderRadius: 5, marginTop: THEME_CONFIG.size.padding / 2 }}>{repository.language}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: THEME_CONFIG.size.padding, marginTop: THEME_CONFIG.size.padding }}>
                <View>
                    <View><Text style={{ fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center' }}>{calculatorCount(repository.stargazersCount)}</Text></View>
                    <View><Text style={{ color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2 }}>Starts</Text></View>
                </View>
                <View>
                    <View><Text style={{ fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center' }}>{calculatorCount(repository.forksCount)}</Text></View>
                    <View><Text style={{ color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2 }}>Forks</Text></View>
                </View>
                <View>
                    <View><Text style={{ fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center' }}>{repository.reviewCount}</Text></View>
                    <View><Text style={{ color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2 }}>Reviews</Text></View>
                </View>
                <View>
                    <View><Text style={{ fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center' }}>{repository.ratingAverage}</Text></View>
                    <View><Text style={{ color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2 }}>Rating</Text></View>
                </View>
            </View>
            {is_detail ? (
                <Pressable onPress={handlePressOpenLink} style={{
                    marginTop: THEME_CONFIG.size.padding,
                    backgroundColor: THEME_CONFIG.colors.primary,
                    borderRadius: 5
                }}>
                    <Text style={{
                        color: THEME_CONFIG.colors.white,
                        padding: THEME_CONFIG.size.padding,
                        textAlign: 'center',
                        fontWeight: THEME_CONFIG.fontWeights.bold
                    }}>Open in Github</Text>
                </Pressable>
            ) : null}
        </Pressable>
    );
};


export const ItemSeparator = () => <View style={{
    height: 10,
    backgroundColor: THEME_CONFIG.colors.whiteLight
}} />;

export const ReviewItem = ({ review, isAction }) => {
    const [deleteReview] = useRemoveReview();
    const navigate = useNavigate();
    return (
        <View>
            <View style={{
                backgroundColor: THEME_CONFIG.colors.white,
                flexDirection: 'row',
                flex: 1
            }}>
                <View style={{
                    margin: THEME_CONFIG.size.padding,
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: THEME_CONFIG.colors.primary,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: THEME_CONFIG.colors.primary,
                        fontWeight: THEME_CONFIG.fontWeights.bold,
                        fontSize: 23
                    }}>{review.rating}</Text>
                </View>
                <View style={{
                    flex: 1,
                    paddingVertical: THEME_CONFIG.size.padding
                }}>
                    <Text style={{
                        fontWeight: THEME_CONFIG.fontWeights.bold
                    }}>{review.user.username}</Text>
                    <Text style={{
                        color: THEME_CONFIG.colors.textSecondary,
                        marginBottom: THEME_CONFIG.size.padding / 2
                    }}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            {isAction ? (
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: THEME_CONFIG.colors.white
                }}>
                    <TouchableOpacity onPress={() => {
                        navigate(`/repository/${review.repository.id}`)
                    }} style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: THEME_CONFIG.size.padding,
                        margin: THEME_CONFIG.size.padding,
                        backgroundColor: THEME_CONFIG.colors.primary,
                        borderRadius: 5
                    }}><Text style={{color: THEME_CONFIG.colors.white}}>View repository</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Delete review",
                            "Are you sure you want to delete this review?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "Delete", onPress: () => {
                                deleteReview({id: review.id});
                              }}
                            ]
                          );
                    }} style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: THEME_CONFIG.size.padding,
                        margin: THEME_CONFIG.size.padding,
                        backgroundColor: THEME_CONFIG.colors.error,
                        borderRadius: 5
                    }}><Text style={{color: THEME_CONFIG.colors.white}}>Delete review</Text></TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const SingleRepository = ({ repository, is_detail }) => {
    const { id } = useParams();
    if (id && is_detail) {
        const { data, loading, error } = useQuery(GET_REPOSITORY, {
            fetchPolicy: 'cache-and-network',
            variables: { id }
        });
        if (loading) {
            return (<Text>Loading</Text>)
        }
        if (error) {
            console.log(error.message);
            return (<Text>Errors</Text>)
        }
        repository = data.repository;
    }

    return (
        <FlatList
            data={repository.reviews ? repository.reviews.edges.map((m => m.node)) : []}
            renderItem={({ item }) => <ReviewItem review={item} isAction={false} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} is_detail={is_detail} />}
        />
    );
};

export default SingleRepository;