import {useDispatch, useSelector} from "react-redux";
import Thread from "./Thread";
import Post from "./Post";
import {clearPosts, presentAThread} from "../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";


const ViewChange = props => {
    const thread= useSelector(state => state.threads.thread);

    const dispatch = useDispatch()

    const changeView = index => {
        if (index===0){
            dispatch(clearPosts())
            dispatch(presentAThread(undefined))
        }
        else(
            dispatch(presentAThread(props.id))
        )
    }

    return (
        <div className={"p-4"}>
            {
                props.index===0?
                    <><Thread thread={thread[props.id]}/>
                    <button className={"btn btn-outline-primary btn-lg"} onClick={()=>changeView(1)}>See posts <FontAwesomeIcon icon={faChevronRight} /></button></>
                    :
                    <><Post id={props.id}/>
                    <button className={"btn btn-outline-primary btn-lg"} onClick={()=>changeView(0)}> <FontAwesomeIcon icon={faChevronLeft} /> Back </button></>

            }
        </div>

    )

}

export default ViewChange;