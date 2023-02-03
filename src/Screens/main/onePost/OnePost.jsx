import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from './OnePostStyle';
import CommentIcon from '../../../../assets/images/message-circle.svg';
import MapPinIcon from '../../../../assets/images/map-pin.svg';
import LikeIcon from '../../../../assets/images/like-icon.svg';
import { firestore } from '../../../firebase/config';

export const Post = ({
  post,
  lastElemId,
  handleCommentClick,
  handleLocationClick,
  fromProfile,
}) => {
  const [commentsLength, setCommentsLength] = useState(0);

  useEffect(() => {
    (async () => {
      await firestore
        .collection('posts')
        .doc(post.id)
        .collection('comments')
        .onSnapshot(data => setCommentsLength(data.docs.length));
    })();
  }, []);

  const location = () => {
    if (fromProfile && post.location.length > 25)
      return post.location.slice(post.location.indexOf(',') + 2);
    if (post.location.length > 32) return post.location.slice(post.location.indexOf(',') + 2);
    return post.location ? post.location : 'No location';
  };

  return (
    <View
      style={{
        ...styles.postContainer,
        marginBottom: post.id !== lastElemId ? 34 : 15,
      }}
    >
      <Image source={{ uri: post.photo }} style={styles.image} />
      <Text style={styles.post}>{post.postText}</Text>
      <View style={styles.postInfoContainer}>
        <View style={styles.postInfoWrap}>
          {!fromProfile ? (
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              activeOpacity={0.6}
              onPress={() => handleCommentClick(post)}
            >
              <CommentIcon stroke="#BDBDBD" />
              <Text style={styles.commentsAndLikesNumber}>{commentsLength}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.commentsWrap}
                activeOpacity={0.6}
                onPress={() => handleCommentClick(post)}
              >
                <CommentIcon fill="#FF6C00" stroke="#FF6C00" />
                <Text
                  style={{
                    ...styles.commentsAndLikesNumber,
                    color: '#212121',
                  }}
                >
                  {commentsLength}
                </Text>
              </TouchableOpacity>

              <View style={styles.likesWrap}>
                <LikeIcon />
                <Text
                  style={{
                    ...styles.commentsAndLikesNumber,
                    color: '#212121',
                  }}
                >
                  {post.likes || 0}
                </Text>
              </View>
            </>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.locationWrap}
          onPress={() => {
            if (post.exactLocation) return handleLocationClick(post.exactLocation, post.postText);
            Alert.alert("Don't have photo location");
          }}
        >
          <MapPinIcon />
          <Text style={styles.locationText}>{location()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
