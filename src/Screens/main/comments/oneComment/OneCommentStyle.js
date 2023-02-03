import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  commentNickname: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 10,
    color: '#212121',
  },
  commentWrap: {
    width: '100%',
    borderRadius: 6,
    padding: 16,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
    color: '#212121',
  },
  commentDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
  },
});
