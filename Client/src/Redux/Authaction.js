// authActions.js
export const setAuthUser = (user) => ({
    type: 'SET_AUTH_USER',
    payload: user,
  });
  
  export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    payload: token,
  });
  