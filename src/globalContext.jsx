import React, { useEffect, useReducer } from 'react';
import MkdSDK from './utils/MkdSDK';
export const GlobalContext = React.createContext();

const initialState = {
  globalMessage: '',
  isOpen: true,
  path: '',
  video: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SNACKBAR':
      return {
        ...state,
        globalMessage: action.payload.message,
      };
    case 'SETPATH':
      return {
        ...state,
        path: action.payload.path,
      };
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };

    case 'GET-VIDEOS':
      return {
        ...state,
        videos: action.payload,
      };

    default:
      return state;
  }
};

export const showToast = (dispatch, message, timeout = 3000) => {
  dispatch({
    type: 'SNACKBAR',
    payload: {
      message,
    },
  });

  setTimeout(() => {
    dispatch({
      type: 'SNACKBAR',
      payload: {
        message: '',
      },
    });
  }, timeout);
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchVideos = async () => {
      let sdk = new MkdSDK();
      sdk.setTable('video');
      const videos = await sdk.callRestAPI({}, 'PAGINATE');
      console.log(videos);
      dispatch({ type: 'GET-VIDEOS', payload: videos });
    };
    fetchVideos();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
