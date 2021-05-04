import {useDispatch} from "react-redux";
import {getThreads} from "../redux/actions";
import ThreadBoard from "../components/ThreadBoard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";



const App = () => {
    const dispatch =  useDispatch();
    dispatch(getThreads());


    return (
        <div className="container main my-4">
            <h1>Zitao's Discussion Board <FontAwesomeIcon icon={faComments} /></h1>
            <ThreadBoard/>
        </div>

    )
}

export default App;
