// auth.js - Authentication System

// User roles and permissions
const USER_ROLES = {
    ADMIN: 'admin',
    REPRESENTATIVE: 'representative'
};

const PAGE_PERMISSIONS = {
    'index.html': [USER_ROLES.ADMIN, USER_ROLES.REPRESENTATIVE],
    'matches.html': [USER_ROLES.ADMIN],
    'teams.html': [USER_ROLES.REPRESENTATIVE],
    'simulate.html': [USER_ROLES.ADMIN],
    'register-team.html': [USER_ROLES.REPRESENTATIVE],
    'team-details.html': [USER_ROLES.ADMIN, USER_ROLES.REPRESENTATIVE],
    'match-details.html': [USER_ROLES.ADMIN, USER_ROLES.REPRESENTATIVE]
};

// Pre-defined users (in a real app, these would be in Firestore)
const PRE_DEFINED_USERS = {
    'admin@caf.com': {
        password: 'admin123',
        role: USER_ROLES.ADMIN,
        name: 'Tournament Administrator'
    },
    'rep@caf.com': {
        password: 'rep123', 
        role: USER_ROLES.REPRESENTATIVE,
        name: 'Team Representative'
    }
};

// Initialize auth
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Check if we're on login page or main app
    if (window.location.pathname.includes('login.html')) {
        setupLoginPage();
    } else {
        checkAuthState();
    }
}

// Setup login page functionality
function setupLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const statusDiv = document.getElementById('login-status');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const statusDiv = document.getElementById('login-status');
    
    try {
        statusDiv.innerHTML = '<div class="alert alert-info">Signing in...</div>';
        
        // Try Firebase authentication first
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Get user role from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        if (userData) {
            await completeLogin(userData.role, userData.name);
        } else {
            throw new Error('User data not found');
        }
        
    } catch (firebaseError) {
        console.log('Firebase auth failed, trying predefined users:', firebaseError);
        
        // Fallback to predefined users for demo
        try {
            await handlePredefinedLogin(email, password);
        } catch (error) {
            statusDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
}

// Handle login with predefined users (for demo)
async function handlePredefinedLogin(email, password) {
    const user = PRE_DEFINED_USERS[email];
    
    if (!user) {
        throw new Error('User not found');
    }
    
    if (user.password !== password) {
        throw new Error('Invalid password');
    }
    
    // Store user session
    localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        role: user.role,
        name: user.name,
        isPredefined: true
    }));
    
    await completeLogin(user.role, user.name);
}

// Complete login process
async function completeLogin(role, name) {
    const statusDiv = document.getElementById('login-status');
    
    // Store in session
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('isAuthenticated', 'true');
    
    statusDiv.innerHTML = `<div class="alert alert-success">Welcome, ${name}! Redirecting...</div>`;
    
    // Redirect to appropriate page based on role
    setTimeout(() => {
        if (role === USER_ROLES.ADMIN) {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'teams.html';
        }
    }, 1500);
}

// Check authentication state on page load
function checkAuthState() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const userRole = sessionStorage.getItem('userRole');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!isAuthenticated || !userRole) {
        redirectToLogin();
        return;
    }
    
    // Check if user has permission for current page
    if (!hasPagePermission(currentPage, userRole)) {
        showAccessDenied();
        return;
    }
    
    // User is authenticated and has permission - update UI
    updateUIForUser(userRole);
}

// Check if user has permission for current page
function hasPagePermission(page, userRole) {
    const allowedRoles = PAGE_PERMISSIONS[page];
    return allowedRoles && allowedRoles.includes(userRole);
}

// Redirect to login page
function redirectToLogin() {
    if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Show access denied message
function showAccessDenied() {
    document.body.innerHTML = `
        <div class="container-fluid">
            <div class="text-center mt-5">
                <div class="error mx-auto" data-text="403">403</div>
                <p class="text-gray-500 mb-0">Access Denied</p>
                <p class="text-gray-500">You don't have permission to access this page.</p>
                <a href="index.html" class="btn btn-primary">Go to Home</a>
            </div>
        </div>
    `;
}

// Update UI based on user role
function updateUIForUser(userRole) {
    const userName = sessionStorage.getItem('userName');
    
    // Update navigation based on role
    updateNavigation(userRole);
    
    // Add user info to navbar if it exists
    const navbar = document.querySelector('.navbar-nav.ml-auto');
    if (navbar) {
        const userInfo = document.createElement('li');
        userInfo.className = 'nav-item dropdown no-arrow';
        userInfo.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" 
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">${userName}</span>
                <span class="badge badge-${userRole === USER_ROLES.ADMIN ? 'danger' : 'success'}">${userRole}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" 
                 aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </a>
            </div>
        `;
        navbar.appendChild(userInfo);
    }
}

// Update navigation based on user role (FIXED VERSION)
function updateNavigation(userRole) {
    const sidebar = document.getElementById('accordionSidebar');
    if (!sidebar) return;
    
    // Hide all regular nav items first (but not logout)
    const navItems = sidebar.querySelectorAll('.nav-item:not(:last-child)');
    navItems.forEach(item => item.style.display = 'none');
    
    // Always show home item
    const homeItem = sidebar.querySelector('a[href="index.html"]').closest('.nav-item');
    if (homeItem) homeItem.style.display = 'block';
    
    // Show role-specific items
    if (userRole === USER_ROLES.ADMIN) {
        const matchesItem = sidebar.querySelector('a[href="matches.html"]').closest('.nav-item');
        const simulateItem = sidebar.querySelector('a[href="simulate.html"]').closest('.nav-item');
        if (matchesItem) matchesItem.style.display = 'block';
        if (simulateItem) simulateItem.style.display = 'block';
    } else if (userRole === USER_ROLES.REPRESENTATIVE) {
        const teamsItem = sidebar.querySelector('a[href="teams.html"]').closest('.nav-item');
        const registerItem = sidebar.querySelector('a[href="register-team.html"]').closest('.nav-item');
        if (teamsItem) teamsItem.style.display = 'block';
        if (registerItem) registerItem.style.display = 'block';
    }
    
    // ALWAYS show the logout button (last nav item)
    const logoutItem = sidebar.querySelector('.nav-item:last-child');
    if (logoutItem) {
        logoutItem.style.display = 'block';
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session storage
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userName');
        
        // Clear localStorage for predefined users
        localStorage.removeItem('currentUser');
        
        // Sign out from Firebase
        if (typeof auth !== 'undefined' && auth) {
            auth.signOut().catch(error => {
                console.log('Firebase signout error:', error);
            });
        }
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Make logout available globally
window.logout = logout;

// Initialize demo users in Firestore (run once)
async function initializeDemoUsers() {
    try {
        // Create admin user
        await db.collection('users').doc('admin').set({
            email: 'admin@caf.com',
            role: USER_ROLES.ADMIN,
            name: 'Tournament Administrator',
            createdAt: new Date()
        });
        
        // Create representative user  
        await db.collection('users').doc('rep').set({
            email: 'rep@caf.com',
            role: USER_ROLES.REPRESENTATIVE, 
            name: 'Team Representative',
            createdAt: new Date()
        });
        
        console.log('Demo users initialized');
    } catch (error) {
        console.log('Demo users already exist or error:', error);
    }
}