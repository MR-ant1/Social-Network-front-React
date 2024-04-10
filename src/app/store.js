
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import detailSlice from "./slices/postDetailSlice";


const reducers = combineReducers({
  user: userSlice,
  detail: detailSlice
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'SECRETO',
      onError: function (error) {
        throw new Error(error)
      }
    })
  ]
};


const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});