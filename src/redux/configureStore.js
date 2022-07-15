import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import { rootReducer } from "../redux/reducer/index";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const persistConfig = {
  key: "simsmetalcast",
  storage,
  debut: true, //why?
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStorage = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
