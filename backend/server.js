//Using this to demo server functionality on site since MongoDb won't respond
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Team = require('./models/Team');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with better logging
console.log('🔍 Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10 second timeout
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('💡 Make sure your MongoDB Atlas IP whitelist includes your current IP');
});

// Routes
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Add some demo data if database is empty
app.post('/api/seed-demo', async (req, res) => {
  try {
    const demoTeams = [
      {
        name: 'Nigeria',
        manager: 'Jose Peseiro',
        country: 'Nigeria',
        rating: 78.4,
        players: []
      },
      {
        name: 'Ivory Coast', 
        manager: 'Emerse Fae',
        country: 'Ivory Coast',
        rating: 76.2,
        players: []
      },
      {
        name: 'Egypt',
        manager: 'Hossam Hassan',
        country: 'Egypt',
        rating: 75.8,
        players: []
      }
    ];
    
    // Clear existing teams and add demo data
    await Team.deleteMany({});
    const teams = await Team.insertMany(demoTeams);
    
    res.json({ message: 'Demo data added successfully', teams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 MongoDB Server running on http://localhost:${PORT}`);
  console.log(`📊 Teams API: http://localhost:${PORT}/api/teams`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});