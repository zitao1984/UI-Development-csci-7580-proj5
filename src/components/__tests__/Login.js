import React from "react";
import Login from "../Login";

import {render, fireEvent, screen} from "../../redux/testUtils";
import { LOGIN_STATE } from "../../redux/storeConstants";
import * as actions from "../../redux/actions";
import {INVALID_LOGIN, LOGIN_NETWORK_ERROR, LOGIN_SUCCESS} from "../../redux/actionConstants";


// DOM test 1

test("Unsuccessful login shows an alert message", () => {
    const START_STATE = {
        login: {loginState: LOGIN_STATE.LOGGED_OUT}
    }

    render(<Login/>, START_STATE);
    expect(screen.queryByRole("alert")).toBeFalsy();

    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: INVALID_LOGIN
    }))

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("alert")).toBeTruthy();
})

//DOM test 2
test(" Login error with network error shows an alert message", () => {
    const START_STATE = {
        login: {loginState: LOGIN_STATE.LOGGED_OUT}
    }

    render(<Login/>, START_STATE);

    expect(screen.queryByRole("alert")).toBeFalsy();

    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: LOGIN_NETWORK_ERROR
    }))

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeTruthy();
})


// DOM test 3
test(" Login success without  an alert message", () => {
    const START_STATE = {
        login: {loginState: LOGIN_STATE.LOGGED_OUT}
    }

    render(<Login/>, START_STATE);


    const user = {id: 200}
    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    }))

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByRole("alert")).toBeFalsy();
})

