import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPost, getPosts} from "../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";


const PostCreator = props =>{
    const loginState = useSelector(state => state.login.loginState);
    const thread= useSelector(state => state.threads.thread);
    const user =useSelector(state=>state.user);
    const dispatch =useDispatch()


    const [message, setMessage] = useState({
        message:"",
        isValid:undefined});



    const onMessageInputChange = event => {
        setMessage({
            message: event.target.value,
            isValid:event.target.value.length > 0
        })
    }

    let canSubmit = message.isValid && (loginState==="logged in")

    const onSubmit = () => {
        let user_name = user.name;
        let post_time = Date.now();
        dispatch(addPost(message.message, post_time, user_name, props.id));
        dispatch(getPosts(thread[props.id].thread_id))
        clearForm();
    }

    const clearForm = () => {
        setMessage({
            message:"",
            isValid: undefined});
    }



    return (
        <div className={"p-3"}>
            <h2 className="display-6 font-weight-bold text-dark " >Replay <FontAwesomeIcon icon={faReply}/> </h2>
            <div className="row my-2">
                <label className="col-sm-3 col-form-label text-center fst-italic h5" htmlFor="message">Message:</label>
                <div className="col-sm-9">
                        <textarea id="message" className="form-control"
                                  value={message.message}
                                  onChange={e => onMessageInputChange(e)}/>
                    <div className="invalid-feedback" style={message.isValid === false ? {display:"block"} : {display: "none"}}>Message cannot be empty</div>
                </div>
            </div>


            <div className="row my-2">
                <div className="col text-end">
                    <button className="btn btn-primary btn-lg" type="submit" disabled={!canSubmit} onClick={()=>onSubmit()}>submit </button>
                </div>
            </div>

        </div>

    )


}

export default  PostCreator;