// server/routes/expenses.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Import the auth middleware
const {
  getExpenses,
  addExpense,
  deleteExpense,
  getExpenseSummary,
  updateExpense,
} = require('../controllers/expenseController.js');

//Add the summary route here
router.get('/summary', auth, getExpenseSummary);
// All these routes are protected. The 'auth' middleware will run before the controller function.
router.route('/').get(auth, getExpenses).post(auth, addExpense);

router.route('/:id').delete(auth, deleteExpense).put(auth, updateExpense);

module.exports = router;