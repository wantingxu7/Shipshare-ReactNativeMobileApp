import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth';
import { configureStore } from '@reduxjs/toolkit';
import parcelReducer from "./parcel-reducer.js";
import groupsReducer from "./group-reducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcel: parcelReducer,
    group: groupsReducer,
  },
});
export default store;
