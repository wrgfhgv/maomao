import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 定义路由参数类型
interface ExpertDetailRouteParams {
  expert: {
    id: string;
    name: string;
    title: string;
    hospital: string;
    avatar: string;
    specialty: string;
    experience: string;
    answerCount: number;
    satisfactionRate: number;
    followers: number;
    description: string;
  };
}

const ExpertDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ ExpertDetail: ExpertDetailRouteParams }>>();
  const expert = route.params?.expert;

  const [isFollowing, setIsFollowing] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('answers'); // answers, info

  // 模拟加载专家回答数据
  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // 模拟回答数据
      const mockAnswers = [
        {
          id: 'a1',
          question: '猫咪总是乱尿怎么办？',
          answer: '猫咪乱尿可能有多种原因，包括生理因素（如泌尿系统疾病）、心理因素（如压力、焦虑）或环境因素（如猫砂盆位置不合适、猫砂类型不喜欢等）。建议先带猫咪去看兽医排除健康问题，然后检查猫砂盆的数量、位置和清洁度，同时观察猫咪的生活环境是否有变化导致压力增加。',
          publishDate: '2024-03-22',
          likeCount: 128,
          isLiked: false,
          viewCount: 1256,
          commentCount: 15
        },
        {
          id: 'a2',
          question: '如何给猫咪洗澡不反抗？',
          answer: '给猫咪洗澡需要耐心和技巧。建议从猫咪小时候开始培养洗澡习惯，使用猫咪专用沐浴露，洗澡前让猫咪熟悉浴室环境，洗澡时注意保暖，避免水进入猫咪的耳朵和眼睛，洗澡后及时吹干。可以在洗澡过程中给予猫咪零食奖励，让猫咪逐渐适应洗澡。',
          publishDate: '2024-03-19',
          likeCount: 156,
          isLiked: false,
          viewCount: 1567,
          commentCount: 23
        },
        {
          id: 'a3',
          question: '猫咪呕吐是什么原因？',
          answer: '猫咪呕吐是常见的症状，可能由多种原因引起，包括饮食不当、毛球症、消化系统疾病、感染等。如果猫咪偶尔呕吐且精神状态良好，可能是正常的生理反应；但如果频繁呕吐、伴有其他症状（如腹泻、精神萎靡、食欲不振等），应及时就医检查。',
          publishDate: '2024-03-15',
          likeCount: 98,
          isLiked: false,
          viewCount: 897,
          commentCount: 18
        },
        {
          id: 'a4',
          question: '猫咪需要定期体检吗？多久一次合适？',
          answer: '是的，猫咪需要定期体检。一般来说，1岁以下的幼猫建议每3-6个月体检一次；1-7岁的成年猫每年体检一次；7岁以上的老年猫建议每半年体检一次。定期体检可以及时发现潜在的健康问题，做到早发现早治疗。',
          publishDate: '2024-03-10',
          likeCount: 210,
          isLiked: false,
          viewCount: 2103,
          commentCount: 32
        },
      ];

      setAnswers(mockAnswers);
    } catch (error) {
      console.error('加载回答失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理关注/取消关注
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // 处理预约咨询
  const handleConsult = () => {
    // 这里可以实现预约咨询功能
    console.log('预约咨询专家:', expert?.id);
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

  // 处理查看回答详情
  const handleViewAnswerDetail = (answer) => {
    // 这里可以导航到回答详情页
    console.log('查看回答详情:', answer.id);
  };

  // 处理返回
  const handleBack = () => {
    navigation.goBack();
  };

  // 渲染回答项
  const renderAnswerItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.answerItem}
        onPress={() => handleViewAnswerDetail(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.questionText}>{item.question}</Text>
        <Text style={styles.answerText} numberOfLines={3}>
          {item.answer}
        </Text>
        <View style={styles.answerFooter}>
          <Text style={styles.answerDate}>{item.publishDate}</Text>
          <View style={styles.answerStats}>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => handleLikeAnswer(item.id)}
            >
              <Icon 
                name={item.isLiked ? 'thumbs-up' : 'thumbs-up-outline'} 
                size={14} 
                color={item.isLiked ? '#FF6B6B' : '#999'} 
              />
              <Text 
                style={[ 
                  styles.statText, 
                  item.isLiked && styles.statTextActive 
                ]}
              >
                {item.likeCount}
              </Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Icon name="eye-outline" size={14} color="#999" />
              <Text style={styles.statText}>{item.viewCount}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="message-circle-outline" size={14} color="#999" />
              <Text style={styles.statText}>{item.commentCount}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>查看更多</Text>
          <Icon name="chevron-right" size={12} color="#999" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (!expert) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>专家不存在</Text>
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
        <Text style={styles.headerTitle}>专家详情</Text>
        <View style={styles.headerRight} />
      </View>

      {/* 内容区域 */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 专家信息卡片 */}
        <View style={styles.expertCard}>
          <Image source={{ uri: expert.avatar }} style={styles.expertAvatar} />
          <View style={styles.expertInfo}>
            <View style={styles.expertNameContainer}>
              <Text style={styles.expertName}>{expert.name}</Text>
              <View style={styles.expertBadge}>
                <Text style={styles.expertBadgeText}>专家</Text>
              </View>
            </View>
            <Text style={styles.expertTitle}>{expert.title}</Text>
            <Text style={styles.expertHospital}>{expert.hospital}</Text>
          </View>
        </View>

        {/* 专家数据统计 */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{expert.answerCount}</Text>
            <Text style={styles.statLabel}>回答</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{expert.satisfactionRate}%</Text>
            <Text style={styles.statLabel}>满意度</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{expert.followers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>关注者</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{expert.experience}</Text>
            <Text style={styles.statLabel}>经验</Text>
          </View>
        </View>

        {/* 专家操作按钮 */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[ 
              styles.followButton, 
              isFollowing && styles.followingButton 
            ]} 
            onPress={handleFollow}
          >
            <Icon 
              name={isFollowing ? 'checkmark' : 'add'} 
              size={14} 
              color={isFollowing ? '#333' : '#FFFFFF'} 
            />
            <Text 
              style={[ 
                styles.followButtonText, 
                isFollowing && styles.followingButtonText 
              ]}
            >
              {isFollowing ? '已关注' : '关注'}专家
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.consultButton} onPress={handleConsult}>
            <Icon name="calendar-outline" size={14} color="#FFFFFF" />
            <Text style={styles.consultButtonText}>预约咨询</Text>
          </TouchableOpacity>
        </View>

        {/* 标签切换 */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'answers' && styles.activeTab]}
            onPress={() => setActiveTab('answers')}
          >
            <Text style={[styles.tabText, activeTab === 'answers' && styles.activeTabText]}>回答 ({answers.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>专家介绍</Text>
          </TouchableOpacity>
        </View>

        {/* 标签内容 */}
        <View style={styles.tabContent}>
          {/* 回答列表 */}
          {activeTab === 'answers' && (
            <View style={styles.answersList}>
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
                      <Text style={styles.emptyText}>暂无回答</Text>
                    </View>
                  }
                />
              )}
            </View>
          )}

          {/* 专家介绍 */}
          {activeTab === 'info' && (
            <View style={styles.expertProfile}>
              <View style={styles.profileSection}>
                <Text style={styles.profileSectionTitle}>专业领域</Text>
                <Text style={styles.profileSectionContent}>{expert.specialty}</Text>
              </View>
              <View style={styles.profileSection}>
                <Text style={styles.profileSectionTitle}>执业经历</Text>
                <Text style={styles.profileSectionContent}>{expert.experience}</Text>
              </View>
              <View style={styles.profileSection}>
                <Text style={styles.profileSectionTitle}>擅长方向</Text>
                <Text style={styles.profileSectionContent}>
                  {expert.specialty}，{expert.description.split('，')[0]}
                </Text>
              </View>
              <View style={styles.profileSection}>
                <Text style={styles.profileSectionTitle}>专家简介</Text>
                <Text style={styles.profileSectionContent}>{expert.description}</Text>
              </View>
              <View style={styles.profileSection}>
                <Text style={styles.profileSectionTitle}>服务信息</Text>
                <View style={styles.serviceInfo}>
                  <View style={styles.serviceItem}>
                    <Text style={styles.serviceLabel}>在线咨询</Text>
                    <Text style={styles.serviceValue}>¥50/次</Text>
                  </View>
                  <View style={styles.serviceItem}>
                    <Text style={styles.serviceLabel}>电话咨询</Text>
                    <Text style={styles.serviceValue}>¥80/15分钟</Text>
                  </View>
                  <View style={styles.serviceItem}>
                    <Text style={styles.serviceLabel}>上门服务</Text>
                    <Text style={styles.serviceValue}>¥200/次起</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* 底部空间，确保内容不被遮挡 */}
        <View style={styles.bottomSpace} />
      </ScrollView>
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
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  expertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  expertAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  expertInfo: {
    flex: 1,
  },
  expertNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  expertName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  expertBadge: {
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  expertBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  expertTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  expertHospital: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  followButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  followingButton: {
    backgroundColor: '#F0F0F0',
  },
  followButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  followingButtonText: {
    color: '#333',
  },
  consultButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
  },
  consultButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  tabContent: {
    backgroundColor: '#FFFFFF',
  },
  answersList: {
    padding: 16,
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
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  answerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  answerDate: {
    fontSize: 12,
    color: '#999',
  },
  answerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  statText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  statTextActive: {
    color: '#FF6B6B',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginRight: 4,
  },
  answerSeparator: {
    height: 8,
  },
  expertProfile: {
    padding: 16,
  },
  profileSection: {
    marginBottom: 20,
  },
  profileSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  profileSectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  serviceInfo: {
    marginTop: 4,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  serviceLabel: {
    fontSize: 14,
    color: '#333',
  },
  serviceValue: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 80,
  },
});

export default ExpertDetailScreen;