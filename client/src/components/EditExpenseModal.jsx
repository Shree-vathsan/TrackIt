// client/src/components/EditExpenseModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Style for the modal (to match our dark theme)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2d3748', // var(--surface-color)
    color: '#e2e8f0', // var(--text-color)
    border: '1px solid #4a5568', // var(--border-color)
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
  },
  overlay: {
    backgroundColor: 'rgba(26, 32, 44, 0.75)'
  }
};

Modal.setAppElement('#root'); // Important for accessibility

const EditExpenseModal = ({ isOpen, onRequestClose, expense, onUpdate }) => {
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', date: '' });

  // When the 'expense' prop changes, update the form data
  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        // Format the date correctly for the input[type=date]
        date: new Date(expense.date).toISOString().split('T')[0]
      });
    }
  }, [expense]);

  const { title, amount, category, date } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate(expense._id, formData);
    onRequestClose(); // Close the modal after submitting
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Edit Expense">
      <form className="expense-form" onSubmit={onSubmit}>
        <h3>Edit Expense</h3>
        <input type="text" name="title" value={title} onChange={onChange} required />
        <input type="number" name="amount" value={amount} onChange={onChange} required />
        <input type="text" name="category" value={category} onChange={onChange} required />
        <input type="date" name="date" value={date} onChange={onChange} required />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{ flex: 1 }}>Save Changes</button>
          <button type="button" onClick={onRequestClose} style={{ flex: 1, backgroundColor: '#718096' }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditExpenseModal;