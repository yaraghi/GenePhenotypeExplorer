import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addPhenotype, removePhenotype } from './../../redux/slice/phenotypeSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

type PhenotypeProps = {
  phenotype: string;
  removePhenotype: () => void;
};

const Phenotype: React.FC<PhenotypeProps> = ({ phenotype, removePhenotype }) => (
  <span>
    {phenotype}
    <button onClick={removePhenotype}>X</button>
  </span>
);

const PhenotypeSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const phenotypes = useSelector((state: RootState) => state.phenotype.phenotypes);
  const selectedPhenotypes = useSelector((state: RootState) => state.phenotype.selectedPhenotypes);
  const dispatch = useDispatch();

  const filteredPhenotypes = phenotypes.filter(
    (phenotype) => !selectedPhenotypes.includes(phenotype) && phenotype.includes(search)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phenotype = event.target.value;
    if (phenotypes.includes(phenotype)) {
      dispatch(addPhenotype(phenotype));
      setSearch('');
    } else {
      setSearch(phenotype);
    }
  };

  return (
    <div className='filterSection'>
      <label htmlFor="phenotypesList">Filter by significant phenotype system:</label>

      <input
        id="phenotypesList"
        type="search"
        list="phenotype-list"
        value={search}
        onChange={handleInputChange}
        placeholder="Search phenotypes"
      />
      <datalist id="phenotype-list">
        {filteredPhenotypes.map((phenotype) => (
          <option key={phenotype} value={phenotype}>
            {phenotype}
          </option>
        ))}
      </datalist>
      <div className='filter phenotype'>
        {selectedPhenotypes.length ? selectedPhenotypes.map((phenotype) => (
          <Phenotype key={phenotype} phenotype={phenotype} removePhenotype={() => dispatch(removePhenotype(phenotype))} />
        )) : <span>All phenotypes</span>}
      </div>
    </div>
  );
};

export default PhenotypeSearch;