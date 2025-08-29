import React, { useState, useEffect } from 'react';
import axios from 'axios'; // We'll use axios for the new API call too
import API from '../api';

const ExpenseForm = ({ addExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  const { title, amount, category, date } = formData;
  const [suggestion, setSuggestion] = useState('');

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // // This useEffect will run whenever the 'title' changes
  // useEffect(() => {
  //   // A simple debounce check to avoid sending too many requests
  //   const timer = setTimeout(() => {
  //     if (title.length > 3) { // Only fetch suggestion if title is long enough
  //       fetchSuggestion(title);
  //     } else {
  //       setSuggestion(''); // Clear suggestion if title is too short
  //     }
  //   }, 500); // Wait 500ms after user stops typing

  //   return () => clearTimeout(timer); // Cleanup timer
  // }, [title]);

  // const fetchSuggestion = async (expenseTitle) => {
  //   try {
  //     // Call our new Python AI service
  //     const res = await axios.post('http://localhost:5001/predict', { title: expenseTitle });
  //     if (res.data.category) {
  //       setSuggestion(res.data.category);
  //     }
  //   } catch (err) {
  //     console.error("Could not fetch category suggestion:", err);
  //     setSuggestion(''); // Clear suggestion on error
  //   }
  // };

  // const useSuggestion = () => {
  //   if (suggestion) {
  //     setFormData({ ...formData, category: suggestion });
  //     setSuggestion(''); // Clear suggestion after using it
  //   }
  // };
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert('Please fill out all fields');
      return;
    }
    addExpense(formData);
    setFormData({ title: '', amount: '', category: '', date: '' });
  };

  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <h3>Add New Expense</h3>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Expense Title (e.g., Coffee)"
        required
      />
      <div className="category-container">
        <input
          type="text"
          name="category"
          value={category}
          onChange={onChange}
          placeholder="Category (e.g., Food)"
          required
        />
        {/* Display the suggestion as a clickable button */}
        {suggestion && category !== suggestion && (
          <button type="button" className="suggestion-btn" onClick={useSuggestion}>
            Suggest: {suggestion}
          </button>
        )}
      </div>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={onChange}
        placeholder="Amount"
        required
      />
      <input
        type="date"
        name="date"
        value={date}
        onChange={onChange}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;