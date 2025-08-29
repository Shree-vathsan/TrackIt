// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users.js');
const expenseRoutes = require('./routes/expenses.js');
const budgetRoutes = require('./routes/budgets.js');

// ==========================================================
// ## LINE 1 THAT WAS MISSING ##
// This imports the routes we created in routes/auth.js
// ==========================================================


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes); // 2. Use expense routes
app.use('/api/budgets', budgetRoutes);
app.use('/api/users', userRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});


// ==========================================================
// ## LINE 2 THAT WAS MISSING ##
// This tells the app to use the authRoutes for any URL
// that starts with /api/auth
// ==========================================================
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});