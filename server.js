// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// POST endpoint to save employee data
app.post('/api/employees', (req, res) => {
  const { name, employee_id, email, phone, department, date_of_joining, role } = req.body;

  // SQL query to insert data into the table
  const query = `INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, employee_id, email, phone, department, date_of_joining, role], (err, result) => {
    if (err) {
      console.error('Error saving employee data:', err);
      return res.status(500).json({ error: 'Error saving employee data' });
    }
    res.status(201).json({ message: 'Employee added successfully', data: result });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
