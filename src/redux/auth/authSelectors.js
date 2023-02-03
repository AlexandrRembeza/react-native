export const selectIsLoggedIn = ({ auth }) => auth.isLoggedIn;
export const selectUser = ({ auth: { nickname, email } }) => ({ nickname, email });
export const selectError = ({ auth }) => auth.error;
export const selectUserId = ({ auth }) => auth.userId;
