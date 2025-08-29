import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Budget = ({ summaryData }) => {
  const [budgets, setBudgets] = useState({});
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch existing budgets for the month
  const getBudgets = async () => {
    try {
      const res = await axios.get('/api/budgets');
      // Convert array to a map for easy lookup: { food: 1000, shopping: 500 }
      const budgetMap = res.data.reduce((acc, budget) => {
        acc[budget.category] = budget.amount;
        return acc;
      }, {});
      setBudgets(budgetMap);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  // Handle form submission to set a new budget
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      toast.warn('Please enter both a category and an amount.');
      return;
    }
    try {
      // Send the category in lowercase to maintain consistency
      const res = await axios.post('/api/budgets', { category: category.toLowerCase(), amount });
      
      // Update the state with the new budget
      setBudgets({ ...budgets, [res.data.category]: res.data.amount });
      
      // Clear the form
      setCategory('');
      setAmount('');
      toast.success(`Budget for ${res.data.category} set successfully!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to set budget.');
    }
  };

  // --- THIS IS THE KEY CHANGE ---
  // Create a new array that only contains items from the summary
  // for which a budget has been set (budget > 0).
  const budgetedItems = summaryData.summary.filter(item => budgets[item._id] && budgets[item._id] > 0);

  return (
    <div className="budget-container">
      <h3>Set Monthly Budget</h3>
      <form onSubmit={onSubmit} className="budget-form">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g., Food)"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Budget Amount"
        />
        <button type="submit">Set Budget</button>
      </form>

      <div className="budget-progress-bars">
        <h4>Budget Progress</h4>
        {/* Check the length of our new filtered array */}
        {budgetedItems.length > 0 ? (
          // Map over the filtered array to display the progress bars
          budgetedItems.map((item) => {
            const categoryBudget = budgets[item._id];
            const spentAmount = item.totalAmount;
            const progress = (spentAmount / categoryBudget) * 100;
            const isOverBudget = progress > 100;

            return (
              <div key={item._id} className="progress-item">
                <div className="progress-labels">
                  <span style={{ textTransform: 'capitalize' }}>{item._id}</span>
                  <span>${spentAmount.toFixed(2)} / ₹{categoryBudget.toFixed(2)}</span>
                </div>
                <div className="progress-bar-background">
                  <div
                    className={`progress-bar-foreground ${isOverBudget ? 'over-budget' : ''}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No budgets set for this month's expense categories.</p>
        )}
      </div>
    </div>
  );
};

export default Budget;