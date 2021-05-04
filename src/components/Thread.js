import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTags} from "@fortawesome/free-solid-svg-icons";



const Thread=props=>{

    const time = new Date(props.thread.post_time)
    // console.log(props.thread)

    return (

        <div className="card text-dark bg-light mb-3" key={props.thread.id} style={{marginBottom:'1em' }}>
            <div className="card-header">Posted by: {time.toString()}</div>
            <div className="card-body">
                <h2 className="card-title">{props.thread.title}</h2>
                <h3 className="card-subtitle">From: {props.thread.id} </h3>
                <h4 className="card-text text-end"> <FontAwesomeIcon icon={faTags}/> {props.thread.tags.toString()}</h4>
                <p className="card-text mt-3 thread-p ">{props.thread.message}</p>
            </div>
        </div>
    )

}

export default Thread;