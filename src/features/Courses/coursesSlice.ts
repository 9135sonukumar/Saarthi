import {createSlice} from '@reduxjs/toolkit';

type CourseState = {
  purchaseList: Array<any>;
};

const initialState: CourseState = {
  purchaseList: [],
};

const coursesSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    savePurchasesCourse: (state, {payload}) => {
      state.purchaseList = payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {savePurchasesCourse} = coursesSlice.actions;

export default coursesSlice.reducer;
