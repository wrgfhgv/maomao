import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PostCardProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  tags?: string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount?: number;
  isLiked: boolean;
  isFollowing: boolean;
  timeAgo: string;
  onPress?: () => void;
  onUserPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onFollowPress?: () => void;
}

const { width } = Dimensions.get('window');

const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  content,
  images = [],
  tags = [],
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  viewCount,
  isLiked = false,
  isFollowing = false,
  timeAgo,
  onPress,
  onUserPress,
  onLikePress,
  onCommentPress,
  onSharePress,
  onFollowPress,
}) => {
  // 渲染图片网格
  const renderImageGrid = () => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <View style={styles.singleImageContainer}>
          <Image source={{ uri: images[0] }} style={styles.singleImage} />
        </View>
      );
    }

    // 多图网格布局
    const gridStyle = images.length === 2 ? styles.twoImagesGrid : styles.threeImagesGrid;
    
    return (
      <View style={gridStyle}>
        {images.slice(0, 4).map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image 
              source={{ uri: image }} 
              style={[styles.gridImage, index === 3 && images.length > 4 && styles.lastImageWithOverlay]}
            />
            {index === 3 && images.length > 4 && (
              <View style={styles.imageCountOverlay}>
                <Text style={styles.imageCountText}>+{images.length - 4}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  const PostContent = (
    <View style={styles.container}>
      {/* 用户信息 */}
      <View style={styles.userInfoContainer}>
        <TouchableOpacity onPress={onUserPress} activeOpacity={0.7}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </TouchableOpacity>
        
        <View style={styles.userTextContainer}>
          <TouchableOpacity onPress={onUserPress} activeOpacity={0.7}>
            <Text style={styles.username}>{user.name}</Text>
          </TouchableOpacity>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
        
        {!isFollowing && onFollowPress && (
          <TouchableOpacity style={styles.followButton} onPress={onFollowPress}>
            <Text style={styles.followButtonText}>关注</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* 帖子内容 */}
      <Text style={styles.content}>{content}</Text>
      
      {/* 标签 */}
      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
      )}
      
      {/* 图片 */}
      {renderImageGrid()}
      
      {/* 统计数据 */}
      {(viewCount !== undefined || images.length > 0) && (
        <View style={styles.statsContainer}>
          {viewCount !== undefined && (
            <View style={styles.statItem}>
              <Icon name="eye-outline" size={12} color="#999" />
              <Text style={styles.statText}>{viewCount}次浏览</Text>
            </View>
          )}
          {images.length > 0 && (
            <View style={styles.statItem}>
              <Icon name="image-outline" size={12} color="#999" />
              <Text style={styles.statText}>{images.length}张图片</Text>
            </View>
          )}
        </View>
      )}
      
      {/* 操作按钮 */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, isLiked && styles.likedButton]} 
          onPress={onLikePress}
        >
          <Icon 
            name="heart" 
            solid={isLiked} 
            size={16} 
            color={isLiked ? '#FF6B6B' : '#666'} 
          />
          <Text 
            style={[styles.actionText, isLiked && styles.likedText]} 
          >
            {likeCount > 0 ? likeCount : '点赞'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Icon name="chatbubble-outline" size={16} color="#666" />
          <Text style={styles.actionText}>
            {commentCount > 0 ? commentCount : '评论'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
          <Icon name="share-outline" size={16} color="#666" />
          <Text style={styles.actionText}>
            {shareCount > 0 ? shareCount : '分享'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bookmark-outline" size={16} color="#666" />
          <Text style={styles.actionText}>收藏</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {PostContent}
      </TouchableOpacity>
    );
  }

  return PostContent;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    fontSize: 12,
    color: '#4285F4',
    marginRight: 8,
    marginBottom: 4,
  },
  singleImageContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  singleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  twoImagesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  threeImagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 4,
    marginBottom: 4,
  },
  gridImage: {
    width: (width - 64) / 3, // 考虑左右padding和间距
    height: (width - 64) / 3,
    marginBottom: 4,
    marginRight: 4,
    borderRadius: 4,
  },
  lastImageWithOverlay: {
    position: 'relative',
  },
  imageCountOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  imageCountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  likedButton: {
    // 点赞后的按钮样式
  },
  actionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  likedText: {
    color: '#FF6B6B',
  },
});

export default PostCard;