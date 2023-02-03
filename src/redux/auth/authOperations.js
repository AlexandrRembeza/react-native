import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase/config';

const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({ userEmail, password, name }, thunkAPI) => {
    try {
      await auth.createUserWithEmailAndPassword(userEmail, password);
      await auth.currentUser.updateProfile({ displayName: name });
      const { displayName, uid, email } = await auth.currentUser;
      return { displayName, uid, email, isLoggedIn: true };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const signInUser = createAsyncThunk('auth/signIn', async ({ userEmail, password }, thunkAPI) => {
  try {
    const {
      user: { displayName, uid, email },
    } = await auth.signInWithEmailAndPassword(userEmail, password);
    return { displayName, uid, email, isLoggedIn: true };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const signOutUser = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    await auth.signOut();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const currentUser = createAsyncThunk('auth/currentUser', async (_, thunkAPI) => {
  try {
    let res = null;
    await auth.onAuthStateChanged(user => {
      if (!user) return (res = false);
      const { displayName, uid, email } = user;
      res = { displayName, uid, email, isLoggedIn: true };
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export { signUpUser, signInUser, signOutUser, currentUser };
