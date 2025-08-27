import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 定义路由参数类型
interface ArticleDetailRouteParams {
  article: {
    id: string;
    title: string;
    category: string;
    coverImage: string;
    author: string;
    authorAvatar: string;
    readCount: number;
    commentCount: number;
    likeCount: number;
    publishDate: string;
    summary: string;
  };
}

const ArticleDetailScreen = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ ArticleDetail: ArticleDetailRouteParams }>>();
  const article = route.params?.article;

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [likeCount, setLikeCount] = useState(article?.likeCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  // 模拟加载评论数据
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve =>
        setTimeout(() => resolve('加载评论数据'), 600),
      );

      // 模拟评论数据
      const mockComments = [
        {
          id: 'c1',
          author: '用户123',
          authorAvatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
          content: '非常实用的文章，正好我家猫咪最近要打疫苗，谢谢分享！',
          publishDate: '2024-03-20 15:30',
          likeCount: 32,
          isLiked: false,
          replies: [
            {
              id: 'r1',
              author: '宠物健康专家',
              authorAvatar:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
              content: '不客气，如有其他问题随时提问。',
              publishDate: '2024-03-20 16:45',
              likeCount: 15,
              isLiked: false,
              isExpert: true,
            },
          ],
        },
        {
          id: 'c2',
          author: '新手铲屎官',
          authorAvatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
          content: '请问疫苗接种后需要注意什么？猫咪会不会有不良反应？',
          publishDate: '2024-03-20 14:15',
          likeCount: 18,
          isLiked: false,
          replies: [],
        },
        {
          id: 'c3',
          author: '资深猫奴',
          authorAvatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
          content: '我家猫咪每次打疫苗后都会有点嗜睡，这正常吗？',
          publishDate: '2024-03-20 13:00',
          likeCount: 12,
          isLiked: false,
          replies: [
            {
              id: 'r2',
              author: '宠物健康专家',
              authorAvatar:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
              content:
                '轻微嗜睡是正常的疫苗反应，通常1-2天会恢复，注意观察猫咪的食欲和精神状态。',
              publishDate: '2024-03-20 13:30',
              likeCount: 25,
              isLiked: false,
              isExpert: true,
            },
          ],
        },
      ] as any;

      setComments(mockComments);
    } catch (error) {
      console.error('加载评论失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理点赞
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // 处理收藏
  const handleCollect = () => {
    setIsCollected(!isCollected);
  };

  // 处理评论点赞
  const handleCommentLike = (commentId: string) => {
    setComments(
      comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likeCount: comment.isLiked
              ? comment.likeCount - 1
              : comment.likeCount + 1,
          };
        }
        return comment;
      }),
    );
  };

  // 处理回复点赞
  const handleReplyLike = (commentId, replyId) => {
    setComments(
      comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likeCount: reply.isLiked
                    ? reply.likeCount - 1
                    : reply.likeCount + 1,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      }),
    );
  };

  // 处理提交评论
  const handleSubmitComment = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: `c${Date.now()}`,
      author: '我',
      authorAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      content: commentInput.trim(),
      publishDate: new Date()
        .toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(/\//g, '-'),
      likeCount: 0,
      isLiked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentInput('');
  };

  // 处理返回
  const handleBack = () => {
    navigation.goBack();
  };

  // 处理分享
  const handleShare = () => {
    // 这里可以实现分享功能
    console.log('分享文章:', article?.id);
  };

  // 处理查看作者主页
  const handleViewAuthor = () => {
    // 这里可以导航到作者主页
    console.log('查看作者:', article?.author);
  };

  // 渲染评论项
  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Image
          source={{ uri: item.authorAvatar }}
          style={styles.commentAvatar}
        />
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text style={styles.commentDate}>{item.publishDate}</Text>
          </View>
          <Text style={styles.commentText}>{item.content}</Text>
          <View style={styles.commentActions}>
            <TouchableOpacity
              style={styles.commentAction}
              onPress={() => handleCommentLike(item.id)}
            >
              <Icon
                name={item.isLiked ? 'thumbs-up' : 'thumbs-up-outline'}
                size={14}
                color={item.isLiked ? '#FF6B6B' : '#999'}
              />
              <Text
                style={[
                  styles.commentActionText,
                  item.isLiked && styles.commentActionTextActive,
                ]}
              >
                {item.likeCount || '赞'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentAction}>
              <Icon name="reply-outline" size={14} color="#999" />
              <Text style={styles.commentActionText}>回复</Text>
            </TouchableOpacity>
          </View>

          {/* 回复列表 */}
          {item.replies && item.replies.length > 0 && (
            <View style={styles.repliesContainer}>
              {item.replies.map(reply => (
                <View key={reply.id} style={styles.replyItem}>
                  <View style={styles.replyContent}>
                    <View style={styles.replyHeader}>
                      <Text style={styles.replyAuthor}>{reply.author}</Text>
                      {reply.isExpert && (
                        <View style={styles.expertBadge}>
                          <Text style={styles.expertBadgeText}>专家</Text>
                        </View>
                      )}
                      <Text style={styles.replyDate}>{reply.publishDate}</Text>
                    </View>
                    <Text style={styles.replyText}>{reply.content}</Text>
                    <View style={styles.replyActions}>
                      <TouchableOpacity
                        style={styles.replyAction}
                        onPress={() => handleReplyLike(item.id, reply.id)}
                      >
                        <Icon
                          name={
                            reply.isLiked ? 'thumbs-up' : 'thumbs-up-outline'
                          }
                          size={12}
                          color={reply.isLiked ? '#FF6B6B' : '#999'}
                        />
                        <Text
                          style={[
                            styles.replyActionText,
                            reply.isLiked && styles.replyActionTextActive,
                          ]}
                        >
                          {reply.likeCount || '赞'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.replyAction}>
                        <Icon name="reply-outline" size={12} color="#999" />
                        <Text style={styles.replyActionText}>回复</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  if (!article) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>文章不存在</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>返回</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-left" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Icon name="share-social-outline" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 文章内容区域 */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 文章标题和基本信息 */}
        <View style={styles.articleHeader}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <View style={styles.articleMeta}>
            <TouchableOpacity
              style={styles.authorContainer}
              onPress={handleViewAuthor}
            >
              <Image
                source={{ uri: article.authorAvatar }}
                style={styles.authorAvatar}
              />
              <Text style={styles.authorName}>{article.author}</Text>
            </TouchableOpacity>
            <View style={styles.articleStats}>
              <Text style={styles.articleStatText}>{article.publishDate}</Text>
              <View style={styles.articleStatDivider} />
              <Text style={styles.articleStatText}>
                {article.readCount}阅读
              </Text>
            </View>
          </View>
        </View>

        {/* 文章封面图 */}
        <Image
          source={{ uri: article.coverImage }}
          style={styles.articleCoverImage}
        />

        {/* 文章正文内容（模拟） */}
        <View style={styles.articleBody}>
          <Text style={styles.paragraph}>{article.summary}</Text>
          <Text style={styles.paragraph}>
            猫咪疫苗接种是保护猫咪健康的重要措施，可以有效预防多种传染病。根据猫咪的年龄和生活环境，宠物医生会为猫咪制定个性化的疫苗接种计划。
          </Text>
          <Text style={styles.paragraph}>
            一般来说，猫咪在8周龄左右开始接种第一针疫苗，之后每隔2-3周接种一次，直到完成基础免疫程序。成年猫咪每年需要进行疫苗加强接种，以维持免疫力。
          </Text>
          <Text style={styles.paragraph}>
            接种疫苗后，猫咪可能会出现一些轻微的不良反应，如嗜睡、食欲不振、注射部位红肿等，这些通常会在1-2天内自行消失。如果猫咪出现严重的不良反应，如持续呕吐、腹泻、呼吸困难等，应立即就医。
          </Text>
          <Text style={styles.paragraph}>
            除了定期接种疫苗外，猫咪还需要定期进行体内外驱虫、体检等健康检查，以确保猫咪的健康。如果您有任何关于猫咪疫苗接种的问题，建议咨询专业的宠物医生。
          </Text>
        </View>

        {/* 文章底部操作栏 */}
        <View style={styles.articleActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={20}
              color={isLiked ? '#FF6B6B' : '#666'}
            />
            <Text
              style={[
                styles.actionButtonText,
                isLiked && styles.actionButtonTextActive,
              ]}
            >
              {likeCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="message-circle-outline" size={20} color="#666" />
            <Text style={styles.actionButtonText}>
              {comments.length || article.commentCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleCollect}>
            <Icon
              name={isCollected ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isCollected ? '#FF6B6B' : '#666'}
            />
            <Text
              style={[
                styles.actionButtonText,
                isCollected && styles.actionButtonTextActive,
              ]}
            >
              收藏
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Icon name="share-outline" size={20} color="#666" />
            <Text style={styles.actionButtonText}>分享</Text>
          </TouchableOpacity>
        </View>

        {/* 评论区 */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsSectionTitle}>
            评论 ({comments.length})
          </Text>

          {/* 评论列表 */}
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={styles.commentSeparator} />
            )}
          />
        </View>

        {/* 底部空间，确保内容不被遮挡 */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 底部评论输入框 */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="说点什么..."
          placeholderTextColor="#999"
          value={commentInput}
          onChangeText={setCommentInput}
          multiline={false}
          maxLength={200}
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            !commentInput.trim() && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitComment}
          disabled={!commentInput.trim()}
        >
          <Text style={styles.submitButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  articleHeader: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 30,
    marginBottom: 12,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: '#333',
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleStatText: {
    fontSize: 12,
    color: '#999',
  },
  articleStatDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 8,
  },
  articleCoverImage: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
  },
  articleBody: {
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
  },
  articleActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  actionButtonTextActive: {
    color: '#FF6B6B',
  },
  commentsSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  commentActionText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  commentActionTextActive: {
    color: '#FF6B6B',
  },
  repliesContainer: {
    marginTop: 12,
    paddingLeft: 16,
  },
  replyItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  replyContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  replyAuthor: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginRight: 6,
  },
  expertBadge: {
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginRight: 6,
  },
  expertBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  replyDate: {
    fontSize: 11,
    color: '#999',
  },
  replyText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 6,
  },
  replyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  replyActionText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  replyActionTextActive: {
    color: '#FF6B6B',
  },
  commentSeparator: {
    height: 12,
  },
  bottomSpace: {
    height: 80,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
    marginRight: 12,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ArticleDetailScreen;
