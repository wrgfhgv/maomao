import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [pets, setPets] = useState([]);
  const [orderStats, setOrderStats] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟加载用户数据
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟用户信息
      const mockUserInfo = {
        id: 'user123',
        name: '铲屎官小猫咪',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
        phone: '138****6789',
        email: 'catlover@example.com',
        joinDate: '2023-05-15',
        level: 'Lv.5',
        points: 2380,
        following: 156,
        followers: 253,
        bio: '资深铲屎官，养了两只可爱的猫咪，分享猫咪日常和养护经验。',
        location: '北京',
        isVip: true,
        vipExpiry: '2024-12-31'
      };

      // 模拟宠物数据
      const mockPets = [
        {
          id: 'pet1',
          name: '奥利奥',
          type: 'cat',
          breed: '美短',
          gender: 'male',
          age: '2岁',
          birthday: '2022-03-15',
          avatar: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&q=80',
          weight: '4.2kg',
          lastVaccine: '2024-01-10',
          lastCheckup: '2023-11-15',
          allergies: '无',
          description: '活泼好动，喜欢玩逗猫棒，爱吃鸡胸肉。'
        },
        {
          id: 'pet2',
          name: '奶茶',
          type: 'cat',
          breed: '布偶',
          gender: 'female',
          age: '1岁半',
          birthday: '2022-09-20',
          avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
          weight: '3.8kg',
          lastVaccine: '2024-01-15',
          lastCheckup: '2023-12-05',
          allergies: '无',
          description: '温顺粘人，喜欢被抚摸，爱吃零食。'
        }
      ];

      // 模拟订单统计
      const mockOrderStats = {
        totalOrders: 32,
        pendingPayment: 2,
        pendingDelivery: 3,
        pendingReview: 5,
        afterSale: 1,
        favorites: 18,
        coupons: 5
      };

      // 模拟通知数据
      const mockNotifications = [
        {
          id: 'n1',
          type: 'system',
          title: '系统通知',
          content: '欢迎加入我们的宠物社区，新用户专享7折优惠券已发放！',
          time: '今天 10:30',
          isRead: false
        },
        {
          id: 'n2',
          type: 'order',
          title: '订单状态更新',
          content: '您购买的宠物零食已发货，预计3天内送达。',
          time: '昨天 15:45',
          isRead: false
        },
        {
          id: 'n3',
          type: 'community',
          title: '社区互动',
          content: '用户"狗狗爱好者"评论了您的帖子："你家猫咪好可爱！"',
          time: '2天前',
          isRead: true
        }
      ];

      setUserInfo(mockUserInfo);
      setPets(mockPets);
      setOrderStats(mockOrderStats);
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('加载用户数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理切换部分
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // 处理编辑资料
  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { userInfo });
  };

  // 处理查看宠物档案
  const handleViewPetProfile = (pet) => {
    navigation.navigate('PetProfile', { pet });
  };

  // 处理添加宠物
  const handleAddPet = () => {
    navigation.navigate('AddPet');
  };

  // 处理查看订单
  const handleViewOrders = (status) => {
    navigation.navigate('Orders', { status });
  };

  // 处理查看设置
  const handleViewSettings = () => {
    navigation.navigate('Settings');
  };

  // 处理查看通知
  const handleViewNotifications = () => {
    navigation.navigate('Notifications');
  };

  // 处理查看收藏
  const handleViewFavorites = () => {
    navigation.navigate('Favorites');
  };

  // 处理查看优惠券
  const handleViewCoupons = () => {
    navigation.navigate('Coupons');
  };

  // 处理查看地址管理
  const handleViewAddresses = () => {
    navigation.navigate('Addresses');
  };

  // 处理查看关注和粉丝
  const handleViewFollowing = () => {
    navigation.navigate('Following');
  };

  const handleViewFollowers = () => {
    navigation.navigate('Followers');
  };

  // 渲染功能列表项
  const renderFeatureItem = ({ title, icon, count, onPress }) => {
    return (
      <TouchableOpacity style={styles.featureItem} onPress={onPress} activeOpacity={0.7}>
        <Icon name={icon} size={20} color="#666" />
        <Text style={styles.featureText}>{title}</Text>
        {count !== undefined && (
          <View style={styles.featureCount}>
            <Text style={styles.featureCountText}>
              {count > 99 ? '99+' : count}
            </Text>
          </View>
        )}
        <Icon name="chevron-right" size={14} color="#CCC" />
      </TouchableOpacity>
    );
  };

  // 渲染订单状态项
  const renderOrderStatusItem = ({ title, icon, count, color, onPress }) => {
    return (
      <TouchableOpacity style={styles.orderStatusItem} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.orderStatusIcon, { backgroundColor: color }]}>
          <Icon name={icon} size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.orderStatusText}>{title}</Text>
        {count > 0 && (
          <View style={styles.orderStatusCount}>
            <Text style={styles.orderStatusCountText}>
              {count > 99 ? '99+' : count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // 渲染宠物项
  const renderPetItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.petItem} 
        onPress={() => handleViewPetProfile(item)} 
        activeOpacity={0.7}
      >
        <View style={styles.petAvatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.petAvatar} />
          <View style={styles.petTypeBadge}>
            <Icon name={item.type === 'cat' ? 'cat' : 'dog'} size={10} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petDetails}>
            {item.breed} · {item.age} · {item.gender === 'male' ? '公' : '母'}
          </Text>
        </View>
        <Icon name="chevron-right" size={14} color="#CCC" />
      </TouchableOpacity>
    );
  };

  // 渲染通知项
  const renderNotificationItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.notificationItem} activeOpacity={0.7}>
        <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(item.type) }]}>
          <Icon name={getNotificationIcon(item.type)} size={14} color="#FFFFFF" />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationText} numberOfLines={2}>
            {item.content}
          </Text>
        </View>
        {!item.isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  // 获取通知图标
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'system':
        return 'bell-outline';
      case 'order':
        return 'cart-outline';
      case 'community':
        return 'chatbubbles-outline';
      default:
        return 'bell-outline';
    }
  };

  // 获取通知颜色
  const getNotificationColor = (type) => {
    switch (type) {
      case 'system':
        return '#4A90E2';
      case 'order':
        return '#50E3C2';
      case 'community':
        return '#FF6B6B';
      default:
        return '#4A90E2';
    }
  };

  // 渲染加载状态
  if (isLoading || !userInfo) {
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
      {/* 顶部个人信息区域 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.avatarContainer} onPress={handleEditProfile}>
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          {userInfo.isVip && (
            <View style={styles.vipBadge}>
              <Icon name="crown" size={10} color="#FFD700" />
              <Text style={styles.vipText}>VIP</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userLevel}>{userInfo.level}</Text>
          </View>
          <Text style={styles.userBio} numberOfLines={1}>{userInfo.bio}</Text>
          <View style={styles.socialStats}>
            <TouchableOpacity style={styles.statItem} onPress={handleViewFollowing}>
              <Text style={styles.statNumber}>{userInfo.following}</Text>
              <Text style={styles.statLabel}>关注</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={handleViewFollowers}>
              <Text style={styles.statNumber}>{userInfo.followers}</Text>
              <Text style={styles.statLabel}>粉丝</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userInfo.points}</Text>
              <Text style={styles.statLabel}>积分</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Icon name="edit-outline" size={16} color="#666" />
          <Text style={styles.editButtonText}>编辑资料</Text>
        </TouchableOpacity>
      </View>

      {/* VIP信息卡片 */}
      {userInfo.isVip && (
        <View style={styles.vipCard}>
          <View style={styles.vipCardLeft}>
            <View style={styles.vipCardTitleContainer}>
              <Icon name="crown" size={16} color="#FFD700" />
              <Text style={styles.vipCardTitle}>VIP会员</Text>
            </View>
            <Text style={styles.vipCardExpiry}>有效期至：{userInfo.vipExpiry}</Text>
          </View>
          <TouchableOpacity style={styles.vipCardButton}>
            <Text style={styles.vipCardButtonText}>立即续费</Text>
            <Icon name="chevron-right" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* 功能导航区 */}
      <View style={styles.featuresContainer}>
        <View style={styles.featuresRow}>
          {renderOrderStatusItem({
            title: '待付款',
            icon: 'wallet-outline',
            count: orderStats.pendingPayment,
            color: '#FF6B6B',
            onPress: () => handleViewOrders('pendingPayment')
          })}
          {renderOrderStatusItem({
            title: '待发货',
            icon: 'truck-outline',
            count: orderStats.pendingDelivery,
            color: '#4ECDC4',
            onPress: () => handleViewOrders('pendingDelivery')
          })}
          {renderOrderStatusItem({
            title: '待收货',
            icon: 'archive-outline',
            count: orderStats.pendingReview,
            color: '#45B7D1',
            onPress: () => handleViewOrders('pendingReview')
          })}
          {renderOrderStatusItem({
            title: '待评价',
            icon: 'star-outline',
            count: orderStats.afterSale,
            color: '#FFA500',
            onPress: () => handleViewOrders('afterSale')
          })}
        </View>
        <View style={styles.featuresRow}>
          {renderOrderStatusItem({
            title: '我的收藏',
            icon: 'heart-outline',
            count: orderStats.favorites,
            color: '#E94057',
            onPress: handleViewFavorites
          })}
          {renderOrderStatusItem({
            title: '优惠券',
            icon: 'ticket-outline',
            count: orderStats.coupons,
            color: '#8A2BE2',
            onPress: handleViewCoupons
          })}
          {renderOrderStatusItem({
            title: '消息通知',
            icon: 'bell-outline',
            count: notifications.filter(n => !n.isRead).length,
            color: '#FF6347',
            onPress: handleViewNotifications
          })}
          {renderOrderStatusItem({
            title: '地址管理',
            icon: 'location-outline',
            count: 0,
            color: '#50C878',
            onPress: handleViewAddresses
          })}
        </View>
      </View>

      {/* 内容切换标签 */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'profile' && styles.activeTab]}
          onPress={() => handleSectionChange('profile')}
        >
          <Text style={[styles.tabText, activeSection === 'profile' && styles.activeTabText]}>我的宠物</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'orders' && styles.activeTab]}
          onPress={() => handleSectionChange('orders')}
        >
          <Text style={[styles.tabText, activeSection === 'orders' && styles.activeTabText]}>我的订单</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'community' && styles.activeTab]}
          onPress={() => handleSectionChange('community')}
        >
          <Text style={[styles.tabText, activeSection === 'community' && styles.activeTabText]}>我的社区</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'services' && styles.activeTab]}
          onPress={() => handleSectionChange('services')}
        >
          <Text style={[styles.tabText, activeSection === 'services' && styles.activeTabText]}>服务中心</Text>
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 我的宠物 */}
        {activeSection === 'profile' && (
          <View style={styles.petsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>我的宠物</Text>
              <TouchableOpacity onPress={handleAddPet}>
                <Text style={styles.sectionAction}>添加</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={pets}
              renderItem={renderPetItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            {pets.length === 0 && (
              <View style={styles.emptyContainer}>
                <Icon name="paw-outline" size={48} color="#CCC" />
                <Text style={styles.emptyText}>您还没有添加宠物</Text>
                <TouchableOpacity style={styles.emptyButton} onPress={handleAddPet}>
                  <Text style={styles.emptyButtonText}>添加宠物</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* 我的订单 */}
        {activeSection === 'orders' && (
          <View style={styles.ordersSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>最近订单</Text>
              <TouchableOpacity onPress={() => handleViewOrders('all')}>
                <Text style={styles.sectionAction}>查看全部</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.emptyContainer}>
              <Icon name="file-text-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>暂无最近订单</Text>
              <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Shopping')}>
                <Text style={styles.emptyButtonText}>去逛逛</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 我的社区 */}
        {activeSection === 'community' && (
          <View style={styles.communitySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>我的社区</Text>
            </View>
            <View style={styles.emptyContainer}>
              <Icon name="people-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>暂无社区动态</Text>
              <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Community')}>
                <Text style={styles.emptyButtonText}>去社区看看</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 服务中心 */}
        {activeSection === 'services' && (
          <View style={styles.servicesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>服务中心</Text>
            </View>
            <View style={styles.servicesList}>
              {renderFeatureItem({ title: '宠物知识', icon: 'book-outline', onPress: () => navigation.navigate('PetKnowledge') })}
              <View style={styles.separator} />
              {renderFeatureItem({ title: '提醒设置', icon: 'alarm-outline', onPress: () => navigation.navigate('Reminders') })}
              <View style={styles.separator} />
              {renderFeatureItem({ title: '宠物医生', icon: 'stethoscope-outline', onPress: () => navigation.navigate('Veterinarians') })}
              <View style={styles.separator} />
              {renderFeatureItem({ title: '宠物寄养', icon: 'home-outline', onPress: () => navigation.navigate('PetBoarding') })}
              <View style={styles.separator} />
              {renderFeatureItem({ title: '宠物训练', icon: 'school-outline', onPress: () => navigation.navigate('PetTraining') })}
              <View style={styles.separator} />
              {renderFeatureItem({ title: '意见反馈', icon: 'chatbox-outline', onPress: () => navigation.navigate('Feedback') })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 设置按钮 */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleViewSettings}>
        <Icon name="settings-outline" size={20} color="#666" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vipBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  vipText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userLevel: {
    fontSize: 12,
    color: '#FF6B6B',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  userBio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  socialStats: {
    flexDirection: 'row',
  },
  statItem: {
    marginRight: 16,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  vipCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  vipCardLeft: {
    flex: 1,
  },
  vipCardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vipCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DAA520',
    marginLeft: 4,
  },
  vipCardExpiry: {
    fontSize: 14,
    color: '#8B4513',
  },
  vipCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  vipCardButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  orderStatusItem: {
    alignItems: 'center',
    position: 'relative',
    width: (width - 32) / 4,
  },
  orderStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatusText: {
    fontSize: 12,
    color: '#666',
  },
  orderStatusCount: {
    position: 'absolute',
    top: -4,
    right: 20,
    backgroundColor: '#FF3B30',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  orderStatusCountText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  contentContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionAction: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  petsSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  petItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  petAvatarContainer: {
    position: 'relative',
  },
  petAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  petTypeBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petInfo: {
    flex: 1,
    marginLeft: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ordersSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  communitySection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  servicesSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  servicesList: {
    backgroundColor: '#FFFFFF',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
  featureCount: {
    backgroundColor: '#FF3B30',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  featureCountText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginTop: 8,
  },
  settingsButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default ProfileScreen;