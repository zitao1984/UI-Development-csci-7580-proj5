import {createStore, combineReducers, applyMiddleware} from "redux";
import {loginReducer} from "./reducers/login";
import {userReducer} from "./reducers/user";
import {threadReducer} from "./reducers/threads";
import {postReducer} from "./reducers/posts";
import thunkMiddleware from "redux-thunk";

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    threads: threadReducer,
    posts:postReducer
})




export default createStore(rootReducer, applyMiddleware(thunkMiddleware));