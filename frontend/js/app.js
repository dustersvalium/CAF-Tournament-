const API_URL = 'http://localhost:3000/api';
// Main Application Logic - No Authentication Needed
document.addEventListener('DOMContentLoaded', function() {
    initializeMatchFilters();
    initializeTeamRatingsChart();
    loadTeams();
    setupSimulation();
});

// Load demo teams
// Load teams from backend API
async function loadTeams() {
    const teamsGrid = document.getElementById('teams-grid');
    if (!teamsGrid) return;

    try {
        teamsGrid.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary"></div><p class="mt-2">Loading teams...</p></div>';
        
        // UPDATE THIS LINE to use port 5502 (or whatever port your server shows)
        const response = await fetch('http://localhost:3000/api/teams');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const teams = await response.json();
        console.log('Teams loaded from API:', teams)
        
        // Render teams from API data
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
                                    Rating: ${team.rating || 'N/A'}
                                </div>
                                <div class="text-xs text-muted mt-1">
                                    Manager: ${team.manager || 'Not specified'}
                                </div>
                                <div class="text-xs text-muted">
                                    Country: ${team.country || 'Not specified'}
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
        
    } catch (error) {
        console.error('Error loading teams:', error);
        teamsGrid.innerHTML = '<div class="col-12 text-center text-danger"><p>Failed to load teams: ' + error.message + '</p></div>';
    }
}

// Keep your original function as fallback
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
    showLoading('Simulating next match with AI commentary...');
    setTimeout(() => {
        const commentary = generateMatchCommentary('Nigeria', 'South Africa', 2, 1);
        displayMatchCommentary(commentary, 'Nigeria', 'South Africa', '2-1');
        hideLoading();
    }, 3000);
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
    const teamNames = matchItem.querySelector('.team-name').textContent.split(' vs ');
    const team1 = teamNames[0].trim();
    const team2 = teamNames[1].trim();
    
    showLoading('Simulating match...');
    
    setTimeout(() => {
        const score1 = Math.floor(Math.random() * 4);
        const score2 = Math.floor(Math.random() * 4);
        const score = `${score1}-${score2}`;
        
        // Update match display
        matchItem.querySelector('.score').textContent = score;
        matchItem.querySelector('.badge').textContent = 'Completed';
        matchItem.querySelector('.badge').className = 'badge badge-success';
        button.style.display = 'none';
        
        // Generate and display AI commentary in live feed
        const commentary = generateMatchCommentary(team1, team2, score1, score2);
        displayMatchCommentary(commentary, team1, team2, score);
        
        hideLoading();
    }, 2000);
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

// Keep your existing functions
function initializeMatchFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const matchItems = document.querySelectorAll('.match-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            
            matchItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'flex';
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
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Nigeria', 'Ivory Coast', 'Egypt', 'Senegal', 'Morocco', 'Ghana', 'Cameroon', 'South Africa'],
            datasets: [{
                label: 'Team Rating',
                data: [78.4, 76.2, 75.8, 79.1, 74.5, 73.9, 72.8, 71.5],
                backgroundColor: [
                    '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
                    '#e74a3b', '#858796', '#5a5c69', '#2e59d9'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Rating' } }
            }
        }
    });
}

function setupSimulation() {
    console.log('Simulation system ready');
}

function viewTeamDetails(teamName) {
    alert(`Viewing details for ${teamName}\n\nThis would show the full squad with player ratings.`);
}

function showRegisterTeamForm() {
    // This would now make a POST request to your backend
    alert('Team registration form would now connect to: http://localhost:5502/api/teams');
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