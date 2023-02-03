import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import useRoute from '../../route';
import { currentUser } from '../../redux/auth/authOperations';
import { selectState, selectIsLoggedIn } from '../../redux/auth/authSelectors';

export default function Main() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    (async () => await dispatch(currentUser()))();
  }, [dispatch]);

  const routing = useRoute(isLoggedIn);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
