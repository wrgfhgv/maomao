import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderBarProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightButtons?: Array<{
    icon: string;
    onPress: () => void;
  }>;
  backgroundColor?: string;
  titleColor?: string;
  elevation?: number;
}

const { width } = Dimensions.get('window');

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  onBackPress,
  showBackButton = false,
  rightButtons = [],
  backgroundColor = '#FFFFFF',
  titleColor = '#333333',
  elevation = 1,
}) => {
  return (
    <View 
      style={[
        styles.header,
        { backgroundColor, elevation },
        showBackButton || rightButtons.length > 0 ? styles.headerWithButtons : null
      ]}
    >
      {showBackButton && onBackPress && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={18} color="#333" />
        </TouchableOpacity>
      )}
      
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      
      <View style={styles.rightButtonsContainer}>
        {rightButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rightButton}
            onPress={button.onPress}
            activeOpacity={0.7}
          >
            <Icon name={button.icon} size={18} color="#333" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerWithButtons: {
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderBar;