import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 订单状态类型
const ORDER_STATUS = {
  ALL: 'all',
  PENDING_PAYMENT: 'pending_payment',
  PROCESSING: 'processing',
  SHIPPING: 'shipping',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// 订单状态中文映射
const STATUS_TEXT = {
  [ORDER_STATUS.ALL]: '全部',
  [ORDER_STATUS.PENDING_PAYMENT]: '待付款',
  [ORDER_STATUS.PROCESSING]: '待发货',
  [ORDER_STATUS.SHIPPING]: '待收货',
  [ORDER_STATUS.COMPLETED]: '已完成',
  [ORDER_STATUS.CANCELLED]: '已取消'
};

// 模拟订单数据
const mockOrders = [
  {
    id: '1001',
    type: 'product', // product 或 pet
    status: ORDER_STATUS.SHIPPING,
    orderNumber: '202403250001',
    createTime: '2024-03-25 14:30:22',
    totalAmount: 199.99,
    items: [
      {
        id: 'p001',
        name: '皇家猫粮幼猫配方粮',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584374935795-4d1e7a78e049?auto=format&fit=crop&q=80'
      }
    ],
    shopName: '宠物用品专营店',
    shippingFee: 0,
    address: {
      name: '张先生',
      phone: '138****6789',
      address: '上海市浦东新区张江高科技园区博云路2号'
    }
  },
  {
    id: '1002',
    type: 'product',
    status: ORDER_STATUS.PROCESSING,
    orderNumber: '202403240001',
    createTime: '2024-03-24 09:15:36',
    totalAmount: 256.50,
    items: [
      {
        id: 'p002',
        name: '猫咪玩具套装',
        price: 89.90,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593689248609-3e5d950d72b7?auto=format&fit=crop&q=80'
      },
      {
        id: 'p003',
        name: '猫咪抓板窝',
        price: 166.60,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80'
      }
    ],
    shopName: '宠物乐园',
    shippingFee: 0,
    address: {
      name: '张先生',
      phone: '138****6789',
      address: '上海市浦东新区张江高科技园区博云路2号'
    }
  },
  {
    id: '1003',
    type: 'pet',
    status: ORDER_STATUS.COMPLETED,
    orderNumber: '202403200001',
    createTime: '2024-03-20 16:45:12',
    totalAmount: 2500.00,
    items: [
      {
        id: 'pt001',
        name: '英国短毛猫',
        price: 2500.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80'
      }
    ],
    shopName: '萌宠之家',
    shippingFee: 0,
    address: {
      name: '张先生',
      phone: '138****6789',
      address: '上海市浦东新区张江高科技园区博云路2号'
    },
    healthCertificate: '已提供',
    vaccineRecords: '已接种疫苗'
  },
  {
    id: '1004',
    type: 'product',
    status: ORDER_STATUS.CANCELLED,
    orderNumber: '202403180001',
    createTime: '2024-03-18 11:20:45',
    totalAmount: 129.90,
    items: [
      {
        id: 'p004',
        name: '宠物自动喂食器',
        price: 129.90,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80'
      }
    ],
    shopName: '智能宠物用品',
    shippingFee: 0,
    address: {
      name: '张先生',
      phone: '138****6789',
      address: '上海市浦东新区张江高科技园区博云路2号'
    }
  },
  {
    id: '1005',
    type: 'product',
    status: ORDER_STATUS.PENDING_PAYMENT,
    orderNumber: '202403260001',
    createTime: '2024-03-26 10:10:00',
    totalAmount: 349.99,
    items: [
      {
        id: 'p005',
        name: '宠物航空箱外出便携包',
        price: 349.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608489302663-a30035e05929?auto=format&fit=crop&q=80'
      }
    ],
    shopName: '宠物出行装备店',
    shippingFee: 0,
    address: {
      name: '张先生',
      phone: '138****6789',
      address: '上海市浦东新区张江高科技园区博云路2号'
    }
  }
];

const OrderScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(ORDER_STATUS.ALL);
  const [isLoading, setIsLoading] = useState(false);

  // 加载订单数据
  useEffect(() => {
    loadOrders();
  }, []);

  // 根据状态筛选订单
  useEffect(() => {
    filterOrdersByStatus(activeStatus);
  }, [orders, activeStatus]);

  // 模拟加载订单数据
  const loadOrders = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      setOrders(mockOrders);
    } catch (error) {
      console.error('加载订单失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 根据状态筛选订单
  const filterOrdersByStatus = (status) => {
    if (status === ORDER_STATUS.ALL) {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === status));
    }
  };

  // 处理订单状态切换
  const handleStatusChange = (status) => {
    setActiveStatus(status);
  };

  // 处理订单详情点击
  const handleOrderPress = (orderId) => {
    // 这里可以导航到订单详情页
    console.log('查看订单详情:', orderId);
  };

  // 处理操作按钮点击
  const handleActionPress = (orderId, action, status) => {
    console.log(`订单 ${orderId} 执行 ${action} 操作`);
    
    // 模拟操作后的订单状态变化
    if (action === 'pay') {
      updateOrderStatus(orderId, ORDER_STATUS.PROCESSING);
    } else if (action === 'cancel') {
      updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
    } else if (action === 'confirm') {
      updateOrderStatus(orderId, ORDER_STATUS.COMPLETED);
    } else if (action === 'remind') {
      // 提醒发货，不改变状态
      alert('已提醒商家发货');
    }
  };

  // 更新订单状态
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  // 渲染状态筛选标签
  const renderStatusTabs = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.statusTabsContainer}
        contentContainerStyle={styles.statusTabsContent}
      >
        {Object.values(ORDER_STATUS).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusTab,
              activeStatus === status && styles.activeStatusTab
            ]}
            onPress={() => handleStatusChange(status)}
          >
            <Text 
              style={[
                styles.statusTabText,
                activeStatus === status && styles.activeStatusTabText
              ]}
            >
              {STATUS_TEXT[status]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // 渲染订单项
  const renderOrderItem = ({ item }) => {
    // 根据订单状态获取操作按钮
    const getActionButtons = () => {
      const buttons = [];
      
      switch (item.status) {
        case ORDER_STATUS.PENDING_PAYMENT:
          buttons.push(
            {
              text: '取消订单',
              type: 'cancel',
              style: styles.cancelButton
            },
            {
              text: '去付款',
              type: 'pay',
              style: styles.payButton
            }
          );
          break;
        case ORDER_STATUS.PROCESSING:
          buttons.push(
            {
              text: '提醒发货',
              type: 'remind',
              style: styles.remindButton
            }
          );
          break;
        case ORDER_STATUS.SHIPPING:
          buttons.push(
            {
              text: '确认收货',
              type: 'confirm',
              style: styles.confirmButton
            }
          );
          break;
        case ORDER_STATUS.COMPLETED:
          buttons.push(
            {
              text: '查看详情',
              type: 'detail',
              style: styles.detailButton
            },
            {
              text: '再次购买',
              type: 'rebuy',
              style: styles.rebuyButton
            }
          );
          break;
        default:
          buttons.push(
            {
              text: '查看详情',
              type: 'detail',
              style: styles.detailButton
            }
          );
          break;
      }
      
      return buttons;
    };

    // 获取订单状态样式
    const getStatusStyle = () => {
      switch (item.status) {
        case ORDER_STATUS.PENDING_PAYMENT:
          return { text: styles.pendingPaymentStatus, badge: styles.pendingPaymentBadge };
        case ORDER_STATUS.PROCESSING:
          return { text: styles.processingStatus, badge: styles.processingBadge };
        case ORDER_STATUS.SHIPPING:
          return { text: styles.shippingStatus, badge: styles.shippingBadge };
        case ORDER_STATUS.COMPLETED:
          return { text: styles.completedStatus, badge: styles.completedBadge };
        case ORDER_STATUS.CANCELLED:
          return { text: styles.cancelledStatus, badge: styles.cancelledBadge };
        default:
          return { text: styles.normalStatus, badge: styles.normalBadge };
      }
    };

    const statusStyle = getStatusStyle();
    const actionButtons = getActionButtons();

    return (
      <View style={styles.orderItem}>
        {/* 店铺信息 */}
        <TouchableOpacity 
          style={styles.shopInfo} 
          onPress={() => handleOrderPress(item.id)}
        >
          <View style={styles.shopNameContainer}>
            <Icon name="storefront-outline" size={16} color="#333" />
            <Text style={styles.shopName}>{item.shopName}</Text>
          </View>
          <View style={styles.orderStatusContainer}>
            <Text style={[styles.orderStatus, statusStyle.text]}>
              {STATUS_TEXT[item.status]}
            </Text>
            <Icon name="chevron-right" size={14} color="#999" />
          </View>
        </TouchableOpacity>

        {/* 订单商品列表 */}
        <TouchableOpacity 
          style={styles.orderItems} 
          onPress={() => handleOrderPress(item.id)}
        >
          {item.items.map((product, index) => (
            <View key={product.id} style={styles.orderItemProduct}>
              <Image 
                source={{ uri: product.image }} 
                style={styles.productImage} 
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text 
                  style={styles.productName} 
                  numberOfLines={2} 
                  ellipsizeMode="tail"
                >
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>¥{product.price.toFixed(2)}</Text>
                <Text style={styles.productQuantity}>x{product.quantity}</Text>
              </View>
            </View>
          ))}
        </TouchableOpacity>

        {/* 订单金额信息 */}
        <View style={styles.orderAmountContainer}>
          <Text style={styles.orderAmountLabel}>共{item.items.length}件商品 合计：</Text>
          <Text style={styles.orderTotalAmount}>¥{item.totalAmount.toFixed(2)}</Text>
          {item.shippingFee > 0 && (
            <Text style={styles.shippingFee}>
              （含运费¥{item.shippingFee.toFixed(2)}）
            </Text>
          )}
        </View>

        {/* 订单操作按钮 */}
        <View style={styles.orderActions}>
          {actionButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, button.style]}
              onPress={() => handleActionPress(item.id, button.type, item.status)}
            >
              <Text style={styles.actionButtonText}>{button.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 订单信息底部 */}
        <View style={styles.orderFooter}>
          <Text style={styles.orderNumber}>订单号：{item.orderNumber}</Text>
          <Text style={styles.orderTime}>下单时间：{item.createTime}</Text>
        </View>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>我的订单</Text>
        <View style={styles.headerRight} />
      </View>

      {/* 订单状态筛选 */}
      {renderStatusTabs()}

      {/* 订单列表 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      ) : filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80' }} 
            style={styles.emptyImage} 
          />
          <Text style={styles.emptyText}>暂无订单</Text>
          {activeStatus === ORDER_STATUS.ALL ? (
            <TouchableOpacity 
              style={styles.goShoppingButton} 
              onPress={() => navigation.navigate('Shopping')}
            >
              <Text style={styles.goShoppingButtonText}>去逛逛</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.goShoppingButton} 
              onPress={() => handleStatusChange(ORDER_STATUS.ALL)}
            >
              <Text style={styles.goShoppingButtonText}>查看全部订单</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.orderListContainer}
          ItemSeparatorComponent={() => <View style={styles.orderSeparator} />}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
    width: 40,
  },
  statusTabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statusTabsContent: {
    paddingHorizontal: 16,
  },
  statusTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  activeStatusTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  statusTabText: {
    fontSize: 14,
    color: '#666',
  },
  activeStatusTabText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  orderListContainer: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  shopInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  shopNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopName: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 14,
    marginRight: 8,
  },
  pendingPaymentStatus: {
    color: '#FF6B6B',
  },
  processingStatus: {
    color: '#FF9800',
  },
  shippingStatus: {
    color: '#2196F3',
  },
  completedStatus: {
    color: '#4CAF50',
  },
  cancelledStatus: {
    color: '#9E9E9E',
  },
  normalStatus: {
    color: '#666666',
  },
  pendingPaymentBadge: {
    backgroundColor: '#FFEBEE',
  },
  processingBadge: {
    backgroundColor: '#FFF3E0',
  },
  shippingBadge: {
    backgroundColor: '#E3F2FD',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  cancelledBadge: {
    backgroundColor: '#F5F5F5',
  },
  normalBadge: {
    backgroundColor: '#F5F5F5',
  },
  orderItems: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderItemProduct: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 12,
    color: '#999',
  },
  orderAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderAmountLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderTotalAmount: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  shippingFee: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    borderColor: '#DDD',
  },
  payButton: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  remindButton: {
    borderColor: '#FF9800',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  detailButton: {
    borderColor: '#2196F3',
  },
  rebuyButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  orderFooter: {
    padding: 16,
  },
  orderNumber: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 12,
    color: '#999',
  },
  orderSeparator: {
    height: 12,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 24,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 24,
  },
  goShoppingButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 24,
  },
  goShoppingButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default OrderScreen;