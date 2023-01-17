import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { styles } from "./ProfileScreenStyle";
import XIcon from "../../../../assets/images/X-icon.svg";
import Logout from "../../../../assets/images/logout.svg";
import { POSTS } from "../../../../posts";
import { Post } from "../onePost/OnePost";

const ProfileScreen = ({ navigation, user: { name } }) => {
  const handleLogout = () => navigation.navigate("Login");
  const handleCommentClick = (post) => {
    navigation.navigate("Comments", { post, fromProfile: true });
  };
  const handleLocationClick = (location, title) => {
    navigation.navigate("Map", { location, title, fromProfile: true });
  };
  const lastElemId = POSTS[POSTS.length - 1].id;

  return (
    <>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../../assets/images/registerBG.png")}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          endFillColor="#FF6C00"
        >
          <View style={styles.postsContainer}>
            <View style={styles.avatarBox}>
              <TouchableOpacity
                style={styles.changeAvatarButton}
                activeOpacity={0.6}
              >
                <XIcon />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.logoutBtn}
              activeOpacity={0.6}
              onPress={handleLogout}
            >
              <Logout />
            </TouchableOpacity>

            <Text style={styles.uesrName}>{name ? name : "No nickname"}</Text>

            {POSTS.map((item) => (
              <Post
                key={item.id}
                post={item}
                lastElemId={lastElemId}
                handleCommentClick={handleCommentClick}
                handleLocationClick={handleLocationClick}
                fromProfile={true}
              />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ProfileScreen;
