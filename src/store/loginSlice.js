import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice(
    {
        name: 'login',
        initialState: {
            loggedIn: false,
            userID: ''
        },
        reducers: {
            setLoggedInUserAndState(state, action){
                state.userID = action.payload.userID
                state.loggedIn = !state.loggedIn
            }
        }
    }
)

export const loginActions = loginSlice.actions;

export default loginSlice;