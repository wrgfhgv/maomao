import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  // Dimensions,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// const { width } = Dimensions.get('window');

type HomeScreenParamList = {
  Knowledge: any;
  PetDetail: any;
  ProductDetail: any;
  Shopping: any;
  Search: any;
  Community: any;
  PetMarket: any;
  StrayMap: any;
  AddPost: any;
  PostDetail: any;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeScreenParamList>>();
  const [activeTab, setActiveTab] = useState('recommend');

  // 模拟热门推荐数据
  const hotRecommendations = [
    {
      id: '1',
      title: '宠物营养均衡指南',
      image:
        'https://images.unsplash.com/photo-1537516156937-3a6b6ecfb385?auto=format&fit=crop&q=80',
      views: 2354,
      type: 'article',
    },
    {
      id: '2',
      title: '超萌柯基宝宝找新家',
      image:
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80',
      views: 1876,
      type: 'pet',
    },
    {
      id: '3',
      title: '宠物智能喂食器特惠',
      image:
        'https://images.unsplash.com/photo-1608813908385-42a59b14b326?auto=format&fit=crop&q=80',
      views: 1245,
      type: 'product',
    },
  ] as any;

  // 模拟最新动态数据
  const latestPosts = [
    {
      id: '101',
      user: {
        name: '宠物达人',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content:
        '今天带狗狗去公园玩，它超开心！分享一些狗狗户外活动的注意事项...',
      image:
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80',
      likes: 342,
      comments: 56,
    },
    {
      id: '102',
      user: {
        name: '猫咪爱好者',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      content: '我家猫咪最近学会了新技能，太可爱了！#猫咪训练',
      image:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
      likes: 289,
      comments: 42,
    },
    {
      id: '103',
      user: {
        name: '宠物医师',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      },
      content: '季节交替，宠物容易生病，这些预防措施一定要做好！#宠物健康',
      image:
        'https://images.unsplash.com/photo-1586672801549-91f10d1c4b1b?auto=format&fit=crop&q=80',
      likes: 432,
      comments: 78,
    },
  ] as any;

  // 模拟热门话题数据
  const hotTopics = [
    { id: '201', name: '宠物训练', posts: 1256 },
    { id: '202', name: '宠物美食', posts: 987 },
    { id: '203', name: '萌宠瞬间', posts: 2345 },
    { id: '204', name: '宠物健康', posts: 876 },
    { id: '205', name: '新手养宠', posts: 1123 },
  ];

  // 处理推荐项点击
  const handleRecommendationPress = (item: any) => {
    if (item.type === 'article') {
      navigation.navigate('Knowledge', { id: item.id });
    } else if (item.type === 'pet') {
      navigation.navigate('PetDetail', { id: item.id });
    } else if (item.type === 'product') {
      navigation.navigate('ProductDetail', { id: item.id });
    }
  };

  // 处理动态点击
  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail', { id: postId });
  };

  // 处理搜索按钮点击
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      {/* 顶部搜索栏 */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Icon
            name="search"
            size={16}
            color="#999"
            style={styles.searchIcon}
          />
          <Text style={styles.searchText}>搜索宠物知识、商品、话题...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <Icon name="bell-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* 轮播图 */}
        <View style={styles.carouselContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&q=80',
            }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
          <View style={styles.carouselTextContainer}>
            <Text style={styles.carouselTitle}>宠物嘉年华活动开始啦！</Text>
            <Text style={styles.carouselSubtitle}>参与活动赢取丰厚奖品</Text>
          </View>
          <View style={styles.carouselIndicators}>
            {[0, 1, 2].map(index => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === 0 && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 功能入口 */}
        <View style={styles.featuresContainer}>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate('Community')}
          >
            <View style={[styles.featureIcon, styles.communityIcon]}>
              <Icon name="people" size={24} color="#FF6B6B" />
            </View>
            <Text style={styles.featureText}>宠物社区</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate('Shopping')}
          >
            <View style={[styles.featureIcon, styles.shoppingIcon]}>
              <Icon name="shopping-bag" size={24} color="#4ECDC4" />
            </View>
            <Text style={styles.featureText}>宠物商城</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate('PetMarket')}
          >
            <View style={[styles.featureIcon, styles.marketIcon]}>
              <Icon name="paw" size={24} color="#FFD166" />
            </View>
            <Text style={styles.featureText}>宠物市场</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate('StrayMap')}
          >
            <View style={[styles.featureIcon, styles.mapIcon]}>
              <Icon name="map" size={24} color="#06D6A0" />
            </View>
            <Text style={styles.featureText}>流浪地图</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate('Knowledge')}
          >
            <View style={[styles.featureIcon, styles.knowledgeIcon]}>
              <Icon name="book" size={24} color="#118AB2" />
            </View>
            <Text style={styles.featureText}>宠物知识</Text>
          </TouchableOpacity>
        </View>

        {/* 热门推荐 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门推荐</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.sectionMore}>查看更多</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recommendationsScrollView}
          >
            {hotRecommendations.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recommendationItem}
                onPress={() => handleRecommendationPress(item)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.recommendationImage}
                  resizeMode="cover"
                />
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={styles.recommendationStats}>
                    <Icon name="eye-outline" size={12} color="#999" />
                    <Text style={styles.recommendationViews}>{item.views}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 社区动态 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>社区动态</Text>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.navigate('AddPost')}
            >
              <Icon name="pencil-outline" size={14} color="#FF6B6B" />
              <Text style={styles.postButtonText}>发布</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScrollView}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'recommend' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('recommend')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'recommend' && styles.activeTabText,
                ]}
              >
                推荐
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'follow' && styles.activeTab]}
              onPress={() => setActiveTab('follow')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'follow' && styles.activeTabText,
                ]}
              >
                关注
              </Text>
            </TouchableOpacity>
            {hotTopics.slice(0, 4).map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={[styles.tab, activeTab === topic.id && styles.activeTab]}
                onPress={() => setActiveTab(topic.id)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === topic.id && styles.activeTabText,
                  ]}
                >
                  #{topic.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 动态列表 */}
          <View style={styles.postsContainer}>
            {latestPosts.map((post: any) => (
              <TouchableOpacity
                key={post.id}
                style={styles.postItem}
                onPress={() => handlePostPress(post.id)}
                activeOpacity={0.9}
              >
                <View style={styles.postHeader}>
                  <Image
                    source={{ uri: post.user.avatar }}
                    style={styles.userAvatar}
                  />
                  <Text style={styles.userName}>{post.user.name}</Text>
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
                <View style={styles.postFooter}>
                  <View style={styles.postAction}>
                    <Icon name="heart-outline" size={18} color="#999" />
                    <Text style={styles.postActionText}>{post.likes}</Text>
                  </View>
                  <View style={styles.postAction}>
                    <Icon name="chatbubble-outline" size={18} color="#999" />
                    <Text style={styles.postActionText}>{post.comments}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 热门话题 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门话题</Text>
          </View>
          <View style={styles.topicsContainer}>
            {hotTopics.map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={styles.topicItem}
                activeOpacity={0.8}
              >
                <View style={styles.topicContent}>
                  <Text style={styles.topicName}>#{topic.name}</Text>
                  <Text style={styles.topicPosts}>{topic.posts} 帖子</Text>
                </View>
                <Icon name="chevron-right" size={16} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 10,
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
  searchText: {
    color: '#999',
    fontSize: 14,
  },
  notificationButton: {
    marginLeft: 16,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  carouselTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  carouselSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
    width: 18,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  featureItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityIcon: {
    backgroundColor: '#FFEEEE',
  },
  shoppingIcon: {
    backgroundColor: '#EEFFFF',
  },
  marketIcon: {
    backgroundColor: '#FFFFEE',
  },
  mapIcon: {
    backgroundColor: '#EEFFEE',
  },
  knowledgeIcon: {
    backgroundColor: '#EEF7FF',
  },
  featureText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionMore: {
    fontSize: 14,
    color: '#999',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
  },
  postButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 4,
  },
  recommendationsScrollView: {
    paddingLeft: 16,
    paddingBottom: 16,
  },
  recommendationItem: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: 100,
  },
  recommendationContent: {
    padding: 12,
  },
  recommendationTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  recommendationStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationViews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  tabsScrollView: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#FFF0F0',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  postsContainer: {
    paddingTop: 12,
  },
  postItem: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postActionText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  topicsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicName: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  topicPosts: {
    fontSize: 12,
    color: '#999',
  },
  bottomSpace: {
    height: 80,
  },
});

export default HomeScreen;
