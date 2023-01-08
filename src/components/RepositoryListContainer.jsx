import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import SingleRepository from './SingleRepository';
import THEME_CONFIG from '../theme';
import TextInput from './helpers/TextInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: THEME_CONFIG.colors.whiteLight
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, setSearchContent, searchContent }) => {
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const [selectedSorting, setSelectedSorting] = useState('latest');
  const renderHeader = () => {
    return (
      <View style={{
        margin: THEME_CONFIG.size.padding
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 0.5,
              marginBottom: THEME_CONFIG.size.padding,
              paddingHorizontal: THEME_CONFIG.size.padding,
              paddingVertical: THEME_CONFIG.size.padding / 2,
              borderRadius: 5,
              borderColor: THEME_CONFIG.colors.textSecondary,
              backgroundColor: THEME_CONFIG.colors.white
            }}
            onChangeText={value => setSearchContent(value)}
            value={searchContent}
          />
        </View>
        <Picker
          selectedValue={selectedSorting}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSorting(itemValue)
          }>
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    );
  }
  const sortingAction = (a, b) => {
    switch (selectedSorting) {
      case 'latest':
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      case 'highest':
        return b.ratingAverage - a.ratingAverage;
      case 'lowest':
        return a.ratingAverage - b.ratingAverage;
    }
    return false;
  }
  return (
    <FlatList
      data={repositoryNodes.sort(sortingAction)}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (<SingleRepository repository={item} index={index} separators={separators} />)}
      ListHeaderComponent={renderHeader()}
    />
  );
};

export default RepositoryListContainer