import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./OnePostStyle";
import CommentIcon from "../../../../assets/images/message-circle.svg";
import MapPinIcon from "../../../../assets/images/map-pin.svg";
import LikeIcon from "../../../../assets/images/like-icon.svg";

export const Post = ({ post, lastElemId, onClick, fromProfile }) => {
  const location = () => {
    if (fromProfile && post.location.length > 25)
      return post.location.slice(post.location.indexOf(",") + 2);
    if (post.location.length > 32)
      return post.location.slice(post.location.indexOf(",") + 2);
    return post.location ? post.location : "No location";
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onClick(post)}>
      <View
        style={{
          ...styles.postContainer,
          marginBottom: post.id !== lastElemId ? 34 : 15,
        }}
      >
        <Image source={{ uri: post.photo }} style={styles.image} />
        <Text style={styles.post}>{post.text}</Text>
        <View style={styles.postInfoContainer}>
          <View style={styles.postInfoWrap}>
            {!fromProfile ? (
              <>
                <CommentIcon stroke="#BDBDBD" />
                <Text style={styles.commentsAndLikesNumber}>
                  {post.comments.length || 0}
                </Text>
              </>
            ) : (
              <>
                <View style={styles.commentsWrap}>
                  <CommentIcon fill="#FF6C00" stroke="#FF6C00" />
                  <Text
                    style={{
                      ...styles.commentsAndLikesNumber,
                      color: "#212121",
                    }}
                  >
                    {post.comments.length || 0}
                  </Text>
                </View>
                <View style={styles.likesWrap}>
                  <LikeIcon />
                  <Text
                    style={{
                      ...styles.commentsAndLikesNumber,
                      color: "#212121",
                    }}
                  >
                    {post.likes || 0}
                  </Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.locationWrap}>
            <MapPinIcon />
            <Text style={styles.locationText}>{location()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
