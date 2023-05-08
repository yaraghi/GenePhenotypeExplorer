// src/heatMapDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataPoint {
  x: string;
  y: number;
}

interface HeatMapData {
  id: string;
  data: DataPoint[];
}

const initialState: HeatMapData[] = [];

const heatMapDataSlice = createSlice({
  name: 'heatMapData',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<HeatMapData[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { save } = heatMapDataSlice.actions;
export default heatMapDataSlice.reducer;
