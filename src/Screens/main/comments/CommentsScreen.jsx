import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  Alert,
} from "react-native";
import ArrowLeftIcon from "../../../../assets/images/arrow-left.svg";
import { styles } from "./CommentsScreenStyle";
import { Comment } from "./oneComment/OneComment";
import ArrowUpIcon from "../../../../assets/images/arrow-up.svg";
import { POSTS } from "../../../../posts";
import shortid from "shortid";

const CommentScreen = ({ navigation, route }) => {
  const { fromProfile } = route.params;
  const { comments, photo, id: postId } = route.params.post;

  const [onFocus, setOnFocus] = useState(false);
  const [comment, setComment] = useState("");
  const scrollView = useRef(null);

  const addComment = () => {
    if (comment.trim()) {
      POSTS.map(({ id, comments }) => {
        if (id === postId) {
          comments.push({
            id: shortid.generate(),
            comment,
            avatar: "https://i.ibb.co/ZzF2Dw4/Ellipse.jpg",
            date: "09 June, 2020 | 09:14",
          });
        }
      });
      setComment("");
      return scrollView.current.scrollToEnd({ animated: true });
    }
    return Alert.alert("Empty comment");
  };

  const lastCommentId = (() => {
    if (comments.length === 0) return false;
    return comments[comments.length - 1].id;
  })();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Comments</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.goBackButton}
            onPress={() =>
              navigation.navigate(fromProfile ? "Profile" : "Posts")
            }
          >
            <ArrowLeftIcon stroke="rgba(33, 33, 33, 0.8)" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <ScrollView
        contentContainerStyle={styles.postWrap}
        decelerationRate="fast"
        ref={scrollView}
      >
        <Image source={{ uri: photo }} style={styles.image} />
        <View style={styles.commentsWrap}>
          {comments.map((comment, index) => (
            <Comment
              key={comment.id}
              comment={comment}
              index={index}
              lastCommentId={lastCommentId}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputWrap}>
        <View style={{ position: "relative" }}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: onFocus ? "#FF6C00" : "#E8E8E8",
              backgroundColor: onFocus ? "#ffffff" : "#F6F6F6",
            }}
            value={comment}
            onChangeText={(text) => setComment(text)}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            multiline={true}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            cursorColor="#BDBDBD"
          />
          <TouchableOpacity
            style={{
              ...styles.inputButton,
              backgroundColor: comment.trim() ? "#FF6C00" : "#BDBDBD",
            }}
            activeOpacity={0.6}
            onPress={addComment}
          >
            <ArrowUpIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;
