import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category?: string;
  brand?: string;
  sales?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  isNew?: boolean;
  isHot?: boolean;
  onPress: () => void;
  onAddToCart?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 两列布局，左右边距各16，中间间距16

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  images,
  category,
  brand,
  sales,
  rating,
  reviewCount,
  tags,
  isNew = false,
  isHot = false,
  onPress,
  onAddToCart,
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
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.badgeText}>新品</Text>
          </View>
        )}
        {isHot && (
          <View style={styles.hotBadge}>
            <Text style={styles.badgeText}>热销</Text>
          </View>
        )}
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.badgeText}>{discount}折</Text>
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
      </View>
      
      <View style={styles.infoContainer}>
        {brand && <Text style={styles.brand} numberOfLines={1}>{brand}</Text>}
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>¥{price}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>¥{originalPrice}</Text>
          )}
          {sales && (
            <Text style={styles.sales}>已售{sales}件</Text>
          )}
        </View>
        
        {rating && reviewCount && (
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon 
                  key={index} 
                  name={index < Math.floor(rating) ? 'star' : 'star-outline'} 
                  size={12} 
                  color="#FFD700" 
                />
              ))}
            </View>
            <Text style={styles.reviewCount}>({reviewCount})</Text>
          </View>
        )}
        
        {tags && tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      {onAddToCart && (
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <Icon name="cart" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      )}
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
    position: 'relative',
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
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4285F4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hotBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EA4335',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
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
  infoContainer: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 'auto',
  },
  sales: {
    fontSize: 12,
    color: '#999999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#666666',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ProductCard;