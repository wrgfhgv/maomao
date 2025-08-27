import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 定义路由参数类型
interface QuestionDetailRouteParams {
  question: {
    id: string;
    question: string;
    category: string;
    author: string;
    authorAvatar: string;
    publishDate: string;
    viewCount: number;
    answerCount: number;
    bestAnswer?: {
      id: string;
      author: string;
      authorAvatar: string;
      content: string;
      likeCount: number;
      publishDate: string;
      isExpert: boolean;
    };
  };
}

const QuestionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ QuestionDetail: QuestionDetailRouteParams }>>();
  const question = route.params?.question;

  const [answers, setAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 模拟加载回答数据
  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // 如果有最佳回答，先添加到回答列表中
      const mockAnswers = [];
      if (question?.bestAnswer) {
        mockAnswers.push({
          ...question.bestAnswer,
          isBestAnswer: true
        });
      }
      
      // 模拟其他回答数据
      const otherAnswers = [
        {
          id: 'a2',
          author: '用户123',
          authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
          content: '我家猫咪也有过类似的情况，后来发现是猫砂盆的位置不合适。我把猫砂盆搬到了更安静的地方，情况就改善了很多。',
          publishDate: '2024-03-22 10:15',
          likeCount: 25,
          isLiked: false,
          isExpert: false,
          commentCount: 3,
          isBestAnswer: false
        },
        {
          id: 'a3',
          author: '养猫达人',
          authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
          content: '建议先带猫咪去医院检查一下，排除泌尿系统疾病的可能。如果没有健康问题，可以尝试更换猫砂品牌，或者增加猫砂盆的数量。',
          publishDate: '2024-03-22 09:30',
          likeCount: 18,
          isLiked: false,
          isExpert: false,
          commentCount: 1,
          isBestAnswer: false
        },
        {
          id: 'a4',
          author: '新手铲屎官',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
          content: '我也遇到过这个问题，后来看了一篇文章说，猫咪乱尿可能是因为压力过大。我尝试给猫咪增加了一些玩具和猫抓板，同时减少了家里的噪音，情况慢慢好转了。',
          publishDate: '2024-03-21 20:45',
          likeCount: 12,
          isLiked: false,
          isExpert: false,
          commentCount: 0,
          isBestAnswer: false
        },
      ];

      setAnswers([...mockAnswers, ...otherAnswers]);
    } catch (error) {
      console.error('加载回答失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理回答点赞
  const handleLikeAnswer = (answerId) => {
    setAnswers(answers.map(answer => {
      if (answer.id === answerId) {
        return {
          ...answer,
          isLiked: !answer.isLiked,
          likeCount: answer.isLiked ? answer.likeCount - 1 : answer.likeCount + 1
        };
      }
      return answer;
    }));
  };

  // 处理提交回答
  const handleSubmitAnswer = () => {
    if (!answerInput.trim()) return;
    
    const newAnswer = {
      id: `a${Date.now()}`,
      author: '我',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      content: answerInput.trim(),
      publishDate: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\//g, '-'),
      likeCount: 0,
      isLiked: false,
      isExpert: false,
      commentCount: 0,
      isBestAnswer: false
    };

    setAnswers([...answers, newAnswer]);
    setAnswerInput('');
  };

  // 处理返回
  const handleBack = () => {
    navigation.goBack();
  };

  // 处理分享
  const handleShare = () => {
    // 这里可以实现分享功能
    console.log('分享问题:', question?.id);
  };

  // 处理收藏问题
  const handleCollect = () => {
    // 这里可以实现收藏问题功能
    console.log('收藏问题:', question?.id);
  };

  // 渲染回答项
  const renderAnswerItem = ({ item }) => {
    return (
      <View style={[styles.answerItem, item.isBestAnswer && styles.bestAnswerItem]}>
        {item.isBestAnswer && (
          <View style={styles.bestAnswerBadge}>
            <Text style={styles.bestAnswerBadgeText}>最佳回答</Text>
          </View>
        )}
        <View style={styles.answerHeader}>
          <View style={styles.answerAuthor}>
            <Image source={{ uri: item.authorAvatar }} style={styles.authorAvatar} />
            <Text style={styles.authorName}>{item.author}</Text>
            {item.isExpert && (
              <View style={styles.expertBadge}>
                <Text style={styles.expertBadgeText}>专家</Text>
              </View>
            )}
          </View>
          <Text style={styles.answerDate}>{item.publishDate}</Text>
        </View>
        <Text style={styles.answerContent}>{item.content}</Text>
        <View style={styles.answerActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleLikeAnswer(item.id)}
          >
            <Icon 
              name={item.isLiked ? 'thumbs-up' : 'thumbs-up-outline'} 
              size={16} 
              color={item.isLiked ? '#FF6B6B' : '#999'} 
            />
            <Text 
              style={[ 
                styles.actionButtonText, 
                item.isLiked && styles.actionButtonTextActive 
              ]}
            >
              {item.likeCount || '赞'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="message-circle-outline" size={16} color="#999" />
            <Text style={styles.actionButtonText}>{item.commentCount || '评论'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!question) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>问题不存在</Text>
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
        <Text style={styles.headerTitle}>问题详情</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Icon name="share-social-outline" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCollect} style={styles.headerButton}>
            <Icon name="bookmark-outline" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 内容区域 */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 问题卡片 */}
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.questionAuthor}>
              <Image source={{ uri: question.authorAvatar }} style={styles.authorAvatar} />
              <Text style={styles.authorName}>{question.author}</Text>
            </View>
            <Text style={styles.questionDate}>{question.publishDate}</Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
          <View style={styles.questionStats}>
            <View style={styles.statItem}>
              <Icon name="eye-outline" size={14} color="#999" />
              <Text style={styles.statText}>{question.viewCount}浏览</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="message-circle-outline" size={14} color="#999" />
              <Text style={styles.statText}>{answers.length || question.answerCount}回答</Text>
            </View>
          </View>
        </View>

        {/* 回答列表 */}
        <View style={styles.answersSection}>
          <Text style={styles.answersSectionTitle}>回答 ({answers.length})</Text>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>加载中...</Text>
            </View>
          ) : (
            <FlatList
              data={answers}
              renderItem={renderAnswerItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.answerSeparator} />}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>暂无回答，快来抢沙发吧！</Text>
                </View>
              }
            />
          )}
        </View>

        {/* 底部空间，确保内容不被遮挡 */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 底部回答输入框 */}
      <View style={styles.answerInputContainer}>
        <TextInput
          style={styles.answerInput}
          placeholder="写下你的回答..."
          placeholderTextColor="#999"
          value={answerInput}
          onChangeText={setAnswerInput}
          multiline={true}
          numberOfLines={2}
          maxLength={500}
          textAlignVertical="top"
        />
        <TouchableOpacity 
          style={[ 
            styles.submitButton, 
            !answerInput.trim() && styles.submitButtonDisabled 
          ]} 
          onPress={handleSubmitAnswer}
          disabled={!answerInput.trim()}
        >
          <Text style={styles.submitButtonText}>回答</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  },
  backButton: {
    padding: 8,
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  questionDate: {
    fontSize: 12,
    color: '#999',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 26,
    marginBottom: 12,
  },
  questionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  answersSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  answersSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
  },
  answerItem: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  bestAnswerItem: {
    backgroundColor: '#FFF7E6',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  bestAnswerBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 10,
  },
  bestAnswerBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 8,
  },
  answerAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertBadge: {
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginLeft: 6,
  },
  expertBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  answerDate: {
    fontSize: 12,
    color: '#999',
  },
  answerContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  answerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  actionButtonTextActive: {
    color: '#FF6B6B',
  },
  answerSeparator: {
    height: 16,
  },
  bottomSpace: {
    height: 80,
  },
  answerInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  answerInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    marginRight: 12,
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    height: 40,
    alignSelf: 'flex-end',
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

export default QuestionDetailScreen;