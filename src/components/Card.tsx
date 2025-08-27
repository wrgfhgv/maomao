import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  onPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  tags?: string[];
  showActions?: boolean;
  style?: object;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const { width } = Dimensions.get('window');

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  onPress,
  onLikePress,
  onCommentPress,
  onSharePress,
  likeCount = 0,
  commentCount = 0,
  isLiked = false,
  tags = [],
  showActions = false,
  style,
  children,
  footer,
}) => {
  const CardContent = (
    <View style={[styles.card, style]}>
      {image && (
        <Image source={{ uri: image }} style={styles.cardImage} />
      )}
      
      {(title || subtitle) && (
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      
      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
      
      {children && (
        <View style={styles.childrenContainer}>
          {children}
        </View>
      )}
      
      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onLikePress}>
            <Icon 
              name={isLiked ? "heart" : "heart-outline"} 
              size={16} 
              color={isLiked ? "#FF6B6B" : "#999"} 
            />
            {likeCount > 0 && <Text style={styles.actionText}>{likeCount}</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
            <Icon name="chatbubble-outline" size={16} color="#999" />
            {commentCount > 0 && <Text style={styles.actionText}>{commentCount}</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
            <Icon name="share-outline" size={16} color="#999" />
          </TouchableOpacity>
        </View>
      )}
      
      {footer && (
        <View style={styles.footerContainer}>
          {footer}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  titleContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  tagItem: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  childrenContainer: {
    padding: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  footerContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});

export default Card;