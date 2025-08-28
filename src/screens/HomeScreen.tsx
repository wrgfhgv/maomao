import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const COLUMN_GAP = 8;
const ITEM_WIDTH = (width - 32 - COLUMN_GAP) / COLUMN_COUNT; // 32 = 16 * 2 for container padding
const PAGE_SIZE = 12;

type HomeScreenParamList = {
  PetDetail: any;
  ProductDetail: any;
  Search: any;
  AddPost: any;
  PostDetail: any;
};

// 瀑布流数据项类型
interface WaterfallItem {
  id: string;
  imageUrl: string;
  height: number; // 图片高度，用于瀑布流布局
  title?: string;
  type: 'post';
  likes?: number;
  comments?: number;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeScreenParamList>>();
  const [data, setData] = useState<WaterfallItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const columnHeights = useRef<number[]>([0, 0]);

  // 生成随机高度的模拟数据
  const generateMockData = (
    pageNum: number,
    pageSize: number = PAGE_SIZE,
  ): WaterfallItem[] => {
    const newData: WaterfallItem[] = [];
    const startId = (pageNum - 1) * pageSize + 1;

    // 宠物相关图片
    const petImages = [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80',
    ];

    // 宠物产品图片
    const productImages = [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80',
    ];

    // 帖子相关图片
    const postImages = [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80',
    ];

    for (let i = 0; i < pageSize; i++) {
      const id = `${startId + i}`;
      const randomType = Math.random();
      let type = 'post' as const;
      let imageUrl: string;

      if (randomType < 0.6) {
        imageUrl = petImages[Math.floor(Math.random() * petImages.length)];
      } else if (randomType < 0.8) {
        imageUrl =
          productImages[Math.floor(Math.random() * productImages.length)];
      } else {
        imageUrl = postImages[Math.floor(Math.random() * postImages.length)];
      }

      // 生成1.2到2倍宽度的随机高度，使瀑布流效果更好
      const aspectRatio = 1.2 + Math.random() * 0.8;
      const height = Math.floor(ITEM_WIDTH * aspectRatio);

      newData.push({
        id,
        imageUrl,
        height,
        title: '宠物动态',
        type,
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
      });
    }

    return newData;
  };

  // 加载初始数据
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(() => resolve(''), 300));
      const initialData = generateMockData(1, PAGE_SIZE); // 初始加载12条数据
      setData(initialData);
      // 重置列高度
      columnHeights.current = [0, 0];
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 加载更多数据
  const loadMoreData = async () => {
    if (isLoading || !hasMore || isRefreshing) return;

    setIsLoading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(() => resolve(''), 1000));

      // 模拟分页数据，最多加载5页
      if (page >= 5) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      const newPage = page + 1;
      const newData = generateMockData(newPage);
      setData(prevData => [...prevData, ...newData]);
      setPage(newPage);
    } catch (error) {
      console.error('Failed to load more data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 下拉刷新
  const handleRefresh = async () => {
    if (isLoading) return;

    setIsRefreshing(true);
    try {
      await loadInitialData();
      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 处理项目点击
  const handleItemPress = (item: WaterfallItem) => {
    if (item.type === 'post') {
      // 导航到帖子详情页
      navigation.navigate('PostDetail', {
        id: item.id,
        type: item.type,
        imageUrl: item.imageUrl,
        title: item.title,
      });
    }
  };

  // 处理搜索按钮点击
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  // 处理发布按钮点击
  const handlePostPress = () => {
    navigation.navigate('AddPost');
  };

  // 渲染瀑布流项
  const renderWaterfallItem = (item: WaterfallItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.item, { height: item.height }]}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={[styles.itemImage, { height: item.height }]}
          resizeMode="cover"
        />
        <View style={styles.itemOverlay}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
            {item.id}
          </Text>
          <View style={styles.itemActions}>
            <View style={styles.actionItem}>
              <Icon name="heart-outline" size={14} color="white" />
              <Text style={styles.actionText}>{item.likes}</Text>
            </View>
            <View style={styles.actionItem}>
              <Icon name="chatbubble-outline" size={14} color="white" />
              <Text style={styles.actionText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // 渲染列表
  const renderList = () => {
    // 使用最短列分配算法
    const columnsData: WaterfallItem[][] = Array.from(
      { length: COLUMN_COUNT },
      () => [],
    );

    // 重置列高度跟踪
    const currentColumnHeights = [...columnHeights.current];

    data.forEach(item => {
      // 找到当前高度最短的列
      let minHeight = currentColumnHeights[0];
      let minHeightColumnIndex = 0;

      for (let i = 1; i < COLUMN_COUNT; i++) {
        if (currentColumnHeights[i] < minHeight) {
          minHeight = currentColumnHeights[i];
          minHeightColumnIndex = i;
        }
      }

      // 将item添加到最短的列
      columnsData[minHeightColumnIndex].push(item);
      // 更新该列的高度
      currentColumnHeights[minHeightColumnIndex] += item.height + 8; // 8是item的marginBottom
    });

    return (
      <View style={styles.listWrapper}>
        {/* 瀑布流容器 - 只包含两列内容 */}
        <View style={styles.waterfallContainer}>
          {columnsData.map((columnData, columnIndex) => (
            <View style={styles.column} key={`column-${columnIndex}`}>
              {columnData.map(item => renderWaterfallItem(item))}
            </View>
          ))}
        </View>

        {/* 加载状态 - 移到瀑布流容器外部 */}
        {isLoading && hasMore && (
          <View key="loading" style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF6B6B" />
            <Text style={styles.loadingText}>加载中...</Text>
          </View>
        )}

        {/* 没有更多内容提示 - 移到瀑布流容器外部 */}
        {!hasMore && data.length > 0 && (
          <View key="no-more" style={styles.noMoreContainer}>
            <Text style={styles.noMoreText}>没有更多内容了</Text>
          </View>
        )}
      </View>
    );
  };

  // 初始化加载数据
  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部搜索栏 */}
      <View style={styles.header}>
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
          <Text style={styles.searchText}>搜索宠物、商品、话题...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handlePostPress}>
          <Icon name="pencil-outline" size={14} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* 内容区域 - 瀑布流 */}
      {isLoading && data.length === 0 ? (
        <View style={styles.loadingInitialContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingInitialText}>正在加载图片...</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={[{ key: 'content' }]} // 只需要一个项来触发渲染
          renderItem={renderList}
          keyExtractor={item => item.key}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.4}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
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
  postButton: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
  },
  listWrapper: {
    width: '100%',
  },
  waterfallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: ITEM_WIDTH,
  },
  item: {
    width: ITEM_WIDTH,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
  },
  itemImage: {
    width: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 10,
    marginLeft: 2,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  noMoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  noMoreText: {
    fontSize: 14,
    color: '#999',
  },
  loadingInitialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingInitialText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
});

export default HomeScreen;
