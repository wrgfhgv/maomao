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
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShoppingScreen = () => {
  // 定义类型
  interface Category {
    id: string;
    name: string;
    icon: string;
  }

  interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    sales?: number;
    category?: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    badge?: string;
  }

  // 初始化状态
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartCount, setCartCount] = useState(3); // 模拟购物车商品数量
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  // 模拟加载商城数据
  useEffect(() => {
    loadShoppingData();
  }, []);

  const loadShoppingData = () => {
    // 模拟从API获取数据
    const mockCategories = [
      { id: 'all', name: '全部', icon: 'grid-outline' },
      { id: 'food', name: '食品', icon: 'fast-food-outline' },
      { id: 'toy', name: '玩具', icon: 'game-controller-outline' },
      { id: 'bed', name: '窝垫', icon: 'bed-outline' },
      { id: 'clothes', name: '服饰', icon: 'shirt-outline' },
      { id: 'clean', name: '清洁', icon: 'trash-outline' },
      { id: 'health', name: '医疗', icon: 'medkit-outline' },
      { id: 'accessories', name: '配件', icon: 'cube-outline' },
    ];

    const mockProducts = [
      {
        id: '1',
        name: '宠物天然粮 成犬专用',
        price: 198,
        originalPrice: 258,
        discount: '7.7折',
        image:
          'https://images.unsplash.com/photo-1608813908385-42a59b14b326?auto=format&fit=crop&q=80',
        sales: 1245,
        category: 'food',
        brand: '宠粮世家',
        rating: 4.8,
        reviewCount: 567,
      },
      {
        id: '2',
        name: '宠物智能喂食器',
        price: 349,
        originalPrice: 499,
        discount: '7折',
        image:
          'https://images.unsplash.com/photo-1619566636908-c391a72f0e99?auto=format&fit=crop&q=80',
        sales: 876,
        category: 'accessories',
        brand: '智能宠物',
        rating: 4.7,
        reviewCount: 342,
      },
      {
        id: '3',
        name: '宠物玩具套装',
        price: 89,
        originalPrice: 129,
        discount: '6.9折',
        image:
          'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80',
        sales: 2345,
        category: 'toy',
        brand: '宠物乐园',
        rating: 4.9,
        reviewCount: 789,
      },
      {
        id: '4',
        name: '宠物窝垫四季通用',
        price: 129,
        originalPrice: 199,
        discount: '6.5折',
        image:
          'https://images.unsplash.com/photo-1576356637111-1704eb180a2f?auto=format&fit=crop&q=80',
        sales: 1567,
        category: 'bed',
        brand: '舒适窝',
        rating: 4.6,
        reviewCount: 456,
      },
      {
        id: '5',
        name: '宠物牵引绳套装',
        price: 79,
        originalPrice: 119,
        discount: '6.6折',
        image:
          'https://images.unsplash.com/photo-1616486338794-71f744d7b578?auto=format&fit=crop&q=80',
        sales: 3245,
        category: 'accessories',
        brand: '安全遛狗',
        rating: 4.8,
        reviewCount: 987,
      },
      {
        id: '6',
        name: '宠物香波沐浴露',
        price: 59,
        originalPrice: 89,
        discount: '6.6折',
        image:
          'https://images.unsplash.com/photo-1527443038235-d3b416303d12?auto=format&fit=crop&q=80',
        sales: 2134,
        category: 'clean',
        brand: '宠物洗护',
        rating: 4.7,
        reviewCount: 678,
      },
    ];

    const mockRecommendedProducts = [
      {
        id: '101',
        name: '宠物营养膏',
        price: 69,
        image:
          'https://images.unsplash.com/photo-1580814130992-e762e26a335b?auto=format&fit=crop&q=80',
        badge: '新品',
      },
      {
        id: '102',
        name: '宠物指甲剪',
        price: 39,
        image:
          'https://images.unsplash.com/photo-1596462502278-21ad3705767b?auto=format&fit=crop&q=80',
        badge: '热销',
      },
      {
        id: '103',
        name: '宠物航空箱',
        price: 199,
        image:
          'https://images.unsplash.com/photo-1614436163996-181623de25d5?auto=format&fit=crop&q=80',
        badge: '特惠',
      },
    ];

    setCategories(mockCategories);
    setProducts(mockProducts);
    setRecommendedProducts(mockRecommendedProducts);
  };

  // 处理下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      loadShoppingData();
      setRefreshing(false);
    }, 1500);
  };

  // 处理分类切换
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // 这里可以根据分类筛选商品
  };

  // 处理商品点击
  const handleProductPress = (productId: string) => {
    // 暂时使用控制台输出来代替导航，避免类型错误
    console.log('点击商品:', productId);
  };

  // 处理搜索
  const handleSearch = () => {
    if (searchText.trim()) {
      // 暂时使用控制台输出代替导航，因为SearchScreen在AppNavigator中不存在
      console.log('搜索内容:', searchText);
    }
  };

  // 处理购物车点击
  const handleCartPress = () => {
    // 这里可以导航到购物车页面
    console.log('购物车点击');
  };

  // 处理筛选按钮点击
  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  // 处理加入购物车
  const handleAddToCart = (productId: string, event: any) => {
    event.stopPropagation(); // 阻止事件冒泡
    setCartCount(prevCount => prevCount + 1);
    // 这里可以实现添加到购物车的逻辑
  };

  // 渲染商品项
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.productPriceContainer}>
        <Text style={styles.productPrice}>¥{item.price}</Text>
        <Text style={styles.productOriginalPrice}>¥{item.originalPrice}</Text>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.productRating}>
          <Icon name="star" size={12} color="#FFD700" />
          <Text style={styles.productRatingText}>{item.rating}</Text>
          <Text style={styles.productReviewCount}>({item.reviewCount})</Text>
        </View>
        <Text style={styles.productSales}>销量 {item.sales}</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={e => handleAddToCart(item.id, e)}
        activeOpacity={0.7}
      >
        <Icon name="add" size={14} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // 渲染推荐商品项
  const renderRecommendedItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.recommendedItem}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.recommendedImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.recommendedImage}
          resizeMode="cover"
        />
        {item.badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.recommendedName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.recommendedPrice}>¥{item.price}</Text>
    </TouchableOpacity>
  );

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
            placeholder="搜索宠物用品..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleCartPress}
          activeOpacity={0.7}
        >
          <Icon name="cart-outline" size={22} color="#333" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 分类导航 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
        contentContainerStyle={styles.categoriesScrollViewContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              activeCategory === category.id && styles.activeCategoryItem,
            ]}
            onPress={() => handleCategoryChange(category.id)}
          >
            <Icon
              name={category.icon}
              size={20}
              color={activeCategory === category.id ? '#FF6B6B' : '#666'}
            />
            <Text
              style={[
                styles.categoryName,
                activeCategory === category.id && styles.activeCategoryName,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 排序和筛选 */}
      <View style={styles.sortFilterContainer}>
        <View style={styles.sortOptions}>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={[styles.sortOptionText, styles.activeSortOptionText]}>
              综合
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={styles.sortOptionText}>销量</Text>
            <Icon
              name="chevron-down"
              size={12}
              color="#999"
              style={styles.sortIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={styles.sortOptionText}>价格</Text>
            <Icon
              name="chevron-down"
              size={12}
              color="#999"
              style={styles.sortIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={styles.sortOptionText}>新品</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Icon name="filter" size={16} color="#666" />
          <Text style={styles.filterButtonText}>筛选</Text>
        </TouchableOpacity>
      </View>

      {/* 筛选弹窗 - 简化版 */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>筛选</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.filtersClose}>关闭</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filtersContent}>
            <Text style={styles.filterSectionTitle}>品牌</Text>
            <View style={styles.filterOptions}>
              {['全部', '宠粮世家', '智能宠物', '宠物乐园', '舒适窝'].map(
                brand => (
                  <TouchableOpacity key={brand} style={styles.filterOption}>
                    <View style={styles.filterCheckbox}>
                      {brand === '全部' && (
                        <View style={styles.filterCheckboxInner} />
                      )}
                    </View>
                    <Text style={styles.filterOptionText}>{brand}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            <Text style={styles.filterSectionTitle}>价格区间</Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text
                  style={[styles.priceRangeText, styles.activePriceRangeText]}
                >
                  全部
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={styles.priceRangeText}>0-100元</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={styles.priceRangeText}>100-300元</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={styles.priceRangeText}>300元以上</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>确定</Text>
          </TouchableOpacity>
        </View>
      )}

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
        {/* 限时特惠 */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1628746404106-4d3843b231b3?auto=format&fit=crop&q=80',
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>限时特惠</Text>
            <Text style={styles.bannerSubtitle}>全场宠物用品低至5折</Text>
            <View style={styles.bannerCountdown}>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>23</Text>
                <Text style={styles.countdownLabel}>小时</Text>
              </View>
              <Text style={styles.countdownColon}>:</Text>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>45</Text>
                <Text style={styles.countdownLabel}>分钟</Text>
              </View>
              <Text style={styles.countdownColon}>:</Text>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>36</Text>
                <Text style={styles.countdownLabel}>秒</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 推荐商品 */}
        <View style={styles.recommendedContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>为你推荐</Text>
            <TouchableOpacity>
              <Text style={styles.sectionMore}>更多</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedProducts}
            renderItem={renderRecommendedItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}
          />
        </View>

        {/* 商品列表 */}
        <View style={styles.productsContainer}>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productsRow}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
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
  cartButton: {
    marginLeft: 16,
    padding: 4,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesScrollView: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  categoriesScrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  activeCategoryItem: {
    // 激活状态的样式
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeCategoryName: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  sortFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sortOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666',
  },
  activeSortOptionText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  sortIcon: {
    marginLeft: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  filtersContainer: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 100,
    elevation: 5,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  filtersClose: {
    fontSize: 14,
    color: '#999',
  },
  filtersContent: {
    padding: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    marginBottom: 12,
  },
  filterCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCheckboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 1,
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceRangeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 16,
    marginRight: 12,
    marginBottom: 12,
  },
  priceRangeText: {
    fontSize: 14,
    color: '#666',
  },
  activePriceRangeText: {
    color: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  applyButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentScrollView: {
    flex: 1,
  },
  bannerContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    position: 'relative',
    height: 150,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bannerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerCountdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  countdownItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  countdownNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdownLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
  },
  countdownColon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  recommendedContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  recommendedList: {
    paddingBottom: 8,
  },
  recommendedItem: {
    width: 100,
    marginRight: 16,
  },
  recommendedImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  recommendedImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recommendedName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  recommendedPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  productsContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    position: 'relative',
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
    lineHeight: 16,
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  productOriginalPrice: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRatingText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  productReviewCount: {
    fontSize: 10,
    color: '#999',
    marginLeft: 2,
  },
  productSales: {
    fontSize: 10,
    color: '#999',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpace: {
    height: 80,
  },
});

export default ShoppingScreen;
