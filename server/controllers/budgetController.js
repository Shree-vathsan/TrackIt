// server/controllers/budgetController.js
const Budget = require('../models/Budget.js');

// @desc    Get all budgets for the current month
// @route   GET /api/budgets
// @access  Private
exports.getBudgets = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const currentMonth = `${year}-${month}`;

    const budgets = await Budget.find({ user: req.user.id, month: currentMonth });
    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Set or update a budget for a category
// @route   POST /api/budgets
// @access  Private
exports.setBudget = async (req, res) => {
  const { category, amount } = req.body;

  try {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const currentMonth = `${year}-${month}`;

    // Use findOneAndUpdate with 'upsert: true'
    // This will update the budget if it exists, or create it if it doesn't.
    const budget = await Budget.findOneAndUpdate(
      { user: req.user.id, category: category, month: currentMonth },
      { amount: amount },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};