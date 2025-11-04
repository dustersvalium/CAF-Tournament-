// Temporary server 
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5501;

// Middleware - Update this part
app.use(cors({
    origin: ['http://127.0.0.1:5501', 'http://localhost:5501', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Mock data
let teams = [
  {
    _id: '1',
    name: 'Demo Team',
    manager: 'John Doe',
    country: 'South Africa',
    rating: 85,
    players: []
  }
];

// Routes without database
app.get('/api/teams', (req, res) => {
  res.json(teams);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running with mock data' });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📊 Using mock data - no database connection`);
});