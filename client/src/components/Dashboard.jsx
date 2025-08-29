import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';
import ExpenseForm from './ExpenseForm.jsx';
import ExpenseList from './ExpenseList.jsx';
import Summary from './Summary.jsx';
import Budget from './Budget.jsx';
import Pagination from './Pagination.jsx';
import Filters from './Filters.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [summaryData, setSummaryData] = useState({ summary: [], totalExpenses: 0 });
  const [showFilters, setShowFilters] = useState(false);

  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [activeFilters, setActiveFilters] = useState({});

  // Fetches the filtered list of expenses
  const getExpenses = useCallback(async (filters, page = 1) => {
    try {
      const queryParams = { ...filters, page };
      const res = await axios.get('/api/expenses', { params: queryParams });
      
      setExpenses(res.data.expenses);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  // Fetches the summary data for the chart and budget
  const getSummary = useCallback(async () => {
    try {
      const res = await axios.get('/api/expenses/summary');
      setSummaryData(res.data);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  // Fetch initial data on component load
  useEffect(() => {
    getExpenses();
    getSummary();
  }, [getExpenses, getSummary]);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    getExpenses(filters, 1); // Reset to page 1 when filters change
  };

   const handlePageChange = (page) => {
    getExpenses(activeFilters, page); // Fetch new page with existing filters
  };

  // Adds a new expense
  const addExpense = async (formData) => {
    try {
      await axios.post('/api/expenses', formData);
      getExpenses(activeFilters, 1); // Refresh expenses to page 1
      getSummary();
      toast.success('Expense Added!');
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to add expense!');
    }
  };

  const updateExpense = async (id, updatedData) => {
    try {
      const res = await axios.put(`/api/expenses/${id}`, updatedData);
      // Update the expense in the list
      setExpenses(
        expenses.map((expense) => (expense._id === id ? res.data : expense))
      );
      // Refresh summary data
      getSummary();
      toast.success('Expense Updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update expense.');
    }
  };

  // Deletes an expense
   const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      getExpenses(activeFilters, pagination.currentPage); // Refresh current page
      getSummary();
      toast.success('Expense Deleted!');
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to delete expense.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
  {/* The welcome message can now serve as the header */}
  <h2 className="welcome-message">Welcome, <span className='username-Welcome'> {user ? (user.name || user.email) : 'Guest'}!</span></h2>
</header>
      
      

      <div className="dashboard-layout">
         
        {/* Top section for the expense form */}
        <div className="expense-form-section">
          <ExpenseForm addExpense={addExpense} />
        </div>

        {/* Mid section for budget and summary pie chart */}
        <div className="stats-section">
          <div className="budget-wrapper">
            <Budget summaryData={summaryData} />
          </div>
          <div className="summary-wrapper">
            <Summary summaryData={summaryData} />
          </div>
        </div>

        {/* Bottom section for filters and the full-width expense list */}
        <div className="expense-list-section">
          <div className="expense-list-header">
            <h3>Your Expenses</h3>
            <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)} title="Toggle Filters">
              🔍
            </button>
          </div>
          {showFilters && <Filters onFilterChange={handleFilterChange} />}
          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            updateExpense={updateExpense}
          />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;