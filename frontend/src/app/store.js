import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/user/slices/userSlice";
import { userApiSlice } from "../features/user/api/userApi";
import { jobsApiSlice } from "../features/jobs/api/jobsApi";
import { applicationsApi } from "../features/applications/api/applicationsApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApiSlice.middleware)
      .concat(jobsApiSlice.middleware)
      .concat(applicationsApi.middleware),
});

export let persistor = persistStore(store);
