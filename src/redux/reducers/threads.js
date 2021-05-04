import { PRESENT_A_THREAD,LOGOUT,STORE_THREAD,POPULATE_THREADS} from "../actionConstants";

const INITIAL_STATE = {
    thread:{},
    tags:[],
    selectThread:undefined

};

export const threadReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_THREAD:
            return {
                thread:action.payload.thread,
                tags:action.payload.tags
            }

        case  PRESENT_A_THREAD:
            return{
                ...state,
                selectThread: action.payload.selectThread
            }

        case POPULATE_THREADS:
            return {
                thread: action.payload.thread,
                tags:action.payload.tags
            }


        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}