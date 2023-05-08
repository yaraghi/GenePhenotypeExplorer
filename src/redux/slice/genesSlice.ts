import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GeneState = {
  genes: string[];
  selectedGenes: string[];
};

const initialState: GeneState = {
  genes: [],
  selectedGenes: []
};

export const geneSlice = createSlice({
  name: 'gene',
  initialState,
  reducers: {
    setGenes: (state, action: PayloadAction<string[]>) => {
      state.genes = action.payload;
    },
    addGene: (state, action: PayloadAction<string>) => {
      state.selectedGenes.push(action.payload);
    },
    removeGene: (state, action: PayloadAction<string>) => {
      state.selectedGenes = state.selectedGenes.filter((gene) => gene !== action.payload);
    },
    clearGenes: (state) => {
      state.selectedGenes = [];
    },
  }
});

export const { setGenes, addGene, removeGene,clearGenes } = geneSlice.actions;
export default geneSlice.reducer;
