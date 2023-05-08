import HeatMap from './components/HeatMap';
import PhenotypeSystemSearch from './components/filters/PhenotypeSystemSearch';
import { useDispatch } from 'react-redux';
import GenesList from './components/filters/GenesList';
import RangeSelector from './components/filters/Percentile';
import { clearGenes } from './redux/slice/genesSlice';
import { clearPhenotypes } from './redux/slice/phenotypeSlice';
import './App.css';

const ParentComponent = () => {
  const dispatch = useDispatch();
  function clearFilters() {
    dispatch(clearGenes());
    dispatch(clearPhenotypes());
  
  }
  return (
    <div className='Section'>
      <div className='filters'>
        <GenesList />
        <RangeSelector />
        <PhenotypeSystemSearch />
        <button className='clearFilterButton' onClick={clearFilters}>Clear Filters</button>
      </div>
      <HeatMap />
    </div>
  );
};

export default ParentComponent;

