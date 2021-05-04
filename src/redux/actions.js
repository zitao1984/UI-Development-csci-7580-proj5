import {
    PRESENT_A_THREAD,
    CLEAR_POSTS,
    POPULATE_THREADS,
    LOGIN_NETWORK_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    INVALID_LOGIN,
    STORE_THREAD,
    STORE_POSTS,
    POPULATE_POST
} from "./actionConstants";
import firebase from "../fbConfig";
import store from "./store";
const database = firebase.firestore();

const arrayUnique =array=> {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

export const storeThread = (thread,tags) => ({
    type: STORE_THREAD,
    payload: {
        thread: thread,
        tags:tags
    }
})



export const storePosts = posts => {
    return {
        type: STORE_POSTS,
        payload: {
            posts: posts
        }
    }
}

export const presentAThread = threadId=>{

    return{
        type:PRESENT_A_THREAD,
        payload:{
            selectThread:threadId
        }

    }
}

export const clearPosts = ()=>{
    return{
        type:CLEAR_POSTS,
        payload:{
            posts:[]
        }
    }
}


export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: {
        user
    }
});

export const loginFail = () => ({
    type: INVALID_LOGIN
});

export const loginNetworkError = () => ({
    type: LOGIN_NETWORK_ERROR
});

export const logout = () => ({
    type: LOGOUT
});

export const populateThreads = (thread,tagList) => ({
    type: POPULATE_THREADS,
    payload: {
        thread:thread,
        tags:tagList
    }
})

export const populatePosts = (newPosts) => ({
    type: POPULATE_POST,
    payload: {
        posts:newPosts,
    }
})

export const validateUser = (username, password) => {
    return dispatch => {
        // UI feedback to show request initiated
        database.collection("user").where("name", "==", username).where("password", "==", password)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size === 1) {
                    const doc = querySnapshot.docs[0];
                    const user = {
                        id: doc.id,
                        name:doc.data().name,
                    }
                    dispatch(loginSuccess(user));
                } else {
                    dispatch(loginFail());
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(loginNetworkError());
            })
    }
}

export const getThreads = () => {
    let tagsList =[]
    return dispatch => {
        database.collection("thread")
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    const thread = {};
                    querySnapshot.forEach(doc => {
                       thread[doc.id] = {
                           thread_id:doc.id,
                            id:doc.data().id,
                            message:doc.data().message,
                            post_time:doc.data().post_time,
                           tags:doc.data().tags,
                           title:doc.data().title,
                        }
                        tagsList = arrayUnique(tagsList.concat(thread[doc.id].tags))
                    })
                    console.log(thread)
                    console.log(tagsList)
                    dispatch(storeThread(thread,tagsList));      }
                else {
                    console.log("No post");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const addThread =(message, title, tags, post_time, user_name)=>{
    const thread =store.getState().threads.thread;
    const tagList = store.getState().threads.tags;
    let  allTags = arrayUnique(tagList.concat(tags));
    return dispatch => {
        database.collection("thread")
            .add({
                id: user_name,
                message:message,
                title: title,
                post_time:post_time,
                tags:tags,
            })
            .then(newDoc => {
                thread[newDoc.id] = {
                    thread_id:newDoc.id,
                    id: user_name,
                    message:message,
                    title: title,
                    post_time:post_time,
                    tags:tags,
                }
                dispatch(populateThreads(thread,allTags));
            })
            .catch(error => console.log(error));
    }

}

export const getPosts = (threadId) => {
    return dispatch  => {
        database.collection("thread")
            .doc(threadId)
            .collection("posts")
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                let posts= [];
                querySnapshot.forEach(doc => {
                    posts.push({
                        post_id: doc.id,
                        id:doc.data().id,
                        message:doc.data().message,
                        post_time:doc.data().post_time,
                    })
                })
                console.log(posts)
                dispatch(storePosts(posts))}
                else{

                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const addPost =(message, post_time, user_name,thread_id)=>{
    const post =store.getState().posts.posts;
    return dispatch => {
        database.collection("thread")
            .doc(thread_id).collection("posts")
            .add({
                id: user_name,
                message:message,
                post_time:post_time,
            })
            .then(newDoc => {
                post.push({
                    post_id: newDoc.id,
                    id: user_name,
                    message:message,
                    post_time:post_time,
                })
                dispatch(populatePosts(post));
            })
            .catch(error => console.log(error));
    }

}

