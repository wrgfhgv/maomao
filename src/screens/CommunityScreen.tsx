import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('recommend');
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [searchText, setSearchText] = useState('');

  // 模拟加载社区数据
  useEffect(() => {
    loadCommunityData();
  }, [activeTab]);

  const loadCommunityData = () => {
    // 模拟从API获取数据
    const mockPosts = [
      {
        id: '1',
        user: {
          id: '101',
          name: '宠物达人',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          isVerified: true,
        },
        content:
          '分享我家金毛的训练经验，经过三个月的训练，现在已经能听懂各种指令了！#宠物训练',
        images: [
          'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80',
        ],
        likes: 567,
        comments: 89,
        shares: 45,
        createdAt: '2小时前',
        tags: ['宠物训练'],
      },
      {
        id: '2',
        user: {
          id: '102',
          name: '猫咪爱好者',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          isVerified: false,
        },
        content:
          '我家猫咪最近爱上了这款新玩具，简直爱不释手！#萌宠瞬间 #宠物玩具',
        images: [
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
        ],
        likes: 432,
        comments: 67,
        shares: 23,
        createdAt: '4小时前',
        tags: ['萌宠瞬间', '宠物玩具'],
      },
      {
        id: '3',
        user: {
          id: '103',
          name: '宠物医师',
          avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
          isVerified: true,
        },
        content:
          '季节交替，宠物容易出现肠胃问题，这些预防措施一定要做好！#宠物健康 #新手养宠',
        images: [],
        likes: 789,
        comments: 124,
        shares: 98,
        createdAt: '昨天',
        tags: ['宠物健康', '新手养宠'],
      },
      {
        id: '4',
        user: {
          id: '104',
          name: '宠物摄影师',
          avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
          isVerified: true,
        },
        content: '今天拍摄的宠物写真，太萌了！#萌宠瞬间 #宠物摄影',
        images: [
          'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1600267185393-e158a98703de?auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80',
        ],
        likes: 1254,
        comments: 231,
        shares: 156,
        createdAt: '2天前',
        tags: ['萌宠瞬间', '宠物摄影'],
      },
    ] as any;

    const mockTopics = [
      { id: 't1', name: '宠物训练', posts: 12560, followers: 8975 },
      { id: 't2', name: '宠物美食', posts: 9870, followers: 6540 },
      { id: 't3', name: '萌宠瞬间', posts: 23450, followers: 15670 },
      { id: 't4', name: '宠物健康', posts: 8760, followers: 7890 },
      { id: 't5', name: '新手养宠', posts: 11230, followers: 9870 },
      { id: 't6', name: '宠物美容', posts: 6540, followers: 4320 },
      { id: 't7', name: '宠物摄影', posts: 7890, followers: 5670 },
      { id: 't8', name: '宠物用品', posts: 5430, followers: 3450 },
    ] as any;

    const mockTrendingTopics = [
      { id: 'tt1', name: '夏季宠物防暑指南', posts: 3456, trend: '+1200' },
      { id: 'tt2', name: '最适合公寓饲养的小型犬', posts: 2345, trend: '+890' },
      { id: 'tt3', name: '猫咪行为解读', posts: 1890, trend: '+670' },
    ] as any;

    setPosts(mockPosts);
    setTopics(mockTopics);
    setTrendingTopics(mockTrendingTopics);
  };

  // 处理下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      loadCommunityData();
      setRefreshing(false);
    }, 1500);
  };

  // 处理话题点击
  const handleTopicPress = (topicId: string, topicName) => {
    setActiveTab(topicId);
    // 这里可以根据话题筛选帖子
  };

  // 处理帖子点击
  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail', { id: postId });
  };

  // 处理发帖按钮点击
  const handleAddPostPress = () => {
    navigation.navigate('AddPost');
  };

  // 处理搜索
  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('Search', { query: searchText });
      setSearchText('');
    }
  };

  // 处理点赞
  const handleLike = postId => {
    setPosts(
      posts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1, isLiked: !post.isLiked }
          : post,
      ),
    );
  };

  // 处理评论
  const handleComment = postId => {
    navigation.navigate('PostDetail', { id: postId, focusComment: true });
  };

  return (
    <View style={styles.container}>
      {/* 顶部搜索栏 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={16}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索社区内容..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPostPress}
          activeOpacity={0.7}
        >
          <Icon name="pencil" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* 话题导航 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.topicsScrollView}
        contentContainerStyle={styles.topicsScrollViewContent}
      >
        <TouchableOpacity
          style={[
            styles.topicTab,
            activeTab === 'recommend' && styles.activeTopicTab,
          ]}
          onPress={() => setActiveTab('recommend')}
        >
          <Text
            style={[
              styles.topicTabText,
              activeTab === 'recommend' && styles.activeTopicTabText,
            ]}
          >
            推荐
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topicTab,
            activeTab === 'follow' && styles.activeTopicTab,
          ]}
          onPress={() => setActiveTab('follow')}
        >
          <Text
            style={[
              styles.topicTabText,
              activeTab === 'follow' && styles.activeTopicTabText,
            ]}
          >
            关注
          </Text>
        </TouchableOpacity>
        {topics.slice(0, 8).map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={[
              styles.topicTab,
              activeTab === topic.id && styles.activeTopicTab,
            ]}
            onPress={() => handleTopicPress(topic.id, topic.name)}
          >
            <Text
              style={[
                styles.topicTabText,
                activeTab === topic.id && styles.activeTopicTabText,
              ]}
            >
              #{topic.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 内容区域 */}
      <ScrollView
        style={styles.contentScrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF6B6B']}
            tintColor="#FF6B6B"
          />
        }
      >
        {/* 热门话题卡片 */}
        <View style={styles.trendingTopicsCard}>
          <View style={styles.trendingTopicsHeader}>
            <Text style={styles.trendingTopicsTitle}>热门话题</Text>
            <TouchableOpacity>
              <Text style={styles.trendingTopicsMore}>更多</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trendingTopicsList}>
            {trendingTopics.map((topic, index) => (
              <View key={topic.id} style={styles.trendingTopicItem}>
                <View style={styles.trendingTopicRank}>
                  <Text
                    style={[
                      styles.trendingTopicRankText,
                      index < 3 && styles.topRankText,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.trendingTopicContent}>
                  <Text style={styles.trendingTopicName} numberOfLines={1}>
                    #{topic.name}
                  </Text>
                  <View style={styles.trendingTopicStats}>
                    <Text style={styles.trendingTopicPosts}>
                      {topic.posts} 帖子
                    </Text>
                    <View style={styles.trendingTopicTrend}>
                      <Icon name="arrow-up" size={10} color="#FF6B6B" />
                      <Text style={styles.trendingTopicTrendText}>
                        {topic.trend}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 帖子列表 */}
        <View style={styles.postsContainer}>
          {posts.map(post => (
            <TouchableOpacity
              key={post.id}
              style={styles.postItem}
              onPress={() => handlePostPress(post.id)}
              activeOpacity={0.9}
            >
              {/* 帖子头部 */}
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: post.user.avatar }}
                  style={styles.userAvatar}
                />
                <View style={styles.userInfo}>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>{post.user.name}</Text>
                    {post.user.isVerified && (
                      <Icon
                        name="checkmark-circle"
                        size={14}
                        color="#4285F4"
                        style={styles.verifiedIcon}
                      />
                    )}
                  </View>
                  <Text style={styles.postTime}>{post.createdAt}</Text>
                </View>
                <TouchableOpacity style={styles.postMoreButton}>
                  <Icon name="ellipsis-vertical" size={16} color="#999" />
                </TouchableOpacity>
              </View>

              {/* 帖子内容 */}
              <Text style={styles.postContent}>{post.content}</Text>

              {/* 帖子标签 */}
              {post.tags && post.tags.length > 0 && (
                <View style={styles.postTags}>
                  {post.tags.map((tag, index) => (
                    <View key={index} style={styles.postTag}>
                      <Text style={styles.postTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* 帖子图片 */}
              {post.images && post.images.length > 0 && (
                <View
                  style={[
                    styles.postImages,
                    post.images.length === 1
                      ? styles.singleImageContainer
                      : null,
                  ]}
                >
                  {post.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={[
                        styles.postImage,
                        post.images.length === 1 ? styles.singleImage : null,
                      ]}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}

              {/* 帖子底部操作 */}
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.postAction}
                  onPress={() => handleLike(post.id)}
                >
                  <Icon
                    name={post.isLiked ? 'heart' : 'heart-outline'}
                    size={18}
                    color={post.isLiked ? '#FF6B6B' : '#999'}
                  />
                  <Text
                    style={[
                      styles.postActionText,
                      post.isLiked && styles.likedActionText,
                    ]}
                  >
                    {post.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postAction}
                  onPress={() => handleComment(post.id)}
                >
                  <Icon name="chatbubble-outline" size={18} color="#999" />
                  <Text style={styles.postActionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Icon name="share-outline" size={18} color="#999" />
                  <Text style={styles.postActionText}>{post.shares}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Icon name="bookmark-outline" size={18} color="#999" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 底部空间 */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  addButton: {
    marginLeft: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicsScrollView: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  topicsScrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topicTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
  },
  activeTopicTab: {
    backgroundColor: '#FFF0F0',
  },
  topicTabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTopicTabText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  contentScrollView: {
    flex: 1,
  },
  trendingTopicsCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  trendingTopicsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendingTopicsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trendingTopicsMore: {
    fontSize: 14,
    color: '#999',
  },
  trendingTopicsList: {
    marginBottom: 8,
  },
  trendingTopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  trendingTopicRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trendingTopicRankText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  topRankText: {
    color: '#FF6B6B',
  },
  trendingTopicContent: {
    flex: 1,
  },
  trendingTopicName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  trendingTopicStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingTopicPosts: {
    fontSize: 12,
    color: '#999',
    marginRight: 12,
  },
  trendingTopicTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingTopicTrendText: {
    fontSize: 12,
    color: '#FF6B6B',
    marginLeft: 4,
  },
  postsContainer: {
    marginTop: 12,
  },
  postItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  postTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  postMoreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  postTag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  postTagText: {
    fontSize: 12,
    color: '#666',
  },
  postImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  singleImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '49%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  singleImage: {
    width: '100%',
    height: 250,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 4,
  },
  postActionText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  likedActionText: {
    color: '#FF6B6B',
  },
  bottomSpace: {
    height: 80,
  },
});

export default CommunityScreen;
