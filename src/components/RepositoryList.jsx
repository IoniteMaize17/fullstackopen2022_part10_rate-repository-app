import { Text, FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useRepositories } from '../hooks/useRepositories'
import THEME_CONFIG from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: THEME_CONFIG.colors.whiteLight
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories()
  if (loading) {
    return (
      <Text>Loading</Text>
    )
  }
  if (error) {
    return (
      <Text>Error ...</Text>
    )
  }
  return (
    <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item, index, separators}) => ( <RepositoryItem repository={item} index={index} separators={separators} />)}
    />
  );
};

export default RepositoryList;