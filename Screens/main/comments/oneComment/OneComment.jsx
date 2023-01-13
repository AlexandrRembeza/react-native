import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./OneCommentStyle";

export const Comment = ({ comment, index, lastCommentId }) => {
  const [i] = useState(index + 1);

  return (
    <View
      style={{
        ...styles.commentContainer,
        marginBottom: comment.id === lastCommentId ? 0 : 24,
        flexDirection: i % 2 === 0 ? "row-reverse" : "row",
      }}
    >
      <Image source={{ uri: comment.avatar }} style={styles.avatar} />
      <View
        style={{
          ...styles.commentWrap,
          marginRight: i % 2 === 0 ? 16 : 0,
          marginLeft: i % 2 !== 0 ? 16 : 0,
          borderTopRightRadius: i % 2 === 0 ? 0 : 6,
          borderTopLeftRadius: i % 2 !== 0 ? 0 : 6,
        }}
      >
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text
          style={{
            ...styles.commentDate,
            textAlign: i % 2 !== 0 ? "right" : "left",
          }}
        >
          {comment.date}
        </Text>
      </View>
    </View>
  );
};
