import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import { categoryReducer } from "./categories";
import { userReducer } from "./user";
import { tripReducer } from "./trips";

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage
};
const categoryPersistConfig = {
  key: 'category',
  storage: AsyncStorage
};
const tripPersistConfig = {
  key: 'root',
  storage: AsyncStorage
};


export const rootReducer = combineReducers( {
  user: persistReducer( userPersistConfig, userReducer ),
  category: persistReducer( categoryPersistConfig, categoryReducer ),
  trip: persistReducer( tripPersistConfig, tripReducer ),
} );
