import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addThread} from "../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";


const ThreadCreator = ()=>{
    const loginState = useSelector(state => state.login.loginState);
   const user =useSelector(state=>state.user);
   const dispatch =useDispatch()


    const [title, setTitle] = useState({
        title:"",
        isValid: undefined});
    const [message, setMessage] = useState({
        message:"",
        isValid:undefined});
    const [tags,setTags] =useState({
        tags:[],
        isValid:undefined
    });

    const onTitleInputChange = event => {
        setTitle({
           title: event.target.value,
            isValid:event.target.value.length > 0
        })
    }

    const onMessageInputChange = event => {
        setMessage({
            message: event.target.value,
            isValid:event.target.value.length > 0
        })
    }



    const onTagsInputChange = event =>{
        let result = [];
        if (event.target.value.length > 0) {
            let list = event.target.value.split(",")
            for (let i = 0; i < list.length; i++) {
                result.push(list[i])
            }
        setTags({
                tags: result,
                isValid: true
            })
        }else{
            setTags({
                isValid: false
            })
        }
    }

    let canSubmit = tags.isValid && message.isValid && title.isValid && (loginState==="logged in")

    const onSubmit = () => {
        let user_name = user.name;
        let post_time = Date.now();
        dispatch(addThread(message.message, title.title, tags.tags, post_time, user_name));
        clearForm();


    }

    const clearForm = () => {
        setTitle({
            title:"",
            isValid: undefined});
        setMessage({
            message:"",
            isValid: undefined});
        setTags({
            tags:[],
            isValid: undefined});

    }


    return (
        <div>
            <h2 className={"display-5 font-weight-bold text-dark"}>Post a new thread <FontAwesomeIcon icon={faEnvelope}/></h2>
                <div className="row my-2">
                    <label className="col-sm-3 col-form-label  text-center fst-italic h5" htmlFor="title">Title:</label>
                    <div className="col-sm-9">
                        <input id="title" className="form-control" type="text"
                               value={title.title}
                               onChange={e => onTitleInputChange(e)}/>
                        <div className="invalid-feedback" style={title.isValid===false ? {display:"block"} : {display: "none"}}>Title cannot be empty</div>
                    </div>
                </div>

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
                    <label className="col-sm-3 col-form-label   text-center fst-italic h5" htmlFor="tags">Tags: <span className={"text-secondary"}>Multiple tags separated by comma</span></label>
                    <div className="col-sm-9">
                        <input id="tags" className="form-control" type={"text"}
                               value={tags.tags}
                               onChange={e => onTagsInputChange(e)}/>
                        <div className="invalid-feedback" style={tags.isValid===false ? {display:"block"} : {display: ""}}>tags cannot be empty</div>
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

export default  ThreadCreator;