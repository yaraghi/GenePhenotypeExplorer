import { configureStore } from '@reduxjs/toolkit';
import phenotypeReducer from './slice/phenotypeSlice';
import geneReducer from './slice/genesSlice';
import heatMapDataReducer from './slice/heatMapDataSlice';
import percentileReducer from './slice/percentileSlice';

export const store = configureStore({
  reducer: {
    phenotype: phenotypeReducer,
    gene: geneReducer,
    heatMapData: heatMapDataReducer,
    percentile: percentileReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
