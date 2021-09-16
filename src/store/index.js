import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/user-slice";
import planSlice from "./plan/plan-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        plan: planSlice.reducer
    }
});

export default store;