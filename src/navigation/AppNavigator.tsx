import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// 引入主要屏幕组件
import HomeScreen from '../screens/HomeScreen';
// import CommunityScreen from '../screens/CommunityScreen';
// import ShoppingScreen from '../screens/ShoppingScreen';
// import PetMarketScreen from '../screens/PetMarketScreen';
// import RescueMapScreen from '../screens/RescueMapScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// 引入子屏幕组件
// import PostDetailScreen from '../screens/PostDetailScreen';
// import ProductDetailScreen from '../screens/ProductDetailScreen';
// import PetDetailScreen from '../screens/PetDetailScreen';
// import PetProfileScreen from '../screens/PetProfileScreen';
import PetKnowledgeScreen from '../screens/PetKnowledgeScreen';
// import ArticleDetailScreen from '../screens/ArticleDetailScreen';
// import ExpertDetailScreen from '../screens/ExpertDetailScreen';
// import QuestionDetailScreen from '../screens/QuestionDetailScreen';
// import OrderScreen from '../screens/OrderScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const generateIcon = (
  route: RouteProp<ParamListBase, string>,
  { focused, color, size }: { focused: boolean; color: string; size: number },
) => {
  let iconName = '';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Community') {
    iconName = focused ? 'people' : 'people-outline';
  } else if (route.name === 'Shopping') {
    iconName = focused ? 'shopping-bag' : 'shopping-bag-outline';
  } else if (route.name === 'PetMarket') {
    iconName = focused ? 'paw' : 'paw-outline';
  } else if (route.name === 'RescueMap') {
    iconName = focused ? 'map' : 'map-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const generateHeaderLeft = (
  navigation: NavigationProp<ParamListBase, string>,
) => {
  return () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={20} color="#000" />
      </TouchableOpacity>
    );
  };
};

// 创建主底部标签导航
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: props => {
          return generateIcon(route, {
            ...props,
          });
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#6E6E6E',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="PetMarket"
        component={PetMarketScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="RescueMap"
        component={RescueMapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      /> */}
    </Tab.Navigator>
  );
};

// 创建主应用导航器
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MainTabNavigator} />

      {/* 社区相关子屏幕 */}
      {/* <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: '帖子详情',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>
          ),
        })}
      /> */}

      {/* 商城相关子屏幕 */}
      {/* <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '商品详情',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>
          ),
        })}
      /> */}

      {/* 宠物市场相关子屏幕 */}
      {/* <Stack.Screen
        name="PetDetail"
        component={PetDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '宠物详情',
          headerLeft: generateHeaderLeft(navigation),
        })}
      /> */}

      {/* 个人中心相关子屏幕 */}
      {/* <Stack.Screen
        name="PetProfile"
        component={PetProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '宠物档案',
          headerLeft: generateHeaderLeft(navigation),
        })}
      /> */}

      {/* 知识科普相关子屏幕 */}
      <Stack.Screen
        name="PetKnowledge"
        component={PetKnowledgeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '宠物知识',
          headerLeft: generateHeaderLeft(navigation),
        })}
      />

      {/* <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '文章详情',
          headerLeft: generateHeaderLeft(navigation),
        })}
      /> */}

      {/* <Stack.Screen
        name="ExpertDetail"
        component={ExpertDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '专家详情',
          headerLeft: generateHeaderLeft(navigation),
        })}
      /> */}

      {/* <Stack.Screen
        name="QuestionDetail"
        component={QuestionDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '问答详情',
          headerLeft: generateHeaderLeft(navigation),
        })}
      /> */}

      {/* 订单屏幕 */}
      {/* <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: '我的订单',
          headerLeft: generateHeaderLeft(navigation),
        })}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default AppNavigator;
