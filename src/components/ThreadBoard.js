import ViewChange from "./ViewChange";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ThreadCreator from "./ThreadCreator";
import {getThreads, logout} from "../redux/actions";
import Login from "./Login";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt,faTags,faMailBulk,faFilter} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";



const ThreadBoard = () => {
    const tagChoice = useSelector(state => state.threads.tags);
    console.log(tagChoice)
    const thread= useSelector(state => state.threads.thread);
    const loginState = useSelector(state => state.login.loginState);
    const selectedThread = useSelector(state => state.threads.selectThread);

    const [tagSet,decideTagSet]=useState([])
    const dispatch =  useDispatch();

    const state =useSelector(state => state)
    console.log(state)


    const updateTagChoice = event=>{
        let target = event.target
        let value = Array.from(target.selectedOptions, option => option.value);
        decideTagSet([...value]);
    }

    const quickLogOut =()=>{
        dispatch(logout())
        dispatch(getThreads());

    }


    const ids = Object.keys(thread).sort(function(a,b){return -1*(thread[a].post_time-thread[b].post_time)})

    return (
        <>{
            Object.keys(thread).length===0?
                <Loading/>:
                (selectedThread === undefined?
                (
                    <>
                        <div className={"filter"}>
                        <h2 className={"display-5 font-weight-bold text-success"}>Filter <FontAwesomeIcon icon={faFilter}/></h2>
                            <div className="container my-4">
                                <div className="row my-2">
                                    <label className="col-sm-2 col-form-label" htmlFor="selectCategory"><p className={"h3 text-center text-success fst-italic"}><FontAwesomeIcon icon={faTags}/> Tags: </p></label>
                                    <div className="col-sm-10">
                                        <select id="selectCategory" className="form-select" multiple onChange={updateTagChoice}>
                                            <option value=" " disabled className={"option"}>Select one/multiple tags (by using Ctrl+click to select multiple, Ctrl + double click to unselect)</option>
                                            {
                                                tagChoice.map((tag,id) =>
                                                    <option key={id} value={tag} className={"option"}>{tag}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className={"display-5 font-weight-bold text-primary"}>Threads <FontAwesomeIcon icon={faMailBulk}/></h2>
                        <div className={"thread"}>

                            {
                                tagSet.length===0?
                                    (ids.map(id => (
                                        <ViewChange id={id} index={0}/>
                                    ), thread)):
                                    (ids.map(id => (
                                        thread[id].tags.filter(value => tagSet.includes(value)).length>0?
                                            <ViewChange id={id} index={0}/>:""
                                    ), thread))

                            }
                        </div>


                        <div>
                            {loginState === "logged in" ?
                                (<div>
                                        <div className={"bottom-container"}>
                                            <ThreadCreator/>
                                        </div>
                                        <div className={"d-grid gap-2 col-6 mx-auto"}>
                                            <button className="btn btn-warning " type="button"
                                                    onClick={()=>quickLogOut()}>
                                                logout <FontAwesomeIcon icon={faSignOutAlt}/>
                                            </button>
                                        </div>
                                    </div>
                                ) : <Login/>}
                        </div>
               </>
                )
                :
                (
                    <>
                        <ViewChange id={selectedThread} index={1}/>
                    </>
                ))
        }
      </>
)

}
export default ThreadBoard;