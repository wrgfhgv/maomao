import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  onSearch?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  onClear?: () => void;
  containerStyle?: object;
  inputStyle?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索...',
  value,
  onChangeText,
  onSearch,
  onCancel,
  showCancelButton = false,
  onClear,
  containerStyle,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
    if (onClear) onClear();
  };

  const handleSubmit = () => {
    if (onSearch && value?.trim()) {
      onSearch();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.searchInputContainer, isFocused && styles.searchInputContainerFocused]}>
        <Icon name="search" size={16} color="#999" style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {(value && value.length > 0) && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="close-circle" size={16} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      {showCancelButton && (
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Icon name="cancel" size={16} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchInputContainerFocused: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    marginLeft: 12,
    padding: 4,
  },
});

export default SearchBar;