import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import css from './Filter.module.css';

// форма фільтра (підпис та інпут)

export const Filter = ({handleChange }) => {

  const filterContact = useSelector(state => state.filter)
    
  return (
    
  <div>
    <label className={css.filterLabel}>Find contacts by Name </label>
    <input
      className={css.filterName}
      type="text"
      name="filter"
      placeholder="Enter filter"
      value={filterContact}
      onChange={handleChange}
    />
    </div>
  )
};

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};