import axios from "axios";
import store from "../redux/store.js";
import {setEmail, setToken, setUser} from "../redux/auth.js";
import {REACT_APP_SERVER_URL} from "@env";

export async function login({email, password}) {
  console.log("hello")
  const response = await axios.post(`${REACT_APP_SERVER_URL}/login`, {
    email,
    password
  }, {
    // headers: {
    //   'Content-Type': 'application/json',
    // }
  });

  if (response.data.token !== undefined) {
    console.log(response.data)
    store.dispatch(setToken(response.data.token));
    store.dispatch(setEmail(response.data.user.email));
    store.dispatch(setUser(response.data.user));
  }

  return response.data;
}

export const signUp = async ({email, password}) => {
  try {

    const response = await axios.post(`${REACT_APP_SERVER_URL}/signup`, {
      email,
      password
    }, {
      // headers: {
      //  'Content-Type': 'application/json',
      // }
    });
    if (response.data.token !== undefined) {
      console.log(response.data)
      store.dispatch(setToken(response.data.token));
      store.dispatch(setEmail(response.data.user.email));
      store.dispatch(setUser(response.data.user));

      return response.data;
    }
  } catch (error) {
    console.log("error in signUp", error, error?.response?.data);
  }
};

export const changePassword = async ({newPassword, userId, token}) => {
  try {
    const response = await axios.post(`${REACT_APP_SERVER_URL}/user/${userId}/password`, {
      new_password: newPassword
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in changePassword", error, error?.response?.data);
  }
}


export const getCurrentUser = async ({token, userId}) => {
  try {
    const response = await axios.get(`${REACT_APP_SERVER_URL}/user/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getCurrentUser", error, error?.response?.data);
  }
};

export const changeAvatar = async ({imageUrl, userId, token}) => {
  try {
    const response = await axios.post(`${REACT_APP_SERVER_URL}/user/${userId}/avatar`, {
      avatar: imageUrl
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in changeAvatar", error, error?.response?.data);
  }
}
