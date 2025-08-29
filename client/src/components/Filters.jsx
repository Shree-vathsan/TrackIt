// client/src/components/Filters.jsx
import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
  });

  const { category, startDate, endDate } = filters;

  const onChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters); // Pass the updated filters up to the Dashboard
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', startDate: '', endDate: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="filters-container">
      <h3>Filter Expenses</h3>
      <div className="filter-inputs">
        <input
          type="text"
          name="category"
          value={category}
          onChange={onChange}
          placeholder="Filter by category..."
        />
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={onChange}
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={onChange}
        />
        <button onClick={clearFilters} className="clear-btn">Clear</button>
      </div>
    </div>
  );
};

export default Filters;