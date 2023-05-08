import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PhenotypeState = {
  phenotypes: string[];
  selectedPhenotypes: string[];
};

const initialState: PhenotypeState = {
  phenotypes: [],
  selectedPhenotypes: []
};

export const phenotypeSlice = createSlice({
  name: 'phenotype',
  initialState,
  reducers: {
    setPhenotypes: (state, action: PayloadAction<string[]>) => {
      state.phenotypes = action.payload;
    },
    addPhenotype: (state, action: PayloadAction<string>) => {
      state.selectedPhenotypes.push(action.payload);
    },
    removePhenotype: (state, action: PayloadAction<string>) => {
      state.selectedPhenotypes = state.selectedPhenotypes.filter((phenotype) => phenotype !== action.payload);
    },
    clearPhenotypes: (state) => {
      state.selectedPhenotypes = [];
    },
  }
});

export const { setPhenotypes, addPhenotype, removePhenotype ,clearPhenotypes } = phenotypeSlice.actions;
export default phenotypeSlice.reducer;
