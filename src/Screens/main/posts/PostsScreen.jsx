import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Logout from '../../../../assets/images/logout.svg';
import { styles } from './PostsScreenStyle';
import { Post } from '../onePost/OnePost';
import { signOutUser } from '../../../redux/auth/authOperations';
import { selectUser } from '../../../redux/auth/authSelectors';
import { firestore } from '../../../firebase/config';

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { nickname, email } = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  const handleLogout = () => dispatch(signOutUser());
  const handleCommentClick = post => navigation.navigate('Comments', { post });
  const handleLocationClick = (location, title) => {
    navigation.navigate('Map', { location, title });
  };

  useEffect(() => {
    (async () => {
      await firestore
        .collection('posts')
        .onSnapshot(data => setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.logoutButton} onPress={handleLogout}>
          <Logout />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.userContainer}>
            <View style={styles.userPhoto}></View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{nickname}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        }
        style={styles.postsContainer}
        data={posts.sort((a, b) => Number(b.date) - Number(a.date))}
        renderItem={({ item }) => (
          <Post
            post={item}
            lastElemId={posts[posts.length - 1].id}
            handleCommentClick={handleCommentClick}
            handleLocationClick={handleLocationClick}
          />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default PostsScreen;
