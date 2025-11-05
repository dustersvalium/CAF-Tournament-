const API_URL = "caf-tournament-production.up.railway.app";
// Main Application Logic - No Authentication Needed
document.addEventListener('DOMContentLoaded', function() {
    initializeMatchFilters();
    initializeTeamRatingsChart();
    loadTeams();
    setupSimulation();
    loadMatches(); // Add this line to load matches
});


// Firebase Admin Functions
async function initializeFirebaseData() {
    const status = document.getElementById('firebase-status');
    status.innerHTML = '<div class="alert alert-info">Initializing Firebase data...</div>';
    
    try {
        await saveTeamsToFirebase();
        await saveMatchesToFirebase();
        status.innerHTML = '<div class="alert alert-success">Firebase data initialized successfully!</div>';
    } catch (error) {
        status.innerHTML = '<div class="alert alert-danger">Error initializing Firebase: ' + error.message + '</div>';
    }
}

async function loadFromFirebase() {
    const status = document.getElementById('firebase-status');
    status.innerHTML = '<div class="alert alert-info">Loading from Firebase...</div>';
    
    try {
        const teams = await loadTeamsFromFirebase();
        const matches = await loadMatchesFromFirebase();
        
        if (teams && matches) {
            const data = { teams, matches };
            localStorage.setItem('tournamentData', JSON.stringify(data));
            status.innerHTML = '<div class="alert alert-success">Data loaded from Firebase! Refresh the page.</div>';
        } else {
            status.innerHTML = '<div class="alert alert-warning">No data found in Firebase. Initialize first.</div>';
        }
    } catch (error) {
        status.innerHTML = '<div class="alert alert-danger">Error loading from Firebase: ' + error.message + '</div>';
    }
}

async function saveToFirebase() {
    const status = document.getElementById('firebase-status');
    status.innerHTML = '<div class="alert alert-info">Saving to Firebase...</div>';
    
    try {
        await saveTeamsToFirebase();
        await saveMatchesToFirebase();
        status.innerHTML = '<div class="alert alert-success">Data saved to Firebase successfully!</div>';
    } catch (error) {
        status.innerHTML = '<div class="alert alert-danger">Error saving to Firebase: ' + error.message + '</div>';
    }
}

// Load teams from shared data
function loadTeams() {
    const teamsGrid = document.getElementById('teams-grid');
    if (!teamsGrid) return;

    try {
        console.log('Loading teams...'); // Debug log
        
        const data = loadTournamentData();
        console.log('Data loaded:', data); // Debug log
        
        if (!data || !data.teams) {
            throw new Error('No teams data found');
        }
        
        const teams = data.teams;
        console.log('Teams found:', teams.length); // Debug log
        
        teamsGrid.innerHTML = teams.map(team => `
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    ${team.name}
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    Rating: ${team.rating}
                                </div>
                                <div class="text-xs text-muted mt-1">
                                    Manager: ${team.manager}
                                </div>
                                <div class="text-xs text-muted">
                                    Country: ${team.country}
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-flag fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-primary" onclick="viewTeamDetails('${team.name}')">
                                View Squad
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log('Teams loaded successfully'); // Debug log
        
    } catch (error) {
        console.error('Error loading teams:', error);
        teamsGrid.innerHTML = '<div class="col-12 text-center text-danger"><p>Failed to load teams: ' + error.message + '</p></div>';
    }
}

//Original function as fallback
function loadDemoTeams() {
    const teamsGrid = document.getElementById('teams-grid');
    if (!teamsGrid) return;

    const teams = [
        { name: 'Nigeria', rating: 78.4, manager: 'Jose Peseiro', color: 'primary' },
        { name: 'Ivory Coast', rating: 76.2, manager: 'Emerse Fae', color: 'success' },
        { name: 'Egypt', rating: 75.8, manager: 'Hossam Hassan', color: 'info' },
        { name: 'Senegal', rating: 79.1, manager: 'Aliou Cisse', color: 'warning' },
        { name: 'Morocco', rating: 74.5, manager: 'Walid Regragui', color: 'danger' },
        { name: 'Ghana', rating: 73.9, manager: 'Otto Addo', color: 'secondary' },
        { name: 'Cameroon', rating: 72.8, manager: 'Rigobert Song', color: 'dark' },
        { name: 'South Africa', rating: 71.5, manager: 'Hugo Broos', color: 'primary' }
    ];

    teamsGrid.innerHTML = teams.map(team => `
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-${team.color} shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-${team.color} text-uppercase mb-1">
                                ${team.name}
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                                Rating: ${team.rating}
                            </div>
                            <div class="text-xs text-muted mt-1">
                                Manager: ${team.manager}
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-flag fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    <div class="mt-2">
                        <button class="btn btn-sm btn-${team.color}" onclick="viewTeamDetails('${team.name}')">
                            View Squad
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Simulation functions
function simulateNextMatch() {
    showLoading('Simulating next match...');
    setTimeout(() => {
        const commentary = generateMatchCommentary('Nigeria', 'South Africa', 2, 1);
        displayMatchCommentary(commentary, 'Nigeria', 'South Africa', '2-1');
        hideLoading();
    }, 3000);
}

function simulateRound(round) {
    showLoading(`Simulating ${round} finals...`);
    setTimeout(() => {
        const commentary = [
            `🏆 ${round.toUpperCase()} FINALS SIMULATION`,
            `📊 Simulating all ${round} final matches...`,
            `⚽ Nigeria 2-1 South Africa`,
            `⚽ Egypt 1-1 Senegal (3-2 on penalties)`,
            `⚽ Ivory Coast 2-0 Morocco`,
            `⚽ Ghana 1-2 Cameroon`,
            `🎯 ${round} finals completed! Moving to next round...`
        ];
        displayMatchCommentary(commentary, `${round} Finals`, 'Complete', 'Simulated');
        hideLoading();
    }, 4000);
}

function simulateAllMatches() {
    showLoading('Simulating all matches with AI commentary...');
    setTimeout(() => {
        const commentary = generateMatchCommentary('Tournament', 'Complete', 0, 0);
        commentary.unshift('🏆 TOURNAMENT COMPLETE!');
        commentary.push('🎊 All matches have been simulated!');
        displayMatchCommentary(commentary, 'Tournament', 'Complete', 'Completed');
        hideLoading();
    }, 4000);
}

function simulateSingleMatch(button) {
    const matchItem = button.closest('.match-item');
    
    // Get the actual teams from the match item
    const teamElements = matchItem.querySelectorAll('.team');
    const team1 = teamElements[0].textContent.trim();
    const team2 = teamElements[1].textContent.trim();
    
    console.log('Simulating:', team1, 'vs', team2);
    
    showLoading(`Simulating ${team1} vs ${team2}...`);
    
    setTimeout(() => {
        const score1 = Math.floor(Math.random() * 4);
        const score2 = Math.floor(Math.random() * 4);
        const score = `${score1}-${score2}`;
        
        // Update match display
        matchItem.querySelector('.score').textContent = score;
        matchItem.querySelector('.score').className = 'badge badge-success mr-2';
        button.style.display = 'none';
        
        // ✅ CRITICAL: Save the scores to the match data
        updateMatchInDatabase(team1, team2, score1, score2);
        
        // Generate and display AI commentary with the ACTUAL teams
        const commentary = generateMatchCommentary(team1, team2, score1, score2);
        displayMatchCommentary(commentary, team1, team2, score);
        
        hideLoading();
    }, 2000);
}

// ✅ NEW FUNCTION: Update match scores in the database
function updateMatchInDatabase(team1, team2, score1, score2) {
    try {
        const data = loadTournamentData();
        
        // Find the match in our data
        const matchIndex = data.matches.findIndex(match => 
            match.team1 === team1 && match.team2 === team2
        );
        
        if (matchIndex !== -1) {
            // Update the match with scores
            data.matches[matchIndex].score1 = score1;
            data.matches[matchIndex].score2 = score2;
            data.matches[matchIndex].completed = true;
            data.matches[matchIndex].id = data.matches[matchIndex].id || Date.now(); // Ensure ID exists
            
            console.log('Updated match:', data.matches[matchIndex]);
            
            // Save back to localStorage
            saveTournamentData(data);
            
            // Also update Firebase if available
            if (typeof updateMatchInFirebase === 'function' && data.matches[matchIndex].id) {
                updateMatchInFirebase(data.matches[matchIndex].id.toString(), score1, score2);
            }
        } else {
            console.warn('Match not found in database:', team1, 'vs', team2);
        }
    } catch (error) {
        console.error('Error updating match in database:', error);
    }
}

function simulateFullTournament() {
    showLoading('Simulating full tournament...');
    setTimeout(() => {
        const commentary = [
            '🏆 AFRICAN NATIONS LEAGUE 2025 - FULL TOURNAMENT SIMULATION',
            '📊 Starting group stage matches...',
            '⚽ Nigeria 2-1 South Africa',
            '⚽ Egypt 1-1 Senegal',
            '⚽ Ivory Coast 2-0 Morocco', 
            '⚽ Ghana 1-2 Cameroon',
            '📈 Advancing to knockout stages...',
            '🎯 Quarter Finals completed!',
            '🔥 Semi Finals completed!',
            '🌟 FINAL: Nigeria vs Egypt',
            '⚽⚽ Nigeria 3-1 Egypt',
            '🏆 TOURNAMENT CHAMPION: NIGERIA!',
            '🎊 Tournament simulation complete!'
        ];
        displayMatchCommentary(commentary, 'Full Tournament', 'Simulation', 'Complete');
        hideLoading();
    }, 5000);
}

// Reset tournament to initial state
function resetTournament() {
    if (confirm('Are you sure you want to reset all matches? This will clear all scores and set matches back to upcoming.')) {
        showLoading('Resetting tournament...');
        
        setTimeout(() => {
            try {
                const data = loadTournamentData();
                
                // Reset all matches to upcoming
                data.matches.forEach(match => {
                    match.score1 = null;
                    match.score2 = null;
                    match.completed = false;
                });
                
                // Save the reset data
                saveTournamentData(data);
                
                // Update Firebase if available
                if (typeof saveMatchesToFirebase === 'function') {
                    saveMatchesToFirebase().then(() => {
                        hideLoading();
                        alert('Tournament reset successfully! All matches are now upcoming.');
                        location.reload(); // Refresh the page
                    }).catch(error => {
                        hideLoading();
                        alert('Tournament reset locally, but Firebase update failed: ' + error.message);
                        location.reload();
                    });
                } else {
                    hideLoading();
                    alert('Tournament reset successfully! All matches are now upcoming.');
                    location.reload();
                }
                
            } catch (error) {
                hideLoading();
                alert('Error resetting tournament: ' + error.message);
            }
        }, 1000);
    }
}

function displayMatches(matches) {
    const matchesList = document.getElementById('matches-list');
    
    if (!matches || matches.length === 0) {
        matchesList.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="fas fa-trophy fa-2x mb-2"></i>
                <p>No matches scheduled yet</p>
            </div>
        `;
        return;
    }
    
    matchesList.innerHTML = matches.map(match => {
        // Use actual scores from match data
        const score1 = match.score1 !== null && match.score1 !== undefined ? match.score1 : 0;
        const score2 = match.score2 !== null && match.score2 !== undefined ? match.score2 : 0;
        const displayScore = match.completed ? `${score1} - ${score2}` : 'VS';
        
        return `
        <a href="match-details.html?id=${match.id}" class="list-group-item list-group-item-action match-item ${match.completed ? 'completed' : 'upcoming'}" 
           style="transition: all 0.3s ease; border-left: 4px solid ${match.completed ? '#28a745' : '#ffc107'};">
            <div class="d-flex w-100 justify-content-between align-items-center">
                <div class="match-teams flex-grow-1">
                    <h5 class="mb-1">
                        <span class="team-name font-weight-bold ${match.completed ? 'text-dark' : 'text-primary'}">${match.team1}</span>
                        <span class="score mx-3 ${match.completed ? 'text-success font-weight-bold' : 'text-muted'}">
                            ${displayScore}
                        </span>
                        <span class="team-name font-weight-bold ${match.completed ? 'text-dark' : 'text-primary'}">${match.team2}</span>
                    </h5>
                    <p class="mb-1 text-muted">
                        <i class="fas fa-trophy"></i> Group Stage • 
                        <i class="fas fa-calendar"></i> ${getRandomMatchDate()} • 
                        <i class="fas fa-clock"></i> ${getRandomMatchTime()}
                    </p>
                </div>
                <div class="match-status text-right">
                    <span class="badge ${match.completed ? 'badge-success' : 'badge-warning'}">
                        ${match.completed ? 'Completed' : 'Upcoming'}
                    </span>
                    <br>
                    <small class="text-muted">Click for details</small>
                </div>
            </div>
        </a>
        `;
    }).join('');
    
    // Add hover effects
    addMatchHoverEffects();
}

// Hover effects for match items
function addMatchHoverEffects() {
    const matchItems = document.querySelectorAll('.match-item');
    matchItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            this.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
            this.style.backgroundColor = '';
        });
    });
}


function loadMatches() {
    const matchesList = document.getElementById('matches-list');
    if (!matchesList) return;

    try {
        const data = loadTournamentData();
        console.log('Matches data:', data.matches);
        
        if (!data || !data.matches) {
            throw new Error('No matches data found');
        }
        
        displayMatches(data.matches);
        
    } catch (error) {
        console.error('Error loading matches:', error);
        matchesList.innerHTML = `
            <div class="text-center py-4 text-danger">
                <i class="fas fa-exclamation-triangle fa-2x mb-2"></i>
                <p>Failed to load matches: ${error.message}</p>
            </div>
        `;
    }
}

function displayMatchCommentary(commentary, team1, team2, score) {
    // Find the live feed box
    const liveFeed = document.getElementById('live-feed');
    
    if (!liveFeed) {
        console.error('Live feed element not found!');
        return;
    }
    
    // Clear previous content and create new commentary
    liveFeed.innerHTML = '';
    
    // Create match header
    const matchHeader = document.createElement('div');
    matchHeader.className = 'text-center mb-3 p-3 bg-primary text-white rounded';
    matchHeader.innerHTML = `
        <h5 class="mb-1">🎙️ LIVE COMMENTARY</h5>
        <h6 class="mb-0">${team1} ${score} ${team2}</h6>
    `;
    liveFeed.appendChild(matchHeader);
    
    // Create commentary container
    const commentaryContainer = document.createElement('div');
    commentaryContainer.id = 'commentary-container';
    
    // Add each commentary line with typing effect
    let delay = 0;
    commentary.forEach((comment, index) => {
        setTimeout(() => {
            const commentElement = document.createElement('div');
            commentElement.className = 'commentary-item mb-2 p-2 rounded';
            commentElement.style.cssText = `
                border-left: 4px solid #4e73df;
                background: ${index % 2 === 0 ? 'white' : '#f8f9fc'};
                animation: fadeIn 0.5s ease-in;
                font-size: 14px;
                line-height: 1.4;
            `;
            commentElement.innerHTML = comment;
            commentaryContainer.appendChild(commentElement);
            
            // Auto-scroll to bottom
            liveFeed.scrollTop = liveFeed.scrollHeight;
        }, delay);
        
        delay += 800; // 0.8 seconds between each comment
    });
    
    liveFeed.appendChild(commentaryContainer);
    
    // Add CSS animation if not already added
    if (!document.querySelector('#commentary-styles')) {
        const styles = document.createElement('style');
        styles.id = 'commentary-styles';
        styles.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .commentary-item {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Auto-scroll to show the latest commentary
    setTimeout(() => {
        liveFeed.scrollTop = liveFeed.scrollHeight;
    }, delay + 500);
}

function showLoading(message) {
    // Simple loading indicator
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary mb-2"></div>
            <p>${message}</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); display: flex; align-items: center; 
        justify-content: center; z-index: 9999; color: white;
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) loader.remove();
}

function initializeMatchFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update button states
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            
            // Filter matches
            const matchItems = document.querySelectorAll('.match-item');
            matchItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initializeTeamRatingsChart() {
    const ctx = document.getElementById('teamRatingsChart');
    if (!ctx) return;
    
    // Load team data for the chart
    const data = loadTournamentData();
    const teams = data.teams.slice(0, 8); // Show first 8 teams or all
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams.map(team => team.name),
            datasets: [{
                label: 'Team Rating',
                data: teams.map(team => team.rating),
                backgroundColor: [
                    '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
                    '#e74a3b', '#858796', '#5a5c69', '#2e59d9'
                ],
                borderColor: [
                    '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', 
                    '#e74a3b', '#858796', '#5a5c69', '#2e59d9'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // This is important for custom heights
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Team Ratings Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Rating'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

function setupSimulation() {
    console.log('Simulation system ready');
}

function viewTeamDetails(teamName) {
    // Navigate to team details page with team name as parameter
    window.location.href = `team-details.html?team=${encodeURIComponent(teamName)}`;
}


function viewMatchDetails(matchId) {
    window.location.href = `match-details.html?id=${matchId}`;
}

function showRegisterTeamForm() {
    window.location.href = 'register-team.html';
}

// AI Commentary System
function generateMatchCommentary(team1, team2, score1, score2, events) {
    const commentaries = {
        goals: [
            `⚽ GOAL! ${team1} scores! What a fantastic strike!`,
            `⚽ GOAL! ${team2} equalizes! The crowd goes wild!`,
            `⚽ GOAL! Beautiful team play from ${team1} results in a goal!`,
            `⚽ GOAL! ${team2} takes the lead with an incredible shot!`,
            `⚽ GOAL! What a header from ${team1}!`,
            `⚽ GOAL! ${team2} with a stunning free kick!`
        ],
        saves: [
            `🧤 Incredible save by the goalkeeper! Unbelievable reflexes!`,
            `🧤 What a stop! The keeper keeps ${team1} in the game!`,
            `🧤 Massive save! ${team2}'s goalkeeper comes up huge!`
        ],
        fouls: [
            `🟨 Yellow card! That was a reckless challenge.`,
            `🤕 That looks painful! Free kick awarded.`,
            `⚖️ The referee has a word with the players after that tackle.`
        ],
        general: [
            `🔵 ${team1} controlling possession in the midfield...`,
            `🟡 ${team2} pressing high up the pitch...`,
            `🎯 Beautiful passing sequence from both teams!`,
            `🌪️ End-to-end action here! What a match!`,
            `📈 The tempo of the game is increasing...`,
            `🔄 Substitution being prepared on the sidelines...`
        ],
        celebrations: [
            `🎉 The players celebrate with the fans! Electric atmosphere!`,
            `🔥 What a moment for the scoring team! Pure emotion!`,
            `💫 The stadium is rocking after that goal!`
        ]
    };

    // Generate commentary based on match events
    let commentary = [];
    
    // Add pre-match commentary
    commentary.push(`🏟️ WELCOME TO THE MATCH: ${team1} vs ${team2}`);
    commentary.push(`📊 Kickoff! Both teams looking strong in the opening minutes...`);
    
    // Add goal commentary
    if (score1 > 0 || score2 > 0) {
        if (score1 > score2) {
            commentary.push(commentaries.goals[0]);
            commentary.push(commentaries.celebrations[0]);
        } else if (score2 > score1) {
            commentary.push(commentaries.goals[3]);
            commentary.push(commentaries.celebrations[2]);
        } else {
            commentary.push(commentaries.goals[1]);
            commentary.push(`⚖️ The scores are level! Game on!`);
        }
    }
    
    // Add some random match events
    commentary.push(commentaries.general[Math.floor(Math.random() * commentaries.general.length)]);
    commentary.push(commentaries.saves[Math.floor(Math.random() * commentaries.saves.length)]);
    commentary.push(commentaries.fouls[Math.floor(Math.random() * commentaries.fouls.length)]);
    
    // Add final result commentary
    if (score1 > score2) {
        commentary.push(`🎯 FINAL SCORE: ${team1} ${score1}-${score2} ${team2}`);
        commentary.push(`🏆 ${team1} emerges victorious! What a performance!`);
    } else if (score2 > score1) {
        commentary.push(`🎯 FINAL SCORE: ${team1} ${score1}-${score2} ${team2}`);
        commentary.push(`🏆 ${team2} takes all three points! Incredible match!`);
    } else {
        commentary.push(`🎯 FINAL SCORE: ${team1} ${score1}-${score2} ${team2}`);
        commentary.push(`🤝 It ends all square! A fair result for both teams.`);
    }
    
    return commentary;
}

// Helper functions for match dates and times
function getRandomMatchDate() {
    const dates = [
        '15 Nov 2025', '16 Nov 2025', '17 Nov 2025', '18 Nov 2025',
        '20 Nov 2025', '21 Nov 2025', '22 Nov 2025', '23 Nov 2025'
    ];
    return dates[Math.floor(Math.random() * dates.length)];
}

function getRandomMatchTime() {
    const times = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    return times[Math.floor(Math.random() * times.length)];
}