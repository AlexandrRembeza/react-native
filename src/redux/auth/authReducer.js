import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signInUser, signUpUser, signOutUser, currentUser } from './authOperations';

const extraActions = [signInUser, signUpUser, currentUser];
const getActionsWithType = type => extraActions.map(el => el[type]);

const initialState = {
  userId: null,
  nickname: '',
  email: '',
  isLoggedIn: false,
  error: null,
};

const onUserAuthFulfilled = (state, { payload }) => {
  if (!payload) return { ...state, isLoggedIn: false };
  return {
    ...state,
    isLoggedIn: payload.isLoggedIn,
    nickname: payload.displayName,
    email: payload.email,
    userId: payload.uid,
    error: null,
  };
};
const onUserAuthRejected = (state, { payload }) => ({ ...state, error: payload.error });
const onUserSignOutFulfilled = () => ({ ...initialState });
const clearError = state => ({ ...state, error: null });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateError: clearError,
  },
  extraReducers: builder => {
    builder
      .addCase(signOutUser.fulfilled, onUserSignOutFulfilled)
      .addMatcher(isAnyOf(...getActionsWithType('fulfilled')), onUserAuthFulfilled)
      .addMatcher(isAnyOf(...getActionsWithType('rejected')), onUserAuthRejected);
  },
});

export const authReducer = authSlice.reducer;
export const { updateError } = authSlice.actions;
