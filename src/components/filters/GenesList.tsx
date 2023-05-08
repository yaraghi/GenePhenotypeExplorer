import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addGene, removeGene } from './../../redux/slice/genesSlice';

type GeneProps = {
  gene: string;
  removeGene: () => void;
};

const Gene: React.FC<GeneProps> = ({ gene, removeGene }) => (
  <span>
    {gene}
    <button onClick={removeGene}>X</button>
  </span>
);

const GeneSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const genes = useSelector((state: RootState) => state.gene.genes);
  const selectedGenes = useSelector((state: RootState) => state.gene.selectedGenes);
  const dispatch = useDispatch();

  const filteredGenes = genes.filter(
    (gene) => !selectedGenes.includes(gene) && gene.includes(search)
  );



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gene = event.target.value;
    if (genes.includes(gene)) {
      dispatch(addGene(gene));
      setSearch('');
    } else {
      setSearch(gene);
    }
  };

  return (
    <div className='filterSection'>
      <label htmlFor="geneList">Filter by gene list:</label>
      <input
      id="geneList"
        type="search"
        list="gene-list"
        value={search}
        onChange={handleInputChange}
        placeholder="Search Genes"
      />
      <datalist id="gene-list">
        {filteredGenes.map((gene) => (
          <option key={gene} value={gene}>
            {gene}
          </option>
        ))}
      </datalist>
      <div className='filter genes'>
        {selectedGenes.length ? selectedGenes.map((gene) => (
          <Gene key={gene} gene={gene} removeGene={() => dispatch(removeGene(gene))} />
        )) :  <span>All Genes</span>}
      </div>
    </div>
  );
};

export default GeneSearch;