import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './HomeStyle';
import PlusIcon from '../../../../assets/images/plusIcon-black.svg';
import GridIcon from '../../../../assets/images/grid.svg';
import UserIcon from '../../../../assets/images/user.svg';

import PostsScreen from '../posts/PostsScreen';
import CreatePostsScreen from '../createPost/CreatePostsScreen';
import ProfileScreen from '../profile/ProfileScreen';
import CommentScreen from '../comments/CommentsScreen';
import MapScreen from '../mapScreen/MapScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, _, __ }) => {
          if (route.name === 'Posts') {
            return <GridIcon stroke={focused ? '#ffffff' : '#212121'} />;
          } else if (route.name === 'CreatePostsScreen') {
            return <PlusIcon fill={focused ? '#ffffff' : '#212121'} />;
          } else if (route.name === 'Profile')
            return <UserIcon stroke={focused ? '#ffffff' : '#212121'} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarContainer,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveBackgroundColor: '#FF6C00',
        tabBarInactiveBackgroundColor: '#ffffff',
      })}
    >
      <Screen name="Posts" component={PostsScreen} options={{ unmountOnBlur: true }} />
      <Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{ tabBarStyle: { display: 'none' }, unmountOnBlur: true }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            ...styles.tabBarContainer,
          },
          unmountOnBlur: true,
        }}
      />
      <Screen
        name="Comments"
        component={CommentScreen}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />
      <Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
          unmountOnBlur: true,
        }}
      />
    </Navigator>
  );
};

export default HomeScreen;
