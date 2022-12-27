import { Text, View, StyleSheet, Image } from 'react-native';
import THEME_CONFIG from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME_CONFIG.colors.white,
        padding: THEME_CONFIG.size.padding
    }
})

const RepositoryItem = ({repository}) => {
    const caculatorCount = (count) => {
        if (count < 1000) return count;
        return  (count/1000) == Math.round((count/1000)) ? Math.round((count/1000)) + 'K' : (count/1000).toFixed(1) + 'K';
    }
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Image style={{width: 50, height: 50, borderRadius: 5}} source={{uri: repository.ownerAvatarUrl}}></Image>
                <View style={{paddingLeft: THEME_CONFIG.size.padding, alignItems: 'baseline'}}>
                    <Text style={{fontWeight: THEME_CONFIG.fontWeights.bold}}>{repository.fullName}</Text>
                    <Text style={{color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2}}>Description: {repository.description}</Text>
                    <Text style={{backgroundColor: THEME_CONFIG.colors.primary, padding: THEME_CONFIG.size.padding / 2, color: THEME_CONFIG.colors.white, borderRadius: 5, marginTop: THEME_CONFIG.size.padding / 2}}>{repository.language}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: THEME_CONFIG.size.padding, marginTop: THEME_CONFIG.size.padding}}>
                <View>
                    <View><Text style={{fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center'}}>{caculatorCount(repository.stargazersCount)}</Text></View>
                    <View><Text style={{color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2}}>Starts</Text></View>
                </View>
                <View>
                    <View><Text style={{fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center'}}>{caculatorCount(repository.forksCount)}</Text></View>
                    <View><Text style={{color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2}}>Forks</Text></View>
                </View>
                <View>
                    <View><Text style={{fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center'}}>{repository.reviewCount}</Text></View>
                    <View><Text style={{color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2}}>Reviews</Text></View>
                </View>
                <View>
                    <View><Text style={{fontWeight: THEME_CONFIG.fontWeights.bold, textAlign: 'center'}}>{repository.ratingAverage}</Text></View>
                    <View><Text style={{color: THEME_CONFIG.colors.textSecondary, marginTop: THEME_CONFIG.size.padding / 2}}>Rating</Text></View>
                </View>
            </View>
            {/* <Text>Fullname: {repository.fullName}</Text>
            <Text>Description: {repository.description}</Text>
            <Text>Language: {repository.language}</Text>
            <Text>Stars: {repository.stargazersCount}</Text>
            <Text>Forks: {repository.forksCount}</Text>
            <Text>Reviews: {repository.reviewCount}</Text>
            <Text>Rating: {repository.ratingAverage}</Text>
            <Text>Fullname: {repository.fullName}</Text> */}
        </View>
    );
  };
  
  export default RepositoryItem;