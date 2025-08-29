// server/controllers/expenseController.js
const Expense = require('../models/Expense.js');
const mongoose = require('mongoose');

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
exports.getExpenses = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page, 5) || 1;
    const limit = parseInt(req.query.limit, 5) || 5;
    const skip = (page - 1) * limit;

    // Base query to find expenses for the logged-in user
    const query = { user: req.user.id };

    // Add filters based on query parameters
    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: 'i' }; // Case-insensitive search
    }
    if (req.query.startDate) {
      query.date = { ...query.date, $gte: new Date(req.query.startDate) };
    }
    if (req.query.endDate) {
      query.date = { ...query.date, $lte: new Date(req.query.endDate) };
    }

    // Get the total number of documents that match the query
    const totalExpenses = await Expense.countDocuments(query);
    
    // Find expenses using the constructed query with pagination and sort
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip);
    
    // Send back the data along with pagination details
    res.json({
      expenses,
      currentPage: page,
      totalPages: Math.ceil(totalExpenses / limit),
      totalExpenses,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Add a new expense
// @route   POST /api/expenses
// @access  Private
exports.addExpense = async (req, res) => {
  let { title, amount, category, date } = req.body; // Use 'let' instead of 'const'

  try {
    const newExpense = new Expense({
      user: req.user.id,
      title,
      amount,
      // Convert category to lowercase before saving
      category: category.toLowerCase(), 
      date,
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
exports.deleteExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    // Make sure the user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  const expenseFields = {};
  if (title) expenseFields.title = title;
  if (amount) expenseFields.amount = amount;
  if (date) expenseFields.date = date;

  // If the category is being updated, convert it to lowercase
  if (category) {
    expenseFields.category = category.toLowerCase();
  }

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    // Make sure user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: expenseFields },
      { new: true } // This option returns the document after it has been updated
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Get expense summary for the user
// @route   GET /api/expenses/summary
// @access  Private
exports.getExpenseSummary = async (req, res) => {
  try {
    // Convert the user ID string to a MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const summary = await Expense.aggregate([
      // Use the converted userId in the $match stage
      { $match: { user: userId } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    const totalExpenses = summary.reduce((acc, item) => acc + item.totalAmount, 0);

    res.json({ summary, totalExpenses });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};