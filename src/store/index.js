import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import noteSlice from "./noteSlice";

const store = configureStore({
    reducer: {login: loginSlice.reducer, note: noteSlice.reducer}
})

export default store;
