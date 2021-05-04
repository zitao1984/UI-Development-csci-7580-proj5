import {rootReducer} from "../store";
import {LOGIN_STATE} from "../storeConstants";
import {
    LOGIN_SUCCESS,
    LOGIN_NETWORK_ERROR,
    LOGOUT,
    INVALID_LOGIN,
    CLEAR_POSTS,
    PRESENT_A_THREAD,
    STORE_POSTS,
    STORE_THREAD
} from "../actionConstants";

const TEST_STATE = {
    login: {loginState: LOGIN_STATE.LOGGED_OUT},
    user: {},
    threads: {
        thread:{},
        tags:[],
        selectThread:undefined},
    posts:{
        posts:[]
    }
}

const LOGGED_IN_STATE= {
    login: {loginState: LOGIN_STATE.LOGGED_IN},
    user: {name:"zitao"},
    threads: {
        thread:{
            "1BHN9NL2tqRgHOxNbJja":{
                id: "mike",
                message: "okay",
                post_time: 1617686046238,
                tags: ["break"],
                thread_id: "1BHN9NL2tqRgHOxNbJja",
                title: "linebreak"
            }
        },
        tags:["fun"],
        selectThread:"1BHN9NL2tqRgHOxNbJja"},
    posts:{
        posts:[
            {id: "zitao",
            message: "Replay↵can ↵also↵break",
            post_id: "AG2IFjlKxOmjLkVbIbtR",
            post_time: 1617686348979}
            ]
    }
}


test("Successful login updates login state and user info", () => {
    const user = {
        name: "zitao"
    }

    const testAction = {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    }

    const endState = {
        login: {loginState: LOGIN_STATE.LOGGED_IN},
        user: {
            name: "zitao"
        },
        threads: {
            thread:{},
            tags:[],
            selectThread:undefined},
        posts:{
            posts:[]
        }
    }
    expect(rootReducer(TEST_STATE, testAction)).toEqual(endState);
})

test("Unknown action type returns store unchanged", () => {
    expect(rootReducer(TEST_STATE, {})).toEqual(TEST_STATE);
})

test("Logout resets the store to defaults", () => {
    const testAction = {
        type: LOGOUT
    }
    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(TEST_STATE);
})

test("Invalid login sets the login state to INVALID_LOGIN", () => {
    const testAction =  {
        type:  INVALID_LOGIN
    }
    const endState = {
        login: {loginState: LOGIN_STATE.INVALID_LOGIN},
        user: {},
        threads: {
            thread:{},
            tags:[],
            selectThread:undefined},
        posts:{
            posts:[]
        }
    }

    expect(rootReducer(TEST_STATE, testAction)).toEqual(endState);
})

test("Network error sets the login state to LOGIN_NETWORK_ERROR", () => {
    const testAction =  {
        type:  LOGIN_NETWORK_ERROR
    }
    const endState = {
        login: {loginState: LOGIN_STATE.NETWORK_ERROR},
        user: {},
        threads: {
            thread:{},
            tags:[],
            selectThread:undefined},
        posts:{
            posts:[]
        }
    }

    expect(rootReducer(TEST_STATE, testAction)).toEqual(endState);
})

test("Clear posts sets the posts to empty", () => {
    const testAction =  {
        type:  CLEAR_POSTS,
        payload:{
            posts:[]
        }
    }
    const endState = {
        login: {loginState: LOGIN_STATE.LOGGED_IN},
        user: {name:"zitao"},
        threads: {
            thread:{
                "1BHN9NL2tqRgHOxNbJja":{
                    id: "mike",
                    message: "okay",
                    post_time: 1617686046238,
                    tags: ["break"],
                    thread_id: "1BHN9NL2tqRgHOxNbJja",
                    title: "linebreak"
                }
            },
            tags:["fun"],
            selectThread:"1BHN9NL2tqRgHOxNbJja"},
        posts:{
            posts:[]
        }
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Add a thread ID to selectedThread for changing the view", () => {
    const testAction =  {
        type:  PRESENT_A_THREAD,
        payload:{
            selectThread:"8"
        }
    }
    const endState = {
        login: {loginState: LOGIN_STATE.LOGGED_IN},
        user: {name:"zitao"},
        threads: {
            thread:{
                "1BHN9NL2tqRgHOxNbJja":{
                    id: "mike",
                    message: "okay",
                    post_time: 1617686046238,
                    tags: ["break"],
                    thread_id: "1BHN9NL2tqRgHOxNbJja",
                    title: "linebreak"
                }
            },
            tags:["fun"],
            selectThread:"8"},
        posts:{
            posts:[
                {id: "zitao",
                    message: "Replay↵can ↵also↵break",
                    post_id: "AG2IFjlKxOmjLkVbIbtR",
                    post_time: 1617686348979}
            ]
        }
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Store new posts under the a thread ", () => {
    const testAction =  {
        type:  STORE_POSTS,
        payload:{
            posts:["test","only"]
        }
    }
    const endState = {
        login: {loginState: LOGIN_STATE.LOGGED_IN},
        user: {name:"zitao"},
        threads: {
            thread:{
                "1BHN9NL2tqRgHOxNbJja":{
                    id: "mike",
                    message: "okay",
                    post_time: 1617686046238,
                    tags: ["break"],
                    thread_id: "1BHN9NL2tqRgHOxNbJja",
                    title: "linebreak"
                }
            },
            tags:["fun"],
            selectThread:"1BHN9NL2tqRgHOxNbJja"},
        posts:{
            posts:["test","only"]
        }
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Store a new thread ", () => {
    const testAction =  {
        type:  STORE_THREAD,
        payload:{
            thread:{test_text:"test"},
            tags:["test"]
        }
    }
    const endState = {
        login: {loginState: LOGIN_STATE.LOGGED_IN},
        user: {name:"zitao"},
        threads: {
            thread:{test_text:"test"
            },
            tags:["test"],
            selectThread:undefined},
        posts:{
            posts:[{id: "zitao",
                message: "Replay↵can ↵also↵break",
                post_id: "AG2IFjlKxOmjLkVbIbtR",
                post_time: 1617686348979}]
        }
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})



