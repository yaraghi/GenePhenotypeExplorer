import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPercentile } from '../../redux/slice/percentileSlice'; 

const RangeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const range = useSelector((state: RootState) => state.percentile);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    dispatch(setPercentile(value));
  };

  return (
    <div className='filterSection'>
      <label htmlFor="percentile">Filter top {range.percentile}% of the genes that have the highest phenotype count : </label> 
      <input
        type="range"
        id="percentile"
        name="percentile"
        min={0}
        max={100}
        value={range.percentile}
        onChange={handleChange}
      />
    </div>
  );
};

export default RangeSelector;
