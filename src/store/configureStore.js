import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import { rootReducer } from "./reducer/combineReducer";
import logger from "redux-logger";

const persistConfig = {
  key: "simsmetalcast",
  storage,
  debut: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStorage = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, REGISTER, PERSIST, PAUSE, PURGE],
        },
      }),
      logger,
    ],
    devTools: process.env.NODE_ENV !== "production",
  });

  let persistor = persistStore(store);
  return { store, persistor };
};
