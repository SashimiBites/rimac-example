import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        personalInfo: null,
        plate: null
    },
    reducers: {
        addUserInfo(state, action) {
            state.personalInfo = action.payload.personalInfo;
            state.plate = action.payload.plate;
        },
        removeAllUserInfo(state) {
            state.personalInfo = null;
            state.plate = null;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;