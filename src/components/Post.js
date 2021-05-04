import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../redux/actions";
import PostCreator from "./PostCreator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTags,faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";

const Post =props=>{
    const thread= useSelector(state => state.threads.thread);
    const loginState = useSelector(state => state.login.loginState);
    const dispatch =useDispatch();

    useEffect(() => {
        dispatch(getPosts(thread[props.id].thread_id))
    }, [dispatch]);

    const currentPosts = useSelector(state=>state.posts.posts)
    const orderPosts = currentPosts.sort((a, b) => (a.post_time > b.post_time) ? 1 : -1)

    console.log(currentPosts)
    const time = new Date(thread[props.id].post_time)
    const postTime = time =>{
        const finalTime =new Date(time)
        return finalTime.toString()
    }


    return (
        <div className={"p-2"}>
            <h2 className={"display-5 font-weight-bold text-primary"}> Post <FontAwesomeIcon icon={faEnvelopeOpen}/></h2>
            <div className="card text-dark bg-light mb-3" key={props.id} style={{marginBottom:'1em' }}>
                <div className="card-header">Posted by: {time.toString()}</div>
                <div className="card-body">
                    <h2 className="card-title">{thread[props.id].title}</h2>
                    <h3 className="card-subtitle">From: {thread[props.id].id} </h3>
                    <h4 className="card-text text-end"> <FontAwesomeIcon icon={faTags}/> {thread[props.id].tags.toString()}</h4>
                    <p className="card-text mt-3 message">{thread[props.id].message}</p>
                </div>
            </div>

            <div>{
                orderPosts.map((post,id)=>
                    (
                        <div className="card text-dark bg-light mb-3" key={props.id} style={{marginBottom:'1em' }}>
                            <div className="card-header">Posted by: {postTime(post.post_time)}</div>
                            <div className="card-body">
                                <h3 className="card-subtitle">From: {post.id} </h3>
                                <p className="card-text mt-3 message">{post.message}</p>
                            </div>
                        </div>
                    ))

            }

            </div>
            {
                loginState === "logged in" ?
                    (<><PostCreator id={props.id}/></>) : ""
            }
        </div>

    )

}
export default Post;