// Main Application Logic - No Authentication Needed
document.addEventListener('DOMContentLoaded', function() {
    initializeMatchFilters();
    initializeTeamRatingsChart();
    loadTeams();
    setupSimulation();
});

// Load demo teams
function loadTeams() {
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
        alert('Next match simulated! Nigeria 2-1 South Africa');
        hideLoading();
    }, 2000);
}

function simulateAllMatches() {
    showLoading('Simulating all remaining matches...');
    setTimeout(() => {
        alert('All matches simulated! Tournament complete.');
        hideLoading();
    }, 3000);
}

function simulateSingleMatch(button) {
    const matchItem = button.closest('.match-item');
    showLoading('Simulating match...');
    
    setTimeout(() => {
        const teams = matchItem.querySelector('.team-name').textContent;
        const score = '2-1'; // Random score for demo
        matchItem.querySelector('.score').textContent = score;
        matchItem.querySelector('.badge').textContent = 'Completed';
        matchItem.querySelector('.badge').className = 'badge badge-success';
        button.style.display = 'none';
        
        alert(`Match simulated: ${teams} ${score}`);
        hideLoading();
    }, 1500);
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
    alert('Team registration form would open here.\n\nThis would connect to MongoDB when backend is ready.');
}