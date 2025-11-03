// firebase-config.js
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQa247hb3_V0Khb-8jvtg6nIN7OgA1gkM",
  authDomain: "caf-simulator.firebaseapp.com",
  projectId: "caf-simulator",
  storageBucket: "caf-simulator.firebasestorage.app",
  messagingSenderId: "607626946322",
  appId: "1:607626946322:web:cf2e16c0e703508bd3f5cb",
  measurementId: "G-0YT99D8ZXZ"
};

// Initialize Firebase
try {
    // Check if Firebase is already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    // Initialize Firestore
    const db = firebase.firestore();
    
    // Make db available globally
    window.db = db;
    console.log('✅ Firebase initialized successfully');
    
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Auto-populate teams when initializing Firebase data
async function initializeFirebaseDataWithPlayers() {
    const status = document.getElementById('firebase-status');
    if (status) {
        status.innerHTML = '<div class="alert alert-info">Initializing Firebase data with player rosters...</div>';
    }
    
    try {
        await saveTeamsToFirebase(); // This now auto-populates players
        await saveMatchesToFirebase();
        
        if (status) {
            status.innerHTML = '<div class="alert alert-success">Firebase data initialized with complete player rosters!</div>';
        }
    } catch (error) {
        if (status) {
            status.innerHTML = '<div class="alert alert-danger">Error initializing Firebase: ' + error.message + '</div>';
        }
    }
}

// Make function available globally
window.initializeFirebaseData = initializeFirebaseDataWithPlayers;