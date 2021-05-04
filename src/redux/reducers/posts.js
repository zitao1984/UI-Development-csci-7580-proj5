import {LOGOUT, CLEAR_POSTS, STORE_POSTS, POPULATE_POST} from "../actionConstants";

const INITIAL_STATE = {
    posts:[]
};

export const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_POSTS:
            return {posts:action.payload.posts};
        case CLEAR_POSTS:
            return{posts:action.payload.posts};
        case POPULATE_POST:
            return{posts:action.payload.posts};
        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}