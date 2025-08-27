import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 定义路由参数类型
interface PetDetailRouteParams {
  petId: string;
}

// 模拟宠物数据
const mockPet = {
  id: 'pt001',
  name: '英短蓝猫',
  breed: '英国短毛猫',
  gender: '公',
  age: '3个月',
  price: 2500.00,
  description: '这只英短蓝猫性格温顺，粘人可爱，毛色纯正，圆头圆脑，非常讨人喜欢。已做过驱虫，接种了第一针疫苗，健康状况良好。',
  images: [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1548802117-4c250d26b08a?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80'
  ],
  health: {
    vaccinated: true,
    dewormed: true,
    neutered: false,
    healthCertificate: true,
    healthStatus: '健康'
  },
  characteristics: [
    '性格温顺',
    '粘人',
    '活泼好动',
    '适应性强'
  ],
  careTips: '英短蓝猫是比较容易饲养的品种，日常饲养需要注意以下几点：\n1. 提供均衡的营养猫粮，避免喂食人类食物\n2. 定期梳理毛发，英短掉毛较多\n3. 保持猫砂盆清洁，每天清理\n4. 定期带猫咪去医院做体检\n5. 提供足够的玩具和活动空间，避免猫咪感到无聊\n6. 注意猫咪的心理健康，多陪伴互动',
  shop: {
    id: 's002',
    name: '萌宠之家',
    rating: 4.9,
    sales: 567,
    logo: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80',
    location: '上海',
    address: '上海市浦东新区张江高科技园区博云路2号',
    phone: '138****1234',
    isCertified: true
  },
  guarantee: {
    healthGuarantee: '30天健康保障',
    returnPolicy: '7天无理由退换',
    afterSaleService: '提供终身饲养咨询'
  }
};

// 模拟其他推荐宠物
const mockRecommendedPets = [
  {
    id: 'pt002',
    name: '美短虎斑',
    breed: '美国短毛猫',
    age: '4个月',
    price: 2200.00,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80'
  },
  {
    id: 'pt003',
    name: '布偶猫',
    breed: '布偶猫',
    age: '5个月',
    price: 5800.00,
    image: 'https://images.unsplash.com/photo-1586977956793-5e3115478296?auto=format&fit=crop&q=80'
  },
  {
    id: 'pt004',
    name: '橘猫',
    breed: '中华田园猫',
    age: '2个月',
    price: 800.00,
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80'
  },
  {
    id: 'pt005',
    name: '暹罗猫',
    breed: '暹罗猫',
    age: '3个月',
    price: 1800.00,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
  }
];

const PetDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ PetDetail: PetDetailRouteParams }>>();
  const { petId } = route.params;

  const [pet, setPet] = useState(null);
  const [recommendedPets, setRecommendedPets] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('detail'); // detail, health, care, guarantee

  // 加载宠物数据
  useEffect(() => {
    loadPetDetail();
    loadRecommendedPets();
  }, []);

  // 模拟加载宠物详情
  const loadPetDetail = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      setPet(mockPet);
    } catch (error) {
      console.error('加载宠物详情失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 模拟加载推荐宠物
  const loadRecommendedPets = async () => {
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 600));
      setRecommendedPets(mockRecommendedPets);
    } catch (error) {
      console.error('加载推荐宠物失败:', error);
    }
  };

  // 处理联系卖家
  const handleContactSeller = () => {
    Alert.alert('提示', `即将拨打卖家电话：${pet?.shop?.phone}`);
  };

  // 处理立即购买
  const handleBuyNow = () => {
    Alert.alert('提示', '即将跳转到订单确认页面');
  };

  // 处理收藏
  const handleFavorite = () => {
    Alert.alert('成功', '已收藏该宠物');
  };

  // 处理分享
  const handleShare = () => {
    Alert.alert('提示', '分享功能开发中');
  };

  // 处理推荐宠物点击
  const handleRecommendedPetPress = (recommendedPetId) => {
    // 这里可以导航到其他宠物的详情页
    console.log('查看推荐宠物:', recommendedPetId);
  };

  // 处理查看店铺
  const handleViewShop = () => {
    // 这里可以导航到店铺详情页
    console.log('查看店铺:', pet?.shop?.id);
  };

  // 渲染图片轮播指示器
  const renderImageIndicators = () => {
    if (!pet?.images?.length) return null;
    
    return (
      <View style={styles.imageIndicators}>
        {pet.images.map((_, index) => (
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

  if (isLoading || !pet) {
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
        <Text style={styles.headerTitle}>宠物详情</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Icon name="share-social-outline" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
            <Icon name="heart-outline" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 宠物图片轮播 */}
      <View style={styles.imageCarouselContainer}>
        <FlatList
          data={pet.images}
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
              style={styles.petImage} 
              resizeMode="contain"
            />
          )}
        />
        {renderImageIndicators()}
      </View>

      {/* 宠物信息 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 宠物基本信息 */}
        <View style={styles.petInfoContainer}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petBreed}>{pet.breed} · {pet.age} · {pet.gender}</Text>
          <Text style={styles.petPrice}>¥{pet.price.toFixed(2)}</Text>
          <Text style={styles.petDescription}>{pet.description}</Text>
          
          {/* 特征标签 */}
          <View style={styles.characteristicsContainer}>
            <Text style={styles.sectionTitle}>宠物特征</Text>
            <View style={styles.characteristicsList}>
              {pet.characteristics.map((characteristic, index) => (
                <View key={index} style={styles.characteristicTag}>
                  <Text style={styles.characteristicText}>{characteristic}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 选项卡导航 */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'detail' && styles.activeTabItem]}
            onPress={() => setActiveTab('detail')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'detail' && styles.activeTabText]}
            >
              基本信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'health' && styles.activeTabItem]}
            onPress={() => setActiveTab('health')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'health' && styles.activeTabText]}
            >
              健康状况
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'care' && styles.activeTabItem]}
            onPress={() => setActiveTab('care')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'care' && styles.activeTabText]}
            >
              饲养要点
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'guarantee' && styles.activeTabItem]}
            onPress={() => setActiveTab('guarantee')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'guarantee' && styles.activeTabText]}
            >
              保障服务
            </Text>
          </TouchableOpacity>
        </View>

        {/* 选项卡内容 */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'detail' && (
            <View style={styles.detailContent}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>品种</Text>
                <Text style={styles.infoValue}>{pet.breed}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>年龄</Text>
                <Text style={styles.infoValue}>{pet.age}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>性别</Text>
                <Text style={styles.infoValue}>{pet.gender}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>性格特点</Text>
                <Text style={styles.infoValue}>{pet.characteristics.join('、')}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>来源</Text>
                <Text style={styles.infoValue}>正规猫舍繁育</Text>
              </View>
            </View>
          )}
          
          {activeTab === 'health' && (
            <View style={styles.healthContent}>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>健康状况</Text>
                <Text style={styles.healthValueGood}>{pet.health.healthStatus}</Text>
              </View>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>疫苗接种</Text>
                <Text style={pet.health.vaccinated ? styles.healthValueGood : styles.healthValueBad}>
                  {pet.health.vaccinated ? '已接种' : '未接种'}
                </Text>
              </View>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>驱虫情况</Text>
                <Text style={pet.health.dewormed ? styles.healthValueGood : styles.healthValueBad}>
                  {pet.health.dewormed ? '已驱虫' : '未驱虫'}
                </Text>
              </View>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>绝育情况</Text>
                <Text style={pet.health.neutered ? styles.healthValueGood : styles.healthValueBad}>
                  {pet.health.neutered ? '已绝育' : '未绝育'}
                </Text>
              </View>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>健康证明</Text>
                <Text style={pet.health.healthCertificate ? styles.healthValueGood : styles.healthValueBad}>
                  {pet.health.healthCertificate ? '有' : '无'}
                </Text>
              </View>
              <View style={styles.healthRemark}>
                <Text style={styles.healthRemarkText}>* 购买后可提供详细的健康检查报告</Text>
              </View>
            </View>
          )}
          
          {activeTab === 'care' && (
            <View style={styles.careContent}>
              <Text style={styles.careTitle}>饲养要点</Text>
              <Text style={styles.careText}>{pet.careTips}</Text>
              <View style={styles.careImages}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80' }} 
                  style={styles.careImage} 
                />
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80' }} 
                  style={styles.careImage} 
                />
              </View>
            </View>
          )}
          
          {activeTab === 'guarantee' && (
            <View style={styles.guaranteeContent}>
              <View style={styles.guaranteeItem}>
                <Icon name="shield-checkmark" size={20} color="#4CAF50" style={styles.guaranteeIcon} />
                <Text style={styles.guaranteeText}>{pet.guarantee.healthGuarantee}</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <Icon name="refresh-circle" size={20} color="#2196F3" style={styles.guaranteeIcon} />
                <Text style={styles.guaranteeText}>{pet.guarantee.returnPolicy}</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <Icon name="headset" size={20} color="#FF9800" style={styles.guaranteeIcon} />
                <Text style={styles.guaranteeText}>{pet.guarantee.afterSaleService}</Text>
              </View>
              <View style={styles.guaranteeNote}>
                <Text style={styles.guaranteeNoteText}>* 具体保障条款以购买合同为准</Text>
              </View>
            </View>
          )}
        </View>

        {/* 商家信息 */}
        <View style={styles.shopInfoContainer}>
          <TouchableOpacity style={styles.shopInfo} onPress={handleViewShop}>
            <Image source={{ uri: pet.shop.logo }} style={styles.shopLogo} />
            <View style={styles.shopDetails}>
              <View style={styles.shopNameContainer}>
                <Text style={styles.shopName}>{pet.shop.name}</Text>
                {pet.shop.isCertified && (
                  <View style={styles.certifiedBadge}>
                    <Icon name="checkmark-circle" size={12} color="#2196F3" />
                    <Text style={styles.certifiedText}>已认证</Text>
                  </View>
                )}
              </View>
              <Text style={styles.shopRating}>评分 {pet.shop.rating} | 已售 {pet.shop.sales}只</Text>
              <Text style={styles.shopLocation}>{pet.shop.location}</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 推荐宠物 */}
        <View style={styles.recommendedContainer}>
          <Text style={styles.recommendedTitle}>推荐宠物</Text>
          <FlatList
            data={recommendedPets}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.recommendedPetItem} 
                onPress={() => handleRecommendedPetPress(item.id)}
              >
                <Image source={{ uri: item.image }} style={styles.recommendedPetImage} />
                <Text style={styles.recommendedPetName}>{item.name}</Text>
                <Text style={styles.recommendedPetBreed}>{item.breed} · {item.age}</Text>
                <Text style={styles.recommendedPetPrice}>¥{item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* 底部空间，确保内容不被遮挡 */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* 底部操作栏 */}
      <View style={styles.bottomActionBar}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactSeller}>
          <Icon name="call-outline" size={18} color="#FF6B6B" />
          <Text style={styles.contactButtonText}>联系卖家</Text>
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
  petImage: {
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
  petInfoContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  petPrice: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  petDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
  },
  characteristicsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  characteristicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  characteristicTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  characteristicText: {
    fontSize: 14,
    color: '#666',
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
    // 基本信息内容样式
  },
  infoItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  healthContent: {
    // 健康状况内容样式
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  healthLabel: {
    fontSize: 14,
    color: '#666',
  },
  healthValueGood: {
    fontSize: 14,
    color: '#4CAF50',
  },
  healthValueBad: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  healthRemark: {
    marginTop: 16,
  },
  healthRemarkText: {
    fontSize: 12,
    color: '#999',
  },
  careContent: {
    // 饲养要点内容样式
  },
  careTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  careText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
  },
  careImages: {
    flexDirection: 'row',
  },
  careImage: {
    width: (width - 32 - 8) / 2, // 屏幕宽度减去左右padding和中间间距，除以2
    height: 120,
    borderRadius: 4,
    marginRight: 8,
  },
  guaranteeContent: {
    // 保障服务内容样式
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  guaranteeIcon: {
    marginRight: 12,
  },
  guaranteeText: {
    fontSize: 14,
    color: '#333',
  },
  guaranteeNote: {
    marginTop: 16,
  },
  guaranteeNoteText: {
    fontSize: 12,
    color: '#999',
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  shopDetails: {
    flex: 1,
    marginLeft: 12,
  },
  shopNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  certifiedText: {
    fontSize: 10,
    color: '#2196F3',
    marginLeft: 2,
  },
  shopRating: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  shopLocation: {
    fontSize: 12,
    color: '#999',
  },
  recommendedContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  recommendedPetItem: {
    width: 140,
    marginRight: 12,
  },
  recommendedPetImage: {
    width: 140,
    height: 140,
    borderRadius: 4,
    marginBottom: 8,
  },
  recommendedPetName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  recommendedPetBreed: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  recommendedPetPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
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
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 4,
    paddingVertical: 12,
    marginRight: 12,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginLeft: 8,
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

export default PetDetailScreen;