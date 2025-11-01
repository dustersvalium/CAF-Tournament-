// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

console.log('Firebase Auth loaded');

class FirebaseAuthSystem {
    constructor() {
        this.currentUser = null;
        this.userRole = null;
        this.init();
    }

    init() {
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.currentUser = user;
                this.loadUserRole(user.email);
                console.log('User signed in:', user.email);
            } else {
                this.currentUser = null;
                this.userRole = null;
                console.log('User signed out');
            }
            this.checkAuthentication();
            this.updateUI();
        });

        this.setupEventListeners();
    }

    // Demo users data (this would normally be in Firestore)
    demoUsers = {
        'admin@anl.com': { 
            password: 'admin123', 
            role: 'admin', 
            name: 'Tournament Admin' 
        },
        'nigeria@anl.com': { 
            password: 'rep123', 
            role: 'representative', 
            name: 'Nigeria Federation',
            country: 'Nigeria'
        },
        'egypt@anl.com': { 
            password: 'rep123', 
            role: 'representative', 
            name: 'Egypt Federation',
            country: 'Egypt'
        }
    };

    async loadUserRole(email) {
        // In a real app, you'd fetch this from Firestore
        // For now, we'll use the demo users object
        this.userRole = this.demoUsers[email]?.role || null;
    }

    async login(email, password, role) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Verify role matches
            const expectedRole = this.demoUsers[email]?.role;
            if (expectedRole && expectedRole === role) {
                this.userRole = role;
                return true;
            } else {
                // Role doesn't match, sign out
                await this.logout();
                throw new Error('Invalid role for this account');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await auth.signOut();
            this.currentUser = null;
            this.userRole = null;
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.userRole === 'admin';
    }

    isRepresentative() {
        return this.userRole === 'representative';
    }

    checkAuthentication() {
        const currentPage = window.location.pathname.split('/').pop();
        const protectedPages = ['dashboard.html', 'matches.html', 'teams.html'];

        if (protectedPages.includes(currentPage) && !this.isAuthenticated()) {
            alert('Please login to access this page.');
            window.location.href = 'login.html';
            return;
        }

        if (currentPage === 'login.html' && this.isAuthenticated()) {
            window.location.href = 'dashboard.html';
            return;
        }
    }

    updateUI() {
        if (this.isAuthenticated()) {
            // Update navigation
            document.querySelectorAll('.nav-link[href="login.html"]').forEach(link => {
                link.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
                link.href = '#';
                link.onclick = (e) => {
                    e.preventDefault();
                    this.logout();
                };
            });

            // Update user info
            const userInfo = document.getElementById('user-info');
            const welcomeMessage = document.getElementById('welcome-message');
            const roleBadge = document.getElementById('user-role-badge');

            if (userInfo) {
                const userData = this.demoUsers[this.currentUser.email];
                userInfo.innerHTML = `
                    <span class="user-info">
                        <i class="fas fa-user"></i>
                        ${userData?.name || this.currentUser.email}
                        <span class="user-role">${this.userRole?.toUpperCase()}</span>
                    </span>
                `;
            }

            if (welcomeMessage) {
                const userData = this.demoUsers[this.currentUser.email];
                welcomeMessage.textContent = `Welcome, ${userData?.name || this.currentUser.email}`;
            }

            if (roleBadge) {
                roleBadge.textContent = this.userRole?.toUpperCase();
            }

            // Show role-specific elements
            if (this.isAdmin()) {
                document.querySelectorAll('.simulate-btn, .simulate-next-match').forEach(btn => {
                    if (btn) btn.style.display = 'inline-block';
                });
            }

            if (this.isRepresentative()) {
                const registerBtn = document.getElementById('register-team-btn');
                const registerAction = document.getElementById('register-team-action');
                if (registerBtn) registerBtn.style.display = 'inline-block';
                if (registerAction) registerAction.style.display = 'inline-block';
            }
        } else {
            // Reset to login state
            document.querySelectorAll('.nav-link[href="login.html"]').forEach(link => {
                link.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
                link.href = 'login.html';
                link.onclick = null;
            });
        }
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const role = document.querySelector('input[name="role"]:checked').value;
                
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                submitBtn.disabled = true;

                try {
                    await this.login(email, password, role);
                    alert('Login successful!');
                    window.location.href = 'dashboard.html';
                } catch (error) {
                    alert(`Login failed: ${error.message}\n\nUse demo buttons for quick access.`);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }
}

// Demo login function (accessible from HTML)
window.demoLogin = function(role) {
    const demoSettings = {
        'admin': { email: 'admin@anl.com', password: 'admin123' },
        'representative': { email: 'nigeria@anl.com', password: 'rep123' }
    };

    const demo = demoSettings[role];
    if (demo) {
        document.getElementById('email').value = demo.email;
        document.getElementById('password').value = demo.password;
        document.querySelector(`input[value="${role}"]`).checked = true;
        
        // Auto-submit the form
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
};

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new FirebaseAuthSystem();
});