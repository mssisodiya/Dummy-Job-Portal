import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "login",
  storage: storage,
  whitelist: ["login"], // which reducer want to store
};
const manishReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(ReduxThunk);
const store = createStore(
  manishReducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);
export { persistor, store };
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(ReduxThunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
// export default store;
