import { useDispatch, useSelector } from 'react-redux';
import { filterGange } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import css from './Filter.module.css';

// форма фільтра (підпис та інпут)

export const Filter = () => {
  const filter = useSelector(getFilter) 
  const dispatch = useDispatch();
  const handleChange = e => {
      const { value } = e.target;
      dispatch (filterGange(value))
    };
    
  return (
    
  <div>
    <label className={css.filterLabel}>Find contacts by Name </label>
    <input
      className={css.filterName}
      type="text"
      name="filter"
      placeholder="Enter filter"
      value={filter}
      onChange={handleChange}
    />
    </div>
  )
};