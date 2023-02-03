import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './OneCommentStyle';
import { selectUserId } from '../../../../redux/auth/authSelectors';

export const Comment = ({ comment, index, lastCommentId }) => {
  const [i] = useState(index + 1);
  const userId = useSelector(selectUserId);

  const { comment: text, commentAuthor, date } = comment;
  const isCurrentUserComment = userId === commentAuthor.id;

  return (
    <View
      style={{
        ...styles.commentContainer,
        marginBottom: comment.id === lastCommentId ? 0 : 24,
      }}
    >
      <Text
        style={{ ...styles.commentNickname, textAlign: isCurrentUserComment ? 'right' : 'left' }}
      >
        {commentAuthor.nickname}
      </Text>
      <View
        style={{
          ...styles.commentWrap,
          backgroundColor: isCurrentUserComment ? 'rgb(255, 112, 9)' : 'rgba(0, 0, 0, 0.03)',
        }}
      >
        <Text style={styles.commentText}>{text}</Text>
        <Text
          style={{
            ...styles.commentDate,
            textAlign: isCurrentUserComment ? 'right' : 'left',
            color: isCurrentUserComment ? '#ffffff' : '#BDBDBD',
          }}
        >
          {new Date(Number(date)).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};
