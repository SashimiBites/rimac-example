import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
});

export default store;