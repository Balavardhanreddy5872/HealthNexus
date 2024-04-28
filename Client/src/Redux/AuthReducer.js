// authReducer.js
const initialState = {
    user: null,
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_USER':
        return { ...state, user: action.payload };
      case 'SET_AUTH_TOKEN':
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  