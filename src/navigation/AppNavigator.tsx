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
    </Tab.Navigator>
  );
};

// 导入详情页组件
import PostDetailScreen from '../screens/PostDetailScreen';

// 创建主应用导航器
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MainTabNavigator} />

      {/* 社区相关子屏幕 */}
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: '帖子详情',
          headerLeft: generateHeaderLeft(navigation),
        })}
      />
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
