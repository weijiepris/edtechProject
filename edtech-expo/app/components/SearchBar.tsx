import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import InputText from '../components/InputText';

interface ISearchBar {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>('');

  return (
    <InputText
      placeholder="Search"
      showIcon={true}
      value={search}
      onChangeText={setSearch}
      renderIcon={() => (
        <Feather name="search" size={20} color="#000" onPress={() => onSearch(search)} />
      )}
      style={styles.searchInput}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchInput: {
    marginTop: 16,
    width: 250,
    borderRadius: 30,
  },
});
