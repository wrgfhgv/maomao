import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COMMENT_PAGE_SIZE = 15; // 每次加载的评论数量

type PostDetailParamList = {
  PostDetail: { id: string; type?: string; imageUrl?: string; title?: string };
};

// 评论类型定义
interface Comment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean; // 添加点赞状态属性
}

// 帖子详情类型定义
interface PostDetail {
  id: string;
  imageUrl: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  viewCount: number;
}

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PostDetailParamList, 'PostDetail'>>();
  const { id, imageUrl, title } = route.params;

  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [commentPage, setCommentPage] = useState(1);
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showCommentSheet, setShowCommentSheet] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // 添加关注状态
  const scrollViewRef = useRef<ScrollView>(null);

  // 处理关注按钮点击
  const handleFollowPress = () => {
    setIsFollowing(prev => !prev);
    // 这里可以添加实际的关注/取消关注API调用
    console.log(
      `${isFollowing ? '取消关注' : '关注'}了用户: ${
        postDetail?.author.username
      }`,
    );
  };

  // 处理分享按钮点击
  const handleSharePress = () => {
    // 这里可以添加实际的分享功能
    console.log('分享帖子:', postDetail?.title);
    // 简单的分享提示
  };

  // 模拟获取帖子详情数据
  const fetchPostDetail = async () => {
    setIsLoading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(() => resolve(''), 800));

      // 生成模拟帖子详情数据
      const mockPostDetail: PostDetail = {
        id,
        imageUrl:
          imageUrl ||
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
        title: title || '宠物动态详情',
        content:
          '这是一个关于宠物的详细内容描述。在这里，我们可以分享宠物的日常故事、成长经历、有趣瞬间等等。\n\n宠物是人类最好的朋友，它们给我们带来了无尽的欢乐和陪伴。无论是猫咪还是狗狗，它们都有自己独特的个性和习惯。\n\n通过这个平台，我们可以记录宠物的每一个精彩瞬间，分享给更多的宠物爱好者。',
        author: {
          id: 'user123',
          username: '宠物爱好者',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 200) + 10,
        timestamp: '2023-10-15 14:30',
        viewCount: Math.floor(Math.random() * 5000),
      };

      setPostDetail(mockPostDetail);
    } catch (error) {
      console.error('Failed to fetch post detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 模拟获取评论数据（分页）
  const fetchComments = async (
    pageNum: number = 1,
    append: boolean = false,
  ) => {
    if (isLoadingMoreComments && append) return;

    if (append) {
      setIsLoadingMoreComments(true);
    }

    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(() => resolve(''), 500));

      // 生成模拟评论数据
      const mockComments: Comment[] = [];
      const startId = (pageNum - 1) * COMMENT_PAGE_SIZE + 1;
      const endId = pageNum * COMMENT_PAGE_SIZE;

      for (let i = startId; i <= endId; i++) {
        mockComments.push({
          id: `comment-${id}-${i}`,
          username: `用户${Math.floor(Math.random() * 1000)}`,
          avatar: `https://randomuser.me/api/portraits/${
            i % 2 === 0 ? 'men' : 'women'
          }/${Math.floor(Math.random() * 100)}.jpg`,
          content: `这是一条评论内容，用户分享了自己的看法和观点。${i}`,
          timestamp: `${2023}-${10}-${15 - Math.floor(i / 5)} ${
            10 + (i % 12)
          }:${Math.floor(i / 6) * 10}`,
          likes: Math.floor(Math.random() * 50),
          isLiked: false, // 初始化点赞状态为未点赞
        });
      }

      if (append) {
        setComments(prevComments => [...prevComments, ...mockComments]);
      } else {
        setComments(mockComments);
      }

      // 模拟只有5页数据
      setHasMoreComments(pageNum < 5);
      setCommentPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      if (append) {
        setIsLoadingMoreComments(false);
      }
    }
  };

  // 处理加载更多评论
  const handleLoadMoreComments = () => {
    if (hasMoreComments && !isLoadingMoreComments) {
      fetchComments(commentPage + 1, true);
    }
  };

  // 处理发布评论
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    // 创建新评论
    const newComment: Comment = {
      id: `comment-${id}-${Date.now()}`,
      username: '当前用户', // 实际项目中应该使用登录用户信息
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // 实际项目中应该使用登录用户头像
      content: commentText,
      timestamp: new Date().toLocaleString('zh-CN'),
      likes: 0,
    };

    // 添加到评论列表开头
    setComments(prevComments => [newComment, ...prevComments]);
    // 清空输入框并关闭评论层
    setCommentText('');
    setSelectedImages([]);
    setShowCommentSheet(false);
    setShowEmojiPicker(false);

    // 如果有新评论，更新帖子评论数
    if (postDetail) {
      setPostDetail(prev =>
        prev
          ? {
              ...prev,
              comments: prev.comments + 1,
            }
          : null,
      );
    }
  };

  // 处理打开评论层
  const handleOpenCommentSheet = () => {
    setShowCommentSheet(true);
    // 延迟一小段时间，确保评论层已经渲染完成后再聚焦输入框
    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }, 300);
  };

  // 处理关闭评论层
  const handleCloseCommentSheet = () => {
    setShowCommentSheet(false);
    setShowEmojiPicker(false);
  };

  // 处理选择图片
  const handleSelectImage = () => {
    // 实际项目中应该调用图片选择器
    // 这里模拟选择一张图片
    const newImage =
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80';
    setSelectedImages(prev => [...prev, newImage]);
  };

  // 处理移除选中的图片
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 处理添加表情
  const handleAddEmoji = (emoji: string) => {
    setCommentText(prev => prev + emoji);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    );
  };

  // 初始化加载数据
  useEffect(() => {
    fetchPostDetail();
    fetchComments(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 评论输入框引用
  const commentInputRef = useRef<TextInput>(null);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.keyboardAvoidingView}
      >
        {/* 评论弹出层（移到最外层，确保覆盖状态栏） */}
        {showCommentSheet && (
          <View style={styles.commentSheetOverlay}>
            <TouchableOpacity
              style={styles.commentSheetBackdrop}
              activeOpacity={1}
              onPress={handleCloseCommentSheet}
            />
            <View style={styles.commentSheetContainer}>
              {/* 评论输入区域 */}
              <View style={styles.commentSheetInputContainer}>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                  }}
                  style={styles.commentSheetAvatar}
                />
                <View style={styles.commentSheetInputWrapper}>
                  <TextInput
                    style={styles.commentSheetInput}
                    placeholder="有话要说，快来评论"
                    placeholderTextColor="#999"
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    autoFocus
                    ref={commentInputRef}
                  />

                  {/* 选中的图片预览 */}
                  {selectedImages.length > 0 && (
                    <View style={styles.commentSheetImagesContainer}>
                      {selectedImages.map((image, index) => (
                        <View
                          key={index}
                          style={styles.commentSheetImageWrapper}
                        >
                          <Image
                            source={{ uri: image }}
                            style={styles.commentSheetImage}
                          />
                          <TouchableOpacity
                            style={styles.commentSheetRemoveImage}
                            onPress={() => handleRemoveImage(index)}
                          >
                            <Icon name="close" size={12} color="white" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* 功能按钮区域 */}
              <View style={styles.commentSheetActions}>
                <TouchableOpacity
                  style={styles.commentSheetAction}
                  onPress={handleSelectImage}
                >
                  <Icon name="image-outline" size={20} color="#666" />
                  <Text style={styles.commentSheetActionText}>图片</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.commentSheetAction}
                  onPress={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Icon name="happy-outline" size={20} color="#666" />
                  <Text style={styles.commentSheetActionText}>表情</Text>
                </TouchableOpacity>
                <View style={styles.commentSheetSendContainer}>
                  <TouchableOpacity
                    style={[
                      styles.commentSheetSendButton,
                      !commentText.trim() &&
                        styles.commentSheetSendButtonDisabled,
                    ]}
                    onPress={handleSubmitComment}
                    disabled={!commentText.trim()}
                  >
                    <Text style={styles.commentSheetSendText}>发送</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 表情选择器 */}
              {showEmojiPicker && (
                <View style={styles.commentSheetEmojiContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[
                      '😀',
                      '😃',
                      '😄',
                      '😁',
                      '😆',
                      '😅',
                      '😂',
                      '🤣',
                      '😊',
                      '😇',
                      '🙂',
                      '🙃',
                      '😉',
                      '😌',
                      '😍',
                      '🥰',
                      '😘',
                      '😗',
                      '😙',
                      '😚',
                      '😋',
                      '😛',
                      '😝',
                      '😜',
                      '🤪',
                      '🤨',
                      '🧐',
                      '🤓',
                      '😎',
                      '🤩',
                      '🥳',
                      '😏',
                    ].map((emoji, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.commentSheetEmojiItem}
                        onPress={() => handleAddEmoji(emoji)}
                      >
                        <Text style={styles.commentSheetEmojiText}>
                          {emoji}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
      {/* 主内容区域 */}
      <SafeAreaView style={styles.container}>
        {/* 顶部返回栏 */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={16} color="#000" />
            </TouchableOpacity>
            <Image
              source={{ uri: postDetail?.author.avatar }}
              style={styles.authorAvatar}
            />
            <Text style={styles.authorName}>{postDetail?.author.username}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollowPress}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? '已关注' : '关注'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleSharePress}
              activeOpacity={0.7}
            >
              <Icon name="share-outline" size={18} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 内容区域 */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            const { layoutMeasurement, contentOffset, contentSize } =
              event.nativeEvent;
            const paddingToBottom = 20;
            if (
              layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom &&
              hasMoreComments &&
              !isLoadingMoreComments
            ) {
              handleLoadMoreComments();
            }
          }}
          scrollEventThrottle={100}
        >
          {/* 顶部图片 */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: postDetail?.imageUrl }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </View>

          {/* 中间文字内容 */}
          <View style={styles.contentContainer}>
            <View style={styles.authorContainer}>
              <Image
                source={{ uri: postDetail?.author.avatar }}
                style={styles.authorAvatar}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>
                  {postDetail?.author.username}
                </Text>
                <Text style={styles.postTime}>{postDetail?.timestamp}</Text>
              </View>
            </View>

            <Text style={styles.postTitle}>{postDetail?.title}</Text>
            <Text style={styles.postContent}>{postDetail?.content}</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="heart-outline" size={16} color="#666" />
                <Text style={styles.statText}>{postDetail?.likes} 喜欢</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="chatbubble-outline" size={16} color="#666" />
                <Text style={styles.statText}>{postDetail?.comments} 评论</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="eye-outline" size={16} color="#666" />
                <Text style={styles.statText}>
                  {postDetail?.viewCount} 浏览
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* 评论输入引导 */}
            <TouchableOpacity
              style={styles.commentInputGuide}
              onPress={handleOpenCommentSheet}
            >
              <Text style={styles.commentInputGuideText}>写下你的评论...</Text>
            </TouchableOpacity>

            <Text style={styles.commentsTitle}>
              评论 ({postDetail?.comments})
            </Text>

            {comments.map(comment => (
              <View key={comment.id} style={styles.commentItem}>
                {/* 左侧内容 */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Image
                    source={{ uri: comment.avatar }}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUsername}>
                        {comment.username}
                      </Text>
                      <Text style={styles.commentTime}>
                        {comment.timestamp} {/* 修复属性名 */}
                      </Text>
                    </View>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>
                </View>
                {/* 右侧点赞按钮 */}
                <TouchableOpacity
                  style={styles.commentLikeButton}
                  onPress={() => handleCommentLike(comment.id)}
                  activeOpacity={0.7}
                >
                  <Icon // 改用已导入的Icon组件
                    name={comment.isLiked ? 'heart' : 'heart-outline'} // 点赞状态切换图标
                    size={16}
                    color={comment.isLiked ? '#FF6B6B' : '#999999'}
                  />
                  <Text
                    style={[
                      styles.commentLikeText,
                      comment.isLiked && { color: '#FF6B6B' },
                    ]}
                  >
                    {comment.likes}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* 加载更多指示器 */}
            {isLoadingMoreComments && (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#FF6B6B" />
                <Text style={styles.loadingMoreText}>加载更多评论...</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
  },
  followingButton: {
    backgroundColor: '#F0F0F0',
  },
  followButtonText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
  },
  followingButtonText: {
    color: '#666',
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.75, // 设置为4:3比例
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
    marginLeft: 8,
  },
  authorInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 24,
  },
  postContent: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
  },
  commentsContainer: {
    width: '100%',
    flex: 1,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  commentTime: {
    fontSize: 12,
    color: '#999999',
  },
  commentText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  commentActions: {
    marginTop: 6,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  // 评论输入引导样式
  commentInputGuide: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  commentInputGuideText: {
    fontSize: 14,
    color: '#999',
  },

  // 底部评论弹出层样式
  commentSheetOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 9999,
    justifyContent: 'flex-end',
  },
  commentSheetBackdrop: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  commentSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  commentSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  commentSheetTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  commentSheetClose: {
    padding: 4,
  },
  commentSheetInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  commentSheetAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentSheetInputWrapper: {
    flex: 1,
  },
  commentSheetInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    minHeight: 44,
    textAlignVertical: 'top',
  },
  commentSheetImagesContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  commentSheetImageWrapper: {
    width: 40,
    height: 40,
    marginRight: 8,
    marginBottom: 8,
    position: 'relative',
  },
  commentSheetImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  commentSheetRemoveImage: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentSheetActions: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  commentSheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  commentSheetActionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  commentSheetSendContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  commentSheetSendButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  commentSheetSendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  commentSheetSendText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  // 表情选择器样式
  commentSheetEmojiContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    maxHeight: 120,
  },
  commentSheetEmojiItem: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  commentSheetEmojiText: {
    fontSize: 28,
  },
  // 加载更多样式
  loadingMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadingMoreText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
});

export default PostDetailScreen;
