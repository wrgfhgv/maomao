import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 定义路由参数类型
interface ProductDetailRouteParams {
  productId: string;
}

// 模拟商品数据
const mockProduct = {
  id: 'p001',
  name: '皇家猫粮幼猫配方粮 4-12月小猫营养主粮',
  price: 199.99,
  originalPrice: 249.99,
  discount: '8.0折',
  sales: 1234,
  stock: 567,
  brand: '皇家',
  category: '宠物食品',
  tags: ['幼猫适用', '营养均衡', '增强免疫力'],
  images: [
    'https://images.unsplash.com/photo-1584374935795-4d1e7a78e049?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621656634229-94a5d994f74b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1627440612022-33696cfb26f7?auto=format&fit=crop&q=80'
  ],
  description: '皇家幼猫粮专为4-12个月小猫设计，富含蛋白质和多种营养素，促进幼猫健康成长。添加DHA和牛磺酸，支持大脑和视力发育。特别添加益生元，帮助维持肠道健康。',
  specifications: [
    { name: '适用阶段', value: '4-12个月幼猫' },
    { name: '净含量', value: '2kg' },
    { name: '保质期', value: '18个月' },
    { name: '产地', value: '中国' },
    { name: '主要成分', value: '鸡肉粉、玉米、小麦、动物脂肪、玉米蛋白粉等' }
  ],
  details: '皇家幼猫粮采用科学配方，满足幼猫快速生长期的营养需求。每公斤猫粮含有4200千卡能量，蛋白质含量高达36%，脂肪含量20%，确保幼猫获得足够的能量和营养。同时添加了丰富的维生素和矿物质，帮助增强幼猫的免疫力，减少疾病发生。\n\n特别添加的DHA和牛磺酸，对幼猫的大脑和视力发育至关重要。益生元配方则有助于维持肠道菌群平衡，促进消化吸收，减少软便和便秘问题。\n\n喂食建议：根据幼猫的年龄、体重和活动量调整喂食量。4-6个月的幼猫，每日喂食量约为体重的5%-8%；6-12个月的幼猫，每日喂食量约为体重的3%-5%。确保幼猫随时能喝到清洁的水。',
  shop: {
    id: 's001',
    name: '宠物用品专营店',
    rating: 4.8,
    sales: 12345,
    logo: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80',
    location: '上海'
  }
};

// 模拟用户评价数据
const mockReviews = [
  {
    id: 'r001',
    user: {
      name: '猫咪爱好者',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
      level: 'Lv.3'
    },
    rating: 5,
    content: '我家小猫很喜欢吃这款猫粮，吃了之后毛发更亮了，也更有活力了。卖家包装很好，物流也很快，会继续回购的。',
    images: [
      'https://images.unsplash.com/photo-1586977956793-5e3115478296?auto=format&fit=crop&q=80'
    ],
    date: '2024-03-25',
    reply: '感谢您的好评，我们会继续为您提供优质的产品和服务！'
  },
  {
    id: 'r002',
    user: {
      name: '铲屎官小王',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      level: 'Lv.2'
    },
    rating: 4,
    content: '猫粮颗粒大小适中，小猫吃起来很方便。闻起来很香，没有异味。不过感觉有点油，希望改进一下。',
    images: [],
    date: '2024-03-24',
    reply: '感谢您的评价和建议，我们会反馈给品牌方的！'
  },
  {
    id: 'r003',
    user: {
      name: '爱猫如命',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      level: 'Lv.4'
    },
    rating: 5,
    content: '第三次购买了，我家猫咪一直吃这个牌子的猫粮，身体很健康，也很少生病。客服态度很好，有问题都会耐心解答。',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80'
    ],
    date: '2024-03-20',
    reply: null
  }
];

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ ProductDetail: ProductDetailRouteParams }>>();
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('detail'); // detail, params, reviews

  // 加载商品数据
  useEffect(() => {
    loadProductDetail();
    loadReviews();
  }, []);

  // 模拟加载商品详情
  const loadProductDetail = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      setProduct(mockProduct);
    } catch (error) {
      console.error('加载商品详情失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 模拟加载用户评价
  const loadReviews = async () => {
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 600));
      setReviews(mockReviews);
    } catch (error) {
      console.error('加载用户评价失败:', error);
    }
  };

  // 处理数量变化
  const handleQuantityChange = (change) => {
    if (change === 'increase') {
      if (quantity < (product?.stock || 999)) {
        setQuantity(prev => prev + 1);
      } else {
        Alert.alert('提示', '已达到最大购买数量');
      }
    } else if (change === 'decrease') {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
      }
    }
  };

  // 处理加入购物车
  const handleAddToCart = () => {
    Alert.alert('成功', `已将${quantity}件商品加入购物车`);
  };

  // 处理立即购买
  const handleBuyNow = () => {
    // 这里可以导航到订单确认页面
    console.log('立即购买:', productId, quantity);
    Alert.alert('提示', '即将跳转到订单确认页面');
  };

  // 处理收藏
  const handleFavorite = () => {
    Alert.alert('成功', '已收藏该商品');
  };

  // 处理分享
  const handleShare = () => {
    Alert.alert('提示', '分享功能开发中');
  };

  // 渲染评分星星
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i < rating ? 'star' : 'star-outline'}
          size={16}
          color={i < rating ? '#FFD700' : '#CCCCCC'}
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  // 渲染图片轮播指示器
  const renderImageIndicators = () => {
    if (!product?.images?.length) return null;
    
    return (
      <View style={styles.imageIndicators}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.imageIndicator,
              selectedImageIndex === index && styles.selectedImageIndicator
            ]}
          />
        ))}
      </View>
    );
  };

  if (isLoading || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={18} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>商品详情</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Icon name="share-social-outline" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
            <Icon name="heart-outline" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 商品图片轮播 */}
      <View style={styles.imageCarouselContainer}>
        <FlatList
          data={product.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `image-${index}`}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setSelectedImageIndex(slideIndex);
          }}
          renderItem={({ item }) => (
            <Image 
              source={{ uri: item }} 
              style={styles.productImage} 
              resizeMode="contain"
            />
          )}
        />
        {renderImageIndicators()}
      </View>

      {/* 商品信息 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 商品价格和标题 */}
        <View style={styles.productInfoContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.discountText}>{product.discount}</Text>
            <Text style={styles.priceText}>¥{product.price.toFixed(2)}</Text>
            <Text style={styles.originalPriceText}>¥{product.originalPrice.toFixed(2)}</Text>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productTags}>
            {product.tags.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.productStats}>
            <Text style={styles.statText}>销量 {product.sales}</Text>
            <Text style={styles.statDivider}>|</Text>
            <Text style={styles.statText}>库存 {product.stock}</Text>
            <Text style={styles.statDivider}>|</Text>
            <Text style={styles.statText}>品牌 {product.brand}</Text>
          </View>
        </View>

        {/* 商家信息 */}
        <View style={styles.shopInfoContainer}>
          <TouchableOpacity style={styles.shopInfo}>
            <Image source={{ uri: product.shop.logo }} style={styles.shopLogo} />
            <View style={styles.shopDetails}>
              <Text style={styles.shopName}>{product.shop.name}</Text>
              <View style={styles.shopRating}>
                {renderRatingStars(product.shop.rating)}
                <Text style={styles.shopRatingText}>{product.shop.rating}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 商品选项卡 */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'detail' && styles.activeTabItem]}
            onPress={() => setActiveTab('detail')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'detail' && styles.activeTabText]}
            >
              商品详情
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'params' && styles.activeTabItem]}
            onPress={() => setActiveTab('params')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'params' && styles.activeTabText]}
            >
              规格参数
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'reviews' && styles.activeTabItem]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}
            >
              用户评价({reviews.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* 选项卡内容 */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'detail' && (
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>产品介绍</Text>
              <Text style={styles.detailDescription}>{product.description}</Text>
              <Text style={styles.detailTitle}>详细说明</Text>
              <Text style={styles.detailText}>{product.details}</Text>
              {/* 详情图片可以在这里添加 */}
            </View>
          )}
          
          {activeTab === 'params' && (
            <View style={styles.paramsContent}>
              {product.specifications.map((spec, index) => (
                <View key={index} style={styles.specItem}>
                  <Text style={styles.specName}>{spec.name}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'reviews' && (
            <View style={styles.reviewsContent}>
              <View style={styles.reviewsSummary}>
                <Text style={styles.reviewsSummaryTitle}>用户评价</Text>
                <Text style={styles.reviewsSummaryCount}>({reviews.length}条)</Text>
              </View>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Image source={{ uri: review.user.avatar }} style={styles.reviewUserAvatar} />
                    <View style={styles.reviewUserInfo}>
                      <Text style={styles.reviewUserName}>{review.user.name}</Text>
                      <Text style={styles.reviewUserLevel}>{review.user.level}</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      {renderRatingStars(review.rating)}
                    </View>
                  </View>
                  <Text style={styles.reviewContent}>{review.content}</Text>
                  {review.images.length > 0 && (
                    <View style={styles.reviewImages}>
                      {review.images.map((image, index) => (
                        <Image key={index} source={{ uri: image }} style={styles.reviewImage} />
                      ))}
                    </View>
                  )}
                  <Text style={styles.reviewDate}>{review.date}</Text>
                  {review.reply && (
                    <View style={styles.reviewReply}>
                      <Text style={styles.reviewReplyLabel}>商家回复：</Text>
                      <Text style={styles.reviewReplyContent}>{review.reply}</Text>
                    </View>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.viewAllReviewsButton}>
                <Text style={styles.viewAllReviewsText}>查看全部评价</Text>
                <Icon name="chevron-right" size={14} color="#999" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 底部空间，确保内容不被遮挡 */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 底部操作栏 */}
      <View style={styles.bottomActionBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => handleQuantityChange('decrease')}
            disabled={quantity <= 1}
          >
            <Icon name="minus" size={12} color={quantity <= 1 ? '#CCC' : '#333'} />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            onChangeText={(text) => {
              const num = parseInt(text);
              if (!isNaN(num) && num > 0 && num <= (product.stock || 999)) {
                setQuantity(num);
              }
            }}
            keyboardType="number-pad"
          />
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => handleQuantityChange('increase')}
          >
            <Icon name="plus" size={12} color={quantity >= (product.stock || 999) ? '#CCC' : '#333'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>加入购物车</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>立即购买</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
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
  imageCarouselContainer: {
    height: 300,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  selectedImageIndicator: {
    width: 20,
    backgroundColor: '#FF6B6B',
  },
  scrollView: {
    flex: 1,
  },
  productInfoContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 14,
    color: '#FF6B6B',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  priceText: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  originalPriceText: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  productTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagItem: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  productStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    fontSize: 12,
    color: '#DDD',
    marginHorizontal: 8,
  },
  shopInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: '#F5F5F5',
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  shopLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  shopDetails: {
    flex: 1,
    marginLeft: 12,
  },
  shopName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  shopRatingText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  tabContentContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  detailContent: {
    // 商品详情内容样式
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  paramsContent: {
    // 规格参数内容样式
  },
  specItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  specName: {
    width: 100,
    fontSize: 14,
    color: '#666',
  },
  specValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  reviewsContent: {
    // 用户评价内容样式
  },
  reviewsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewsSummaryCount: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  reviewUserInfo: {
    flex: 1,
    marginLeft: 8,
  },
  reviewUserName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  reviewUserLevel: {
    fontSize: 12,
    color: '#999',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewImages: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  reviewReply: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 4,
  },
  reviewReplyLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  reviewReplyContent: {
    fontSize: 12,
    color: '#666',
  },
  viewAllReviewsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewAllReviewsText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  bottomSpace: {
    height: 80,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    marginRight: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    width: 40,
    height: 32,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#FFA726',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  addToCartText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;