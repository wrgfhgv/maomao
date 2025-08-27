import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout, Polyline, Circle } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const RescueMapScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 39.9042, longitude: 116.4074 }); // 默认北京
  const [zoomLevel, setZoomLevel] = useState(13);
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [nearbyAnimals, setNearbyAnimals] = useState([]);
  const [rescueOrganizations, setRescueOrganizations] = useState([]);
  const [adoptablePets, setAdoptablePets] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟加载数据
  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = () => {
    // 模拟附近的流浪动物数据
    const mockAnimals = [
      {
        id: 'a1',
        name: '橘色猫咪',
        type: 'cat',
        breed: '橘猫',
        gender: 'male',
        age: '约1岁',
        description: '亲人的橘猫，经常在小区附近出现，看起来健康，很友好。',
        location: { latitude: 39.9042, longitude: 116.4074 },
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
        status: '待救助',
        reportedTime: '2小时前',
        reporter: '爱心人士',
        tags: ['亲人', '健康'],
      },
      {
        id: 'a2',
        name: '小黑狗',
        type: 'dog',
        breed: '混种',
        gender: 'female',
        age: '约2岁',
        description: '黑色小狗，有点胆小，但不攻击人，需要帮助。',
        location: { latitude: 39.9142, longitude: 116.4174 },
        image: 'https://images.unsplash.com/photo-1565069181049-49d5128a720c?auto=format&fit=crop&q=80',
        status: '待救助',
        reportedTime: '5小时前',
        reporter: '李女士',
        tags: ['胆小', '需要帮助'],
      },
      {
        id: 'a3',
        name: '三花小猫',
        type: 'cat',
        breed: '三花',
        gender: 'female',
        age: '约6个月',
        description: '可爱的三花小猫，似乎怀孕了，需要紧急救助。',
        location: { latitude: 39.8942, longitude: 116.3974 },
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80',
        status: '紧急',
        reportedTime: '昨天',
        reporter: '张先生',
        tags: ['怀孕', '紧急'],
      },
      {
        id: 'a4',
        name: '黄色小狗',
        type: 'dog',
        breed: '混种',
        gender: 'male',
        age: '约3个月',
        description: '活泼的小黄狗，看起来很健康，亲人。',
        location: { latitude: 39.9082, longitude: 116.4024 },
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1b76106?auto=format&fit=crop&q=80',
        status: '待救助',
        reportedTime: '3天前',
        reporter: '王女士',
        tags: ['活泼', '健康'],
      },
    ];

    // 模拟救助组织数据
    const mockOrganizations = [
      {
        id: 'o1',
        name: '北京流浪动物救助中心',
        address: '北京市朝阳区建国路88号',
        phone: '010-12345678',
        location: { latitude: 39.9242, longitude: 116.4274 },
        description: '专业的流浪动物救助机构，提供救助、领养、绝育等服务。',
        image: 'https://images.unsplash.com/photo-1584448511753-2b09666453f0?auto=format&fit=crop&q=80',
        rating: 4.8,
        reviews: 125,
      },
      {
        id: 'o2',
        name: '爱心宠物之家',
        address: '北京市海淀区中关村南大街5号',
        phone: '010-87654321',
        location: { latitude: 39.9842, longitude: 116.3874 },
        description: '致力于流浪动物救助和领养的非营利组织。',
        image: 'https://images.unsplash.com/photo-1534353691423-251e3c724633?auto=format&fit=crop&q=80',
        rating: 4.7,
        reviews: 98,
      },
    ];

    // 模拟可领养宠物数据
    const mockAdoptablePets = [
      {
        id: 'ap1',
        name: '小白',
        type: 'cat',
        breed: '白猫',
        gender: 'female',
        age: '1岁',
        description: '性格温顺，已绝育，已接种疫苗。',
        location: { latitude: 39.9242, longitude: 116.4274 }, // 救助中心位置
        image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80',
        status: '待领养',
        organization: '北京流浪动物救助中心',
      },
      {
        id: 'ap2',
        name: '大黄',
        type: 'dog',
        breed: '金毛',
        gender: 'male',
        age: '2岁',
        description: '活泼开朗，已绝育，已接种疫苗，非常适合有孩子的家庭。',
        location: { latitude: 39.9842, longitude: 116.3874 }, // 救助中心位置
        image: 'https://images.unsplash.com/photo-1612436379520-6f71514d805c?auto=format&fit=crop&q=80',
        status: '待领养',
        organization: '爱心宠物之家',
      },
    ];

    setNearbyAnimals(mockAnimals);
    setRescueOrganizations(mockOrganizations);
    setAdoptablePets(mockAdoptablePets);
  };

  // 处理地图点击
  const handleMapPress = () => {
    setSelectedAnimal(null);
  };

  // 处理动物标记点击
  const handleAnimalPress = (animal) => {
    setSelectedAnimal(animal);
  };

  // 处理缩放级别变化
  const handleZoomChange = (level) => {
    setZoomLevel(prev => Math.max(1, Math.min(18, prev + level)));
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.001 * Math.pow(2, 15 - zoomLevel),
        longitudeDelta: 0.001 * Math.pow(2, 15 - zoomLevel),
      });
    }
  };

  // 处理定位按钮点击
  const handleLocatePress = () => {
    // 模拟定位到当前位置
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.001 * Math.pow(2, 15 - zoomLevel),
        longitudeDelta: 0.001 * Math.pow(2, 15 - zoomLevel),
      });
    }
  };

  // 处理添加标记按钮点击
  const handleAddMarkerPress = () => {
    navigation.navigate('ReportAnimal');
  };

  // 处理查看详情按钮点击
  const handleViewDetails = (animal) => {
    navigation.navigate('AnimalDetail', { animal });
  };

  // 处理联系救助按钮点击
  const handleContactRescue = (animal) => {
    // 这里可以实现联系救助的逻辑
    console.log('联系救助', animal);
  };

  // 处理切换标签
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 渲染动物标记
  const renderAnimalMarker = (animal) => {
    let markerIcon = 'paw-outline';
    let markerColor = '#FF6B6B';
    let markerSize = 24;

    if (animal.status === '紧急') {
      markerColor = '#FF3B30';
      markerSize = 28;
    }
    if (animal.type === 'cat') {
      markerIcon = 'cat';
    }
    if (animal.type === 'dog') {
      markerIcon = 'dog';
    }

    return (
      <Marker
        key={animal.id}
        coordinate={animal.location}
        onPress={() => handleAnimalPress(animal)}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.markerContainer}>
          <Icon name={markerIcon} size={markerSize} color={markerColor} />
          {animal.status === '紧急' && (
            <View style={styles.emergencyBadge}>
              <Text style={styles.emergencyText}>紧急</Text>
            </View>
          )}
        </View>
        {selectedAnimal && selectedAnimal.id === animal.id && (
          <Callout
            style={styles.calloutContainer}
            onPress={() => handleViewDetails(animal)}
          >
            <View style={styles.calloutContent}>
              <Image 
                source={{ uri: animal.image }} 
                style={styles.calloutImage} 
                resizeMode="cover"
              />
              <View style={styles.calloutInfo}>
                <Text style={styles.calloutTitle}>{animal.name}</Text>
                <Text style={styles.calloutDescription} numberOfLines={2}>
                  {animal.description}
                </Text>
                <View style={styles.calloutTags}>
                  {animal.tags.map((tag, index) => (
                    <View key={index} style={styles.tagBadge}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Callout>
        )}
      </Marker>
    );
  };

  // 渲染救助组织标记
  const renderOrganizationMarker = (organization) => {
    return (
      <Marker
        key={organization.id}
        coordinate={organization.location}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.organizationMarker}>
          <Icon name="home-outline" size={28} color="#3498db" />
        </View>
        <Callout
          style={styles.organizationCallout}
          onPress={() => navigation.navigate('OrganizationDetail', { organization })}
        >
          <View style={styles.organizationCalloutContent}>
            <Text style={styles.organizationCalloutTitle}>{organization.name}</Text>
            <Text style={styles.organizationCalloutAddress} numberOfLines={1}>
              {organization.address}
            </Text>
            <View style={styles.organizationCalloutRating}>
              <Icon name="star" size={12} color="#FFD700" solid />
              <Text style={styles.organizationCalloutRatingText}>{organization.rating}</Text>
              <Text style={styles.organizationCalloutReviews}>({organization.reviews})</Text>
            </View>
          </View>
        </Callout>
      </Marker>
    );
  };

  // 渲染可领养宠物标记
  const renderAdoptablePetMarker = (pet) => {
    return (
      <Marker
        key={pet.id}
        coordinate={pet.location}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.adoptableMarker}>
          <Icon name="heart-outline" size={24} color="#e74c3c" />
        </View>
        <Callout
          style={styles.adoptableCallout}
          onPress={() => navigation.navigate('AdoptDetail', { pet })}
        >
          <View style={styles.adoptableCalloutContent}>
            <Text style={styles.adoptableCalloutTitle}>{pet.name}</Text>
            <Text style={styles.adoptableCalloutInfo}>
              {pet.breed} · {pet.age}
            </Text>
            <Text style={styles.adoptableCalloutOrg}>
              {pet.organization}
            </Text>
          </View>
        </Callout>
      </Marker>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      {/* 顶部搜索栏 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={16} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索区域或救助信息..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* 标签切换 */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => handleTabChange('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>全部</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cats' && styles.activeTab]}
          onPress={() => handleTabChange('cats')}
        >
          <Text style={[styles.tabText, activeTab === 'cats' && styles.activeTabText]}>猫咪</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dogs' && styles.activeTab]}
          onPress={() => handleTabChange('dogs')}
        >
          <Text style={[styles.tabText, activeTab === 'dogs' && styles.activeTabText]}>狗狗</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'emergency' && styles.activeTab]}
          onPress={() => handleTabChange('emergency')}
        >
          <Text style={[styles.tabText, activeTab === 'emergency' && styles.activeTabText]}>紧急救助</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'organizations' && styles.activeTab]}
          onPress={() => handleTabChange('organizations')}
        >
          <Text style={[styles.tabText, activeTab === 'organizations' && styles.activeTabText]}>救助机构</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'adopt' && styles.activeTab]}
          onPress={() => handleTabChange('adopt')}
        >
          <Text style={[styles.tabText, activeTab === 'adopt' && styles.activeTabText]}>待领养</Text>
        </TouchableOpacity>
      </View>

      {/* 地图区域 */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.001 * Math.pow(2, 15 - zoomLevel),
            longitudeDelta: 0.001 * Math.pow(2, 15 - zoomLevel),
          }}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          showsTraffic={false}
        >
          {/* 当前位置标记 */}
          <Marker
            coordinate={currentLocation}
            title="我的位置"
            identifier="currentLocation"
          >
            <View style={styles.currentLocationMarker}>
              <View style={styles.currentLocationInner} />
            </View>
          </Marker>

          {/* 显示不同类型的标记 */}
          {(activeTab === 'all' || activeTab === 'cats' || activeTab === 'dogs' || activeTab === 'emergency') &&
            nearbyAnimals
              .filter(animal => {
                if (activeTab === 'all') return true;
                if (activeTab === 'cats') return animal.type === 'cat';
                if (activeTab === 'dogs') return animal.type === 'dog';
                if (activeTab === 'emergency') return animal.status === '紧急';
                return true;
              })
              .map(animal => renderAnimalMarker(animal))
          }

          {(activeTab === 'all' || activeTab === 'organizations') &&
            rescueOrganizations.map(organization => renderOrganizationMarker(organization))
          }

          {(activeTab === 'all' || activeTab === 'adopt') &&
            adoptablePets.map(pet => renderAdoptablePetMarker(pet))
          }
        </MapView>

        {/* 地图控制按钮 */}
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleZoomChange(-1)}
            activeOpacity={0.7}
          >
            <Icon name="minus" size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleZoomChange(1)}
            activeOpacity={0.7}
          >
            <Icon name="plus" size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locateButton}
            onPress={handleLocatePress}
            activeOpacity={0.7}
          >
            <Icon name="locate" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addMarkerButton}
            onPress={handleAddMarkerPress}
            activeOpacity={0.7}
          >
            <Icon name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* 筛选器按钮 */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilter(!showFilter)}
          activeOpacity={0.7}
        >
          <Icon name="filter" size={16} color="#333" />
          <Text style={styles.filterButtonText}>筛选</Text>
        </TouchableOpacity>

        {/* 筛选器面板 */}
        {showFilter && (
          <View style={styles.filterPanel}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>筛选条件</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Icon name="close" size={16} color="#999" />
              </TouchableOpacity>
            </View>
            <View style={styles.filterContent}>
              <Text style={styles.filterSectionTitle}>动物类型</Text>
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
                  <Text style={styles.filterOptionText}>猫咪</Text>
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
                  <Text style={styles.filterOptionText}>其他</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.filterSectionTitle}>紧急程度</Text>
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
                  <Text style={styles.filterOptionText}>紧急</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <View style={styles.filterCheckbox}>
                    <View style={styles.filterCheckboxInner} />
                  </View>
                  <Text style={styles.filterOptionText}>一般</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.filterSectionTitle}>发现时间</Text>
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
                  <Text style={styles.filterOptionText}>24小时内</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <View style={styles.filterCheckbox}>
                    <View style={styles.filterCheckboxInner} />
                  </View>
                  <Text style={styles.filterOptionText}>3天内</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <View style={styles.filterCheckbox}>
                    <View style={styles.filterCheckboxInner} />
                  </View>
                  <Text style={styles.filterOptionText}>一周内</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.applyFilterButton}>
              <Text style={styles.applyFilterButtonText}>确定</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 选中动物的详情浮层 */}
        {selectedAnimal && (
          <View style={styles.selectedAnimalContainer}>
            <View style={styles.selectedAnimalHeader}>
              <Text style={styles.selectedAnimalTitle}>{selectedAnimal.name}</Text>
              <TouchableOpacity onPress={() => setSelectedAnimal(null)}>
                <Icon name="close" size={16} color="#999" />
              </TouchableOpacity>
            </View>
            <View style={styles.selectedAnimalContent}>
              <Image 
                source={{ uri: selectedAnimal.image }} 
                style={styles.selectedAnimalImage} 
                resizeMode="cover"
              />
              <View style={styles.selectedAnimalInfo}>
                <Text style={styles.selectedAnimalDescription}>
                  {selectedAnimal.description}
                </Text>
                <View style={styles.selectedAnimalMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>类型:</Text>
                    <Text style={styles.metaValue}>{selectedAnimal.type === 'cat' ? '猫咪' : '狗狗'}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>性别:</Text>
                    <Text style={styles.metaValue}>{selectedAnimal.gender === 'male' ? '公' : '母'}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>年龄:</Text>
                    <Text style={styles.metaValue}>{selectedAnimal.age}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>状态:</Text>
                    <Text style={[styles.metaValue, selectedAnimal.status === '紧急' && styles.emergencyStatus]}>
                      {selectedAnimal.status}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>发现时间:</Text>
                    <Text style={styles.metaValue}>{selectedAnimal.reportedTime}</Text>
                  </View>
                </View>
                <View style={styles.selectedAnimalTags}>
                  {selectedAnimal.tags.map((tag, index) => (
                    <View key={index} style={styles.tagBadge}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.selectedAnimalActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleContactRescue(selectedAnimal)}
              >
                <Icon name="phone" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>联系救助</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButtonPrimary}
                onPress={() => handleViewDetails(selectedAnimal)}
              >
                <Text style={styles.actionButtonText}>查看详情</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 8,
    zIndex: 10,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 4,
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 40,
    alignItems: 'center',
    zIndex: 10,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addMarkerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  filterButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  filterPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContent: {
    maxHeight: 300,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
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
  applyFilterButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  applyFilterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentLocationMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocationInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  markerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  organizationMarker: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adoptableMarker: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutContainer: {
    width: 280,
    padding: 8,
  },
  calloutContent: {
    flexDirection: 'row',
  },
  calloutImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  calloutInfo: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    lineHeight: 16,
  },
  calloutTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
  },
  organizationCallout: {
    width: 220,
    padding: 8,
  },
  organizationCalloutContent: {
    padding: 8,
  },
  organizationCalloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  organizationCalloutAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  organizationCalloutRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizationCalloutRatingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 2,
  },
  organizationCalloutReviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
  },
  adoptableCallout: {
    width: 200,
    padding: 8,
  },
  adoptableCalloutContent: {
    padding: 8,
  },
  adoptableCalloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  adoptableCalloutInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  adoptableCalloutOrg: {
    fontSize: 12,
    color: '#999',
  },
  selectedAnimalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  selectedAnimalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedAnimalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedAnimalContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  selectedAnimalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  selectedAnimalInfo: {
    flex: 1,
  },
  selectedAnimalDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  selectedAnimalMeta: {
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 12,
    color: '#999',
    width: 50,
  },
  metaValue: {
    fontSize: 12,
    color: '#333',
  },
  emergencyStatus: {
    color: '#FF3B30',
  },
  selectedAnimalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedAnimalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  actionButtonPrimary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default RescueMapScreen;