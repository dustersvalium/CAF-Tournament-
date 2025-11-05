🏆 CAF African Nations League Tournament Simulator

A comprehensive web application for managing and simulating the African Nations League football tournament. Features team management, match simulation with AI commentary, role-based authentication, and real-time data persistence.
🌟 Features

🎮 Core Functionality

Tournament Management - Complete match scheduling and simulation
AI Match Commentary - Realistic play-by-play commentary during simulations
Team Registration - Dynamic team creation with player rosters
Role-Based Access - Separate interfaces for Administrators and Team Representatives
Live Data Persistence - Firebase Firestore integration for cloud data storage

👥 User Roles

Administrator - Full tournament control, match simulation
Federation Representative - Team management, registration, squad viewing

📊 Match System

Interactive match simulation with realistic scoring
Detailed match reports with goal timelines
Player statistics and team lineups
Tournament reset functionality for demos

🚀 Quick Start

Prerequisites

Modern web browser (Chrome, Firefox, Safari, Edge)
Code editor (VS Code recommended)
Live Server extension (by Ritwick Dey)
Installation & Local Development

Download Project ZIP
Extract folder
Open VS Code
Click "Open Folder"
Navigate to the extracted CAFPROJECT folder

Install Live Server Extension

Open VS Code Extensions 
Search for "Live Server" by Ritwick Dey
Install the extension
Run the Application

Right-click on frontend/html/index.html
Select "Open with Live Server" OR (cmd+L+O)
Application opens at http://127.0.0.1:5503
Demo Login Credentials

Role	Email	Password	Access
Administrator|	Email: admin@caf.com	Password: admin123	==> Home,Matches, Simulation
Federation Representative|	Email: rep@caf.com	Password: rep123 ==>	Home,Teams, Registration

🏗️ Project Structure

caf-tournament/
├──backend/
|  ├──models
|    ├──Team.js                 
|  ├── api-server.js
|  ├── final-serve.js
|  ├── package-lock.json
|  ├── package.json
|  ├── simple-server.js
|  ├── test-server.js
|  └── test.js
|
|
|
├── frontend/
│   ├── html/
│   │   ├── index.html          # Dashboard & tournament overview
│   │   ├── login.html          # Authentication portal
│   │   ├── matches.html        # Match schedule & management
│   │   ├── teams.html          # Team directory & ratings
│   │   ├── simulate.html       # Match simulation controls
│   │   ├── register-team.html  # Team registration form
│   │   ├── team-details.html   # Squad management view
│   │   └── match-details.html  # Match analysis & statistics
│   ├── js/
│   │   ├── app.js              # Main application logic
│   │   ├── data.js             # Data management & localStorage
│   │   ├── auth.js             # Authentication & role management
│   │   ├── firebase-config.js  # Firebase service configuration
│   │   ├── firebase-db.js      # Cloud database operations
│   │   ├── team-registration.js
│   │   ├── team-details.js
│   │   └── match-details.js
│   └── css/
│       └── style.css           # Custom styling & theme
└── README.md

🎯 User Guide

For Administrator (admin@caf.com)

Tournament Overview

Access to the home page of a simple dashboard with tournament statistics:
View upcoming and completed matches
Match Simulation

Navigate to Simulate page
Click "Simulate Match" on any scheduled match
Watch real-time AI commentary
View detailed match reports
Match Management

Click any match to view detailed timeline
Analyze goals, statistics, and player performance
Access comprehensive match data

For Team Representatives (rep@caf.com)

Team Directory

Browse all tournament teams
View team ratings and manager information
Access detailed squad information
Team Registration

Fill comprehensive team registration form
Add players with position-specific ratings
Define team strategy and formation
Submit to the tournament database
Squad Management

View complete player rosters
Analyze player ratings by position
Monitor team composition

Demo Features

Quick Reset: Use "Reset All Matches" on Simulate page to restart the tournament (returns all completed matches into upcoming macthes)
Live Simulation: Watch AI-generated match commentary in real-time
Data Persistence: All changes saved automatically to cloud storage


💢 Troubleshooting

Common Issues

Login Not Working

Verify credentials exactly: admin@caf.com / admin123
Check browser console for errors
Ensure JavaScript is enabled

Matches Not Loading

Navigate to Matches page
Click "Reset All Matches" on Simulate page
Initialize database => Load from database
Simulate desired match

Styles Not Appearing

Use Live Server instead of direct file opening
Check browser developer console for 404 errors
Ensure all file paths are correct
Browser Console Commands

javascript
// Reset tournament data
resetTournament()

// Check current data state
console.log(loadTournamentData())

// Force logout
logout()

// Debug authentication
console.log(sessionStorage)

💻 Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

🔒 Security Features

Role-based access control
Session management
Secure authentication flow
Data validation and sanitization
🛠️ Development

Technology Stack

Frontend: HTML5, CSS3, JavaScript (ES6+)
Storage: Firebase Firestore + localStorage fallback
Authentication: Firebase Auth
UI Framework: Bootstrap 5 + SB Admin 2
Charts: Chart.js for analytics

👥 Support

For support and questions:

Create an Issue on GitHub
Check existing documentation
Review troubleshooting section

