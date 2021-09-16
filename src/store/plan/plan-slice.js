import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
    name: 'plan',
    initialState: {
        plans: null,
        totalSum: null,
        carSum: null
    },
    reducers: {
        createPlans(state, action) {
            state.plans = action.payload.plans;
        },
        addTotalSum(state, action) {
            state.totalSum = action.payload.totalSum;
        },
        addCarSum(state, action) {
            state.carSum = action.payload.carSum;
        },
        removeAllPlanInfo(state) {
            state.plans = null;
            state.totalSum = null;
        }
    }
});

export const planActions = planSlice.actions;
export default planSlice;