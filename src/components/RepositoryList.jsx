import { Text } from 'react-native';
import { useState } from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import { useRepositories } from '../hooks/useRepositories'



const RepositoryList = () => {
  const [searchContent, setSearchContent] = useState('');
  const { repositories, error, loading } = useRepositories(searchContent);
  if (error) {
    return (
      <Text>Error ...</Text>
    )
  }
  return (
    <RepositoryListContainer searchContent={searchContent} setSearchContent={setSearchContent} repositories={repositories} />
  );
};

export default RepositoryList;