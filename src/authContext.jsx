import React, { useReducer } from 'react';
import MkdSDK from './utils/MkdSDK';

export const AuthContext = React.createContext();

const getAuthStatus = () => {
  const authStatus = localStorage.getItem('Auth');
  const checkAuth = authStatus ? JSON.parse(authStatus) : false;
  return checkAuth;
};

const getRole = () => {
  const role = localStorage.getItem('role');
  const result = role ? JSON.parse(role) : null;
  return result;
};

const initialState = {
  isAuthenticated: getAuthStatus(),
  user: null,
  token: null,
  role: getRole(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //TODO

      const role = action.payload.role;
      const token = action.payload.token;
      localStorage.setItem('role', JSON.stringify(role));
      localStorage.setItem('token', token);
      localStorage.setItem('Auth', JSON.stringify(true));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        role: role,
        token: token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = JSON.parse(localStorage.getItem('role'));
  if (errorMessage === 'TOKEN_EXPIRED') {
    dispatch({
      type: 'LOGOUT',
    });
    window.location.href = '/' + role + '/login';
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const validateToken = async () => {
      const role = localStorage.getItem('role');
      const isValidMessage = await sdk.check(role);
    };
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
