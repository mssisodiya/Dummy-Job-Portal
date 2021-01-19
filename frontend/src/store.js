import { applyMiddleware, compose, createStore } from "redux";

import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
