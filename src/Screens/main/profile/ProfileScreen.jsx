import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './ProfileScreenStyle';
import XIcon from '../../../../assets/images/X-icon.svg';
import Logout from '../../../../assets/images/logout.svg';
import { Post } from '../onePost/OnePost';
import { selectUser, selectUserId } from '../../../redux/auth/authSelectors';
import { signOutUser } from '../../../redux/auth/authOperations';
import { firestore } from '../../../firebase/config';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { nickname } = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await firestore
        .collection('posts')
        .onSnapshot(data => setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    })();
  }, []);

  const handleLogout = () => dispatch(signOutUser());
  const handleCommentClick = post => {
    navigation.navigate('Comments', { post, fromProfile: true });
  };
  const handleLocationClick = (location, title) => {
    navigation.navigate('Map', { location, title, fromProfile: true });
  };

  return (
    <>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../../../assets/images/registerBG.png')}
      >
        <ScrollView contentContainerStyle={styles.container} endFillColor="#FF6C00">
          <View style={styles.postsContainer}>
            <View style={styles.avatarBox}>
              <TouchableOpacity style={styles.changeAvatarButton} activeOpacity={0.6}>
                <XIcon />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.6} onPress={handleLogout}>
              <Logout />
            </TouchableOpacity>

            <Text style={styles.uesrName}>{nickname ? nickname : 'No nickname'}</Text>

            {posts
              .sort((a, b) => Number(b.date) - Number(a.date))
              .map(item => {
                if (userId !== item.userId) return;
                return (
                  <Post
                    key={item.id}
                    post={item}
                    lastElemId={posts[posts.length - 1].id}
                    handleCommentClick={handleCommentClick}
                    handleLocationClick={handleLocationClick}
                    fromProfile={true}
                  />
                );
              })}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ProfileScreen;
