const initialState = {
  token: null,
};

const SET_TOKEN = 'auth/SET_TOKEN';
const REMOVE_TOKEN = 'auth/REMOVE_TOKEN';
const SET_EMAIL = 'auth/SET_EMAIL';
const SET_USER = 'auth/SET_USER';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
