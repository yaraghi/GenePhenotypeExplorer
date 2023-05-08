import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RangeState {
  percentile: number;
}

const initialState: RangeState = {
  percentile: 10, // Or any default value you want to start with
};

export const percentileSlice = createSlice({
  name: 'percentile',
  initialState,
  reducers: {
    setPercentile: (state, action: PayloadAction<number>) => {
      state.percentile = action.payload;
    },
  },
});

export const { setPercentile } = percentileSlice.actions;

export default percentileSlice.reducer;
