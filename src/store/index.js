import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import userReducer from "./reducer/userReducer"
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  userReducer,
  form: formReducer,
});
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store