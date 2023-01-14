import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Logout from "../../../../assets/images/logout.svg";
import { styles } from "./PostsScreenStyle";
import { Post } from "../onePost/OnePost";
import { POSTS } from "../../../../posts";

const PostsScreen = ({ navigation, user: { name, email } }) => {
  const lastElemId = POSTS[POSTS.length - 1].id;
  const handleLogout = () => navigation.navigate("Login");

  const handlePostClick = (post) => {
    navigation.navigate("Comments", { post });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Logout />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.userContainer}>
            <View style={styles.userPhoto}></View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        }
        style={styles.postsContainer}
        data={POSTS}
        renderItem={({ item }) => (
          <Post post={item} lastElemId={lastElemId} onClick={handlePostClick} />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default PostsScreen;
