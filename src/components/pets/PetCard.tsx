import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  price?: number;
  images: string[];
  location?: string;
  description?: string;
  isCertified?: boolean;
  isVaccinated?: boolean;
  isSterilized?: boolean;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 两列布局，左右边距各16，中间间距16

const PetCard: React.FC<PetCardProps> = ({
  id,
  name,
  breed,
  age,
  gender,
  price,
  images,
  location,
  description,
  isCertified = false,
  isVaccinated = false,
  isSterilized = false,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: images[0] || 'https://via.placeholder.com/200' }} 
          style={styles.image}
        />
        {price !== undefined && (
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>¥{price}</Text>
          </View>
        )}
        {onFavoritePress && (
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={(e) => {
              e.stopPropagation();
              onFavoritePress();
            }}
          >
            <Icon 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={18} 
              color={isFavorite ? '#FF6B6B' : '#FFFFFF'} 
            />
          </TouchableOpacity>
        )}
        {images.length > 1 && (
          <View style={styles.imageCountBadge}>
            <Text style={styles.imageCountText}>+{images.length - 1}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={[styles.genderBadge, gender === 'male' ? styles.maleBadge : styles.femaleBadge]}>
            <Icon 
              name={gender === 'male' ? 'male' : 'female'} 
              size={12} 
              color={gender === 'male' ? '#4285F4' : '#EA4335'} 
            />
          </View>
        </View>
        
        <Text style={styles.breed} numberOfLines={1}>{breed}</Text>
        <Text style={styles.age}>{age}</Text>
        
        {location && (
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={12} color="#999" />
            <Text style={styles.location} numberOfLines={1}>{location}</Text>
          </View>
        )}
        
        {isCertified && (
          <View style={styles.certifiedBadge}>
            <Icon name="checkmark-circle" size={12} color="#34A853" />
            <Text style={styles.certifiedText}>已认证</Text>
          </View>
        )}
      </View>
      
      <View style={styles.featuresContainer}>
        {isVaccinated && (
          <View style={styles.featureItem}>
            <Icon name="shield-virus" size={12} color="#34A853" />
            <Text style={styles.featureText}>已接种疫苗</Text>
          </View>
        )}
        {isSterilized && (
          <View style={styles.featureItem}>
            <Icon name="cut" size={12} color="#34A853" />
            <Text style={styles.featureText}>已绝育</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  imageCountText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  infoContainer: {
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  genderBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  maleBadge: {
    backgroundColor: '#E8F5E9',
  },
  femaleBadge: {
    backgroundColor: '#FFEBEE',
  },
  breed: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  age: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
    flex: 1,
  },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  certifiedText: {
    fontSize: 12,
    color: '#34A853',
    marginLeft: 4,
  },
  featuresContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
});

export default PetCard;