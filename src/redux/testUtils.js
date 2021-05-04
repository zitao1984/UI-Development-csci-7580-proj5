import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {rootReducer} from "./store";


const customRender = (ui, initialState = {}) => {
    const mockStore = createStore(rootReducer, initialState);
    const Wrapper = ({children}) => {
        return (
            <Provider store={mockStore}>
                {children}
            </Provider>
        )
    }

    return render(ui, {wrapper: Wrapper})
}

// re-export everything
export * from "@testing-library/react";

// override render method
export {customRender as render}