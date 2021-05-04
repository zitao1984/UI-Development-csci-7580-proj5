import {
    CLEAR_POSTS,
    LOGIN_SUCCESS,
    INVALID_LOGIN,
    LOGIN_NETWORK_ERROR,
    LOGOUT,
    STORE_POSTS,
    STORE_THREAD,
    PRESENT_A_THREAD, POPULATE_POST, POPULATE_THREADS
} from "../actionConstants";
import {
    loginSuccess,
    loginFail,
    loginNetworkError,
    logout,
    validateUser,
    storePosts,
    storeThread,
    clearPosts,
    presentAThread,
    populatePosts,
    populateThreads
} from "../actions";
import * as actions from "../actions";

// Test 13 actions which is above 75% of actions

test("Create login success action", () => {
    const user = {id: 200}
    const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    }
    expect(loginSuccess(user)).toEqual(expectedAction);
})

test("Create invalid login action", () => {
    const expectedAction = {type: INVALID_LOGIN};
    expect(loginFail()).toEqual(expectedAction);
})

test("Create a network error action", () => {
    const expectedAction = {type: LOGIN_NETWORK_ERROR};
    expect(loginNetworkError()).toEqual(expectedAction);
})

test("Create a logout action", () => {
    const expectedAction = {type: LOGOUT};
    expect(logout()).toEqual(expectedAction);
})

test("Successfully store a post",()=>{
    const post = [
        {id: "zitao",
        message: "Replay↵can ↵also↵break",
        post_id: "AG2IFjlKxOmjLkVbIbtR",
        post_time: 1617686348979}
        ]
    const expectedAction = {
        type: STORE_POSTS,
        payload: {
            posts: post
        }
    }
    expect(storePosts(post)).toEqual(expectedAction);
})


test("Successfully add a post",()=>{
    const post = [
        {id: "zitao",
        message: "Replay↵can ↵also↵break",
        post_id: "AG2IFjlKxOmjLkVbIbtR",
        post_time: 1617686348979}
        ]
    const expectedAction = {
        type: POPULATE_POST,
        payload: {
            posts: post
        }
    }
    expect(populatePosts(post)).toEqual(expectedAction);
})

test("Successfully present a thread",()=>{
    const threadId = "8"

    const expectedAction ={
        type: PRESENT_A_THREAD,
         payload:{
                  selectThread:threadId
                } }

      expect(presentAThread(threadId)).toEqual(expectedAction);
})

test("Successfully clear post",()=>{

    const expectedAction ={
          type:CLEAR_POSTS,
              payload:{
                   posts:[]
             } }

    expect(clearPosts()).toEqual(expectedAction);
})

test("Successfully store a thread",()=>{
    const thread = {
        "1BHN9NL2tqRgHOxNbJja":{
    id: "mike",
    message: "okay",
    post_time: 1617686046238,
    tags: ["break"],
    thread_id: "1BHN9NL2tqRgHOxNbJja",
    title: "linebreak"
        }
    }
    const tags=["funny"]

    const expectedAction = {
        type: STORE_THREAD,
        payload: {
            thread: thread,
            tags:tags
        }
    }
    expect(storeThread(thread,tags)).toEqual(expectedAction);
})

test("Successfully add a thread",()=>{
    const thread = {
        "1BHN9NL2tqRgHOxNbJja":{
            id: "mike",
            message: "okay",
            post_time: 1617686046238,
            tags: ["break"],
            thread_id: "1BHN9NL2tqRgHOxNbJja",
            title: "linebreak"
        }
    }
    const tags=["funny"]

    const expectedAction = {
        type: POPULATE_THREADS,
        payload: {
            thread: thread,
            tags:tags
        }
    }
    expect(populateThreads(thread,tags)).toEqual(expectedAction);
})



test("Invalid user login creates login fail action", () => {
    const expectedAction = {type: INVALID_LOGIN};

    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: INVALID_LOGIN
    }))
    expect(validateUser("", "")).toEqual(expectedAction);
})

test("Valid user login creates login success action", () => {
    // Dependent on mock data
    const user = {
        name: "zitao",
    }

    const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    }
    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: LOGIN_SUCCESS,
        payload: {
            user: {
                name:"zitao"
            }
        }
    }));
    expect(validateUser("zitao", "1234")).toEqual(expectedAction);
})


