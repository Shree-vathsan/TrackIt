// client/src/components/ExpenseList.jsx
import React, { useState } from 'react';
import EditExpenseModal from './EditExpenseModal.jsx';

const ExpenseList = ({ expenses, deleteExpense, updateExpense }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openModal = (expense) => {
    setSelectedExpense(expense);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedExpense(null);
  };

  return (
    <>
      <div className="expense-list">
        <h3>Your Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses found. Add one above!</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id} className="expense-item">
                {/* --- THIS IS THE PART THAT WAS MISSING --- */}
                <div className="expense-details">
                  <span className="expense-title">{expense.title}</span>
                  <span className="expense-category">{expense.category}</span>
                </div>
                <div className="expense-info">
                  <span className="expense-amount">₹{parseFloat(expense.amount).toFixed(2)}</span>
                  <span className="expense-date">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                  {/* --- END OF MISSING PART --- */}
                  <button onClick={() => openModal(expense)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteExpense(expense._id)} className="delete-btn">&times;</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedExpense && (
        <EditExpenseModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          expense={selectedExpense}
          onUpdate={updateExpense}
        />
      )}
    </>
  );
};

export default ExpenseList;