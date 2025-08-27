import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const PetMarketScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pets, setPets] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [featuredPets, setFeaturedPets] = useState([]);
  const [nearbyPets, setNearbyPets] = useState([]);

  // 模拟加载宠物市场数据
  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = () => {
    // 模拟从API获取数据
    const mockBreeds = [
      { id: 'all', name: '全部品种', icon: 'grid-outline' },
      { id: 'golden', name: '金毛', icon: 'paw-outline' },
      { id: 'labrador', name: '拉布拉多', icon: 'paw-outline' },
      { id: 'husky', name: '哈士奇', icon: 'paw-outline' },
      { id: 'samoyed', name: '萨摩耶', icon: 'paw-outline' },
      { id: 'persian', name: '波斯猫', icon: 'paw-outline' },
      { id: 'britishshorthair', name: '英短', icon: 'paw-outline' },
      { id: 'munchkin', name: '矮脚猫', icon: 'paw-outline' },
    ];

    const mockPets = [
      {
        id: 'p1',
        name: '小金毛幼犬',
        type: 'dog',
        breed: '金毛',
        gender: 'male',
        age: '3个月',
        price: 2500,
        location: '北京市朝阳区',
        distance: '2.5km',
        image: 'https://images.unsplash.com/photo-1612436379520-6f71514d805c?auto=format&fit=crop&q=80',
        description: '自家养的金毛幼犬，健康活泼，已接种疫苗，性格温顺可爱，寻找有爱心的主人。',
        sellerName: '宠物乐园',
        sellerRating: 4.9,
        sellerSales: 125,
        health: '已驱虫，已接种两针疫苗',
        isCertified: true,
        isFeatured: true,
      },
      {
        id: 'p2',
        name: '英短蓝猫',
        type: 'cat',
        breed: '英短',
        gender: 'female',
        age: '4个月',
        price: 1800,
        location: '北京市海淀区',
        distance: '3.8km',
        image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80',
        description: '纯种英短蓝猫，性格安静粘人，毛色均匀，品相好，健康无癣，已做驱虫。',
        sellerName: '猫咪之家',
        sellerRating: 4.8,
        sellerSales: 98,
        health: '已驱虫，已接种两针疫苗',
        isCertified: true,
        isFeatured: false,
      },
      {
        id: 'p3',
        name: '哈士奇幼犬',
        type: 'dog',
        breed: '哈士奇',
        gender: 'male',
        age: '2个月',
        price: 1900,
        location: '北京市通州区',
        distance: '5.2km',
        image: 'https://images.unsplash.com/photo-1590959297409-96d84a6c85d5?auto=format&fit=crop&q=80',
        description: '活泼可爱的哈士奇幼犬，血统纯正，眼睛明亮，骨架健壮，已做第一次疫苗和驱虫。',
        sellerName: '哈士奇部落',
        sellerRating: 4.7,
        sellerSales: 76,
        health: '已驱虫，已接种一针疫苗',
        isCertified: true,
        isFeatured: false,
      },
      {
        id: 'p4',
        name: '布偶猫',
        type: 'cat',
        breed: '布偶',
        gender: 'female',
        age: '5个月',
        price: 4500,
        location: '北京市丰台区',
        distance: '4.1km',
        image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80',
        description: '纯种布偶猫，性格温顺，毛发浓密，蓝眼睛，品相极佳，已做绝育手术。',
        sellerName: '布偶猫舍',
        sellerRating: 5.0,
        sellerSales: 42,
        health: '已驱虫，已接种全部疫苗，已绝育',
        isCertified: true,
        isFeatured: true,
      },
      {
        id: 'p5',
        name: '拉布拉多幼犬',
        type: 'dog',
        breed: '拉布拉多',
        gender: 'female',
        age: '3个月',
        price: 2200,
        location: '北京市顺义区',
        distance: '7.8km',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
        description: '黑色拉布拉多幼犬，聪明活泼，训练性强，已做驱虫和疫苗接种。',
        sellerName: '拉布拉多之家',
        sellerRating: 4.6,
        sellerSales: 68,
        health: '已驱虫，已接种两针疫苗',
        isCertified: false,
        isFeatured: false,
      },
      {
        id: 'p6',
        name: '波斯猫',
        type: 'cat',
        breed: '波斯猫',
        gender: 'male',
        age: '6个月',
        price: 3200,
        location: '北京市西城区',
        distance: '3.5km',
        image: 'https://images.unsplash.com/photo-1608813908385-42a59b14b326?auto=format&fit=crop&q=80',
        description: '纯种波斯猫，长毛，温顺粘人，毛发柔顺，品相好，已做驱虫和疫苗。',
        sellerName: '波斯猫苑',
        sellerRating: 4.8,
        sellerSales: 53,
        health: '已驱虫，已接种全部疫苗',
        isCertified: true,
        isFeatured: false,
      },
    ];

    const mockFeaturedPets = mockPets.filter(pet => pet.isFeatured);
    const mockNearbyPets = mockPets.slice(0, 4);

    setBreeds(mockBreeds);
    setPets(mockPets);
    setFeaturedPets(mockFeaturedPets);
    setNearbyPets(mockNearbyPets);
  };

  // 处理下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      loadMarketData();
      setRefreshing(false);
    }, 1500);
  };

  // 处理品种切换
  const handleBreedChange = (breedId) => {
    setActiveTab(breedId);
    // 这里可以根据品种筛选宠物
  };

  // 处理宠物点击
  const handlePetPress = (petId) => {
    navigation.navigate('PetDetail', { id: petId });
  };

  // 处理搜索
  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('PetSearch', { query: searchText });
      setSearchText('');
    }
  };

  // 处理筛选按钮点击
  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  // 处理联系卖家
  const handleContactSeller = (petId, event) => {
    event.stopPropagation(); // 阻止事件冒泡
    // 这里可以实现联系卖家的逻辑
    console.log('联系卖家', petId);
  };

  // 渲染宠物项
  const renderPetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.petItem}
      onPress={() => handlePetPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.petImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.petImage}
          resizeMode="cover"
        />
        {item.isCertified && (
          <View style={styles.certifiedBadge}>
            <Icon name="shield-checkmark" size={12} color="#FFFFFF" />
            <Text style={styles.certifiedText}>认证商家</Text>
          </View>
        )}
        <View style={styles.genderBadge}>
          <Icon 
            name={item.gender === 'male' ? 'male' : 'female'} 
            size={10} 
            color={item.gender === 'male' ? '#3498db' : '#e74c3c'} 
          />
        </View>
      </View>
      <Text style={styles.petName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.petBreed}>{item.breed} · {item.age}</Text>
      <View style={styles.petLocationContainer}>
        <Icon name="location-outline" size={12} color="#999" />
        <Text style={styles.petLocation}>{item.location}</Text>
        <Text style={styles.petDistance}>{item.distance}</Text>
      </View>
      <View style={styles.petPriceContainer}>
        <Text style={styles.petPrice}>¥{item.price}</Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={(e) => handleContactSeller(item.id, e)}
          activeOpacity={0.7}
        >
          <Text style={styles.contactButtonText}>联系卖家</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // 渲染特色宠物项
  const renderFeaturedPetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredPetItem}
      onPress={() => handlePetPress(item.id)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.featuredPetImage}
        resizeMode="cover"
      />
      <View style={styles.featuredPetContent}>
        <Text style={styles.featuredPetName}>{item.name}</Text>
        <Text style={styles.featuredPetInfo}>{item.breed} · {item.age} · {item.gender === 'male' ? '公' : '母'}</Text>
        <View style={styles.featuredPetSeller}>
          <View style={styles.sellerAvatar} />
          <Text style={styles.sellerName}>{item.sellerName}</Text>
          <View style={styles.sellerRating}>
            <Icon name="star" size={10} color="#FFD700" solid />
            <Text style={styles.sellerRatingText}>{item.sellerRating}</Text>
          </View>
        </View>
        <Text style={styles.featuredPetPrice}>¥{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  // 渲染附近宠物项
  const renderNearbyPetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.nearbyPetItem}
      onPress={() => handlePetPress(item.id)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.nearbyPetImage}
        resizeMode="cover"
      />
      <View style={styles.nearbyPetContent}>
        <Text style={styles.nearbyPetName}>{item.name}</Text>
        <Text style={styles.nearbyPetInfo}>{item.breed} · {item.age}</Text>
        <View style={styles.nearbyPetLocation}>
          <Icon name="location-outline" size={10} color="#999" />
          <Text style={styles.nearbyPetDistance}>{item.distance}</Text>
        </View>
      </View>
      <Text style={styles.nearbyPetPrice}>¥{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 顶部搜索栏 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={16} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索宠物品种..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {/* 分类导航 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.breedsScrollView}
        contentContainerStyle={styles.breedsScrollViewContent}
      >
        {breeds.map((breed) => (
          <TouchableOpacity
            key={breed.id}
            style={[styles.breedItem, activeTab === breed.id && styles.activeBreedItem]}
            onPress={() => handleBreedChange(breed.id)}
          >
            <Icon 
              name={breed.icon}
              size={16} 
              color={activeTab === breed.id ? '#FF6B6B' : '#666'}
            />
            <Text 
              style={[styles.breedName, activeTab === breed.id && styles.activeBreedName]}
            >
              {breed.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 排序和筛选 */}
      <View style={styles.sortFilterContainer}>
        <View style={styles.sortOptions}>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={[styles.sortOptionText, styles.activeSortOptionText]}>推荐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={styles.sortOptionText}>价格</Text>
            <Icon name="chevron-down" size={12} color="#999" style={styles.sortIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={styles.sortOptionText}>年龄</Text>
            <Icon name="chevron-down" size={12} color="#999" style={styles.sortIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortOption}>
            <Text style={styles.sortOptionText}>距离</Text>
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
            <Text style={styles.filterSectionTitle}>宠物类型</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <View style={[styles.filterCheckbox, styles.filterCheckboxChecked]}>
                  <View style={styles.filterCheckboxInner} />
                </View>
                <Text style={styles.filterOptionText}>全部</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <View style={styles.filterCheckbox}>
                  <View style={styles.filterCheckboxInner} />
                </View>
                <Text style={styles.filterOptionText}>狗狗</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <View style={styles.filterCheckbox}>
                  <View style={styles.filterCheckboxInner} />
                </View>
                <Text style={styles.filterOptionText}>猫咪</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.filterSectionTitle}>性别</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <View style={[styles.filterCheckbox, styles.filterCheckboxChecked]}>
                  <View style={styles.filterCheckboxInner} />
                </View>
                <Text style={styles.filterOptionText}>全部</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <View style={styles.filterCheckbox}>
                  <View style={styles.filterCheckboxInner} />
                </View>
                <Text style={styles.filterOptionText}>公</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <View style={styles.filterCheckbox}>
                  <View style={styles.filterCheckboxInner} />
                </View>
                <Text style={styles.filterOptionText}>母</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.filterSectionTitle}>价格区间</Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={[styles.priceRangeText, styles.activePriceRangeText]}>全部</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={styles.priceRangeText}>0-2000元</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={styles.priceRangeText}>2000-5000元</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.priceRangeOption}>
                <Text style={styles.priceRangeText}>5000元以上</Text>
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
        {/* 认证商家横幅 */}
        <View style={styles.certifiedBanner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>认证商家专区</Text>
            <Text style={styles.bannerSubtitle}>品质保障，健康无忧</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>查看全部</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 热门推荐 */}
        <View style={styles.featuredContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热门推荐</Text>
            <TouchableOpacity>
              <Text style={styles.sectionMore}>更多</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredPets}
            renderItem={renderFeaturedPetItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* 附近宠物 */}
        <View style={styles.nearbyContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>附近宠物</Text>
            <TouchableOpacity>
              <Text style={styles.sectionMore}>更多</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nearbyList}>
            {nearbyPets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.nearbyPetItem}
                onPress={() => handlePetPress(pet.id)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: pet.image }}
                  style={styles.nearbyPetImage}
                  resizeMode="cover"
                />
                <View style={styles.nearbyPetContent}>
                  <Text style={styles.nearbyPetName}>{pet.name}</Text>
                  <Text style={styles.nearbyPetInfo}>{pet.breed} · {pet.age}</Text>
                  <View style={styles.nearbyPetLocation}>
                    <Icon name="location-outline" size={10} color="#999" />
                    <Text style={styles.nearbyPetDistance}>{pet.distance}</Text>
                  </View>
                </View>
                <Text style={styles.nearbyPetPrice}>¥{pet.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 宠物列表 */}
        <View style={styles.petsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>全部宠物</Text>
          </View>
          <FlatList
            data={pets}
            renderItem={renderPetItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.petsRow}
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
  breedsScrollView: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  breedsScrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  breedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  activeBreedItem: {
    backgroundColor: '#FFE0E0',
  },
  breedName: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  activeBreedName: {
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
    marginTop: 16,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  filterCheckboxChecked: {
    borderColor: '#FF6B6B',
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
  certifiedBanner: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    position: 'relative',
    height: 120,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bannerOverlay: {
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
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredContainer: {
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
  featuredList: {
    paddingBottom: 8,
  },
  featuredPetItem: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  featuredPetImage: {
    width: '100%',
    height: 100,
  },
  featuredPetContent: {
    padding: 12,
  },
  featuredPetName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featuredPetInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  featuredPetSeller: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  sellerName: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerRatingText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  featuredPetPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  nearbyContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  nearbyList: {
    marginTop: 8,
  },
  nearbyPetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  nearbyPetImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  nearbyPetContent: {
    flex: 1,
  },
  nearbyPetName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  nearbyPetInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  nearbyPetLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyPetDistance: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  nearbyPetPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  petsContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  petsRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  petItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  petImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  certifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  certifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  genderBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  petLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  petLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  petDistance: {
    fontSize: 12,
    color: '#FF6B6B',
    marginLeft: 8,
  },
  petPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#FFE0E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  contactButtonText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 80,
  },
});

export default PetMarketScreen;