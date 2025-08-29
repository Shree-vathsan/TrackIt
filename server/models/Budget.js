// server/models/Budget.js
const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // Stored as "YYYY-MM" format e.g., "2025-08"
    required: true,
  },
}, {
  timestamps: true,
});

// Create a compound index to ensure a user can only have one budget per category per month
BudgetSchema.index({ user: 1, category: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', BudgetSchema);