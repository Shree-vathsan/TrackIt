// server/routes/budgets.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { getBudgets, setBudget } = require('../controllers/budgetController.js');

// Protected routes for getting and setting budgets
router.route('/').get(auth, getBudgets).post(auth, setBudget);

module.exports = router;