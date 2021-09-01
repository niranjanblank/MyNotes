import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        data: []
    },
    reducers: {
        setNoteData(state,actions){
            // console.log(actions)
            state.data = actions.payload.data
        }
    }
})

export const noteActions = noteSlice.actions;

export default noteSlice
