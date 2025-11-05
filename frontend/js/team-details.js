// team-details.js - Team Details Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    loadTeamDetails();
});

// Load team details from URL parameter
function loadTeamDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamName = urlParams.get('team');
    
    if (!teamName) {
        showError('No team specified');
        return;
    }
    
    loadTeamData(teamName);
}

// Load team data from Firebase/local storage
async function loadTeamData(teamName) {
    try {
        // Try to load from Firebase first
        let teams = await loadTeamsFromFirebase();
        
        // If Firebase fails, try local storage
        if (!teams) {
            const localData = loadTournamentData();
            teams = localData.teams;
        }
        
        if (!teams || teams.length === 0) {
            throw new Error('No teams data found');
        }
        
        // Find the team
        const team = teams.find(t => t.name === teamName);
        
        if (!team) {
            throw new Error(`Team "${teamName}" not found`);
        }
        
        displayTeamDetails(team);
        
    } catch (error) {
        console.error('Error loading team data:', error);
        showError(error.message);
    }
}

// Display team details on the page
function displayTeamDetails(team) {
    // Update team header and info
    document.getElementById('team-name-header').textContent = team.name + ' Squad';
    document.getElementById('team-name').textContent = team.name;
    document.getElementById('team-country').textContent = team.country || 'Not specified';
    document.getElementById('team-manager').textContent = team.manager || 'Not specified';
    document.getElementById('team-rating').textContent = team.rating || 'N/A';
    document.getElementById('team-squad-size').textContent = team.players ? team.players.length : 0;
    
    // Display squad
    displaySquad(team.players || []);
    
    // Update position counts
    updatePositionCounts(team.players || []);
}

// Display squad in table
function displaySquad(players) {
    const tbody = document.getElementById('squad-tbody');
    
    if (!players || players.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted">
                    <i class="fas fa-users fa-2x mb-2"></i><br>
                    No players in squad
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = players.map(player => `
        <tr>
            <td>
                ${player.name}
                ${player.isCaptain ? ' <span class="badge badge-warning">C</span>' : ''}
            </td>
            <td>
                <span class="badge badge-${getPositionBadgeColor(player.position)}">
                    ${getPositionFullName(player.position)}
                </span>
            </td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-danger" role="progressbar" 
                         style="width: ${player.ratings.GK}%" 
                         aria-valuenow="${player.ratings.GK}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${player.ratings.GK}
                    </div>
                </div>
            </td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-success" role="progressbar" 
                         style="width: ${player.ratings.DF}%" 
                         aria-valuenow="${player.ratings.DF}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${player.ratings.DF}
                    </div>
                </div>
            </td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-info" role="progressbar" 
                         style="width: ${player.ratings.MD}%" 
                         aria-valuenow="${player.ratings.MD}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${player.ratings.MD}
                    </div>
                </div>
            </td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-warning" role="progressbar" 
                         style="width: ${player.ratings.AT}%" 
                         aria-valuenow="${player.ratings.AT}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${player.ratings.AT}
                    </div>
                </div>
            </td>
            <td class="text-center">
                ${player.isCaptain ? 
                    '<i class="fas fa-star text-warning" title="Team Captain"></i>' : 
                    '<span class="text-muted">-</span>'
                }
            </td>
        </tr>
    `).join('');
}

// Update position counts
function updatePositionCounts(players) {
    const counts = {
        GK: 0,
        DF: 0,
        MD: 0,
        AT: 0
    };
    
    players.forEach(player => {
        if (counts.hasOwnProperty(player.position)) {
            counts[player.position]++;
        }
    });
    
    document.getElementById('gk-count').textContent = counts.GK;
    document.getElementById('df-count').textContent = counts.DF;
    document.getElementById('md-count').textContent = counts.MD;
    document.getElementById('at-count').textContent = counts.AT;
}

// Helper function to get position full name
function getPositionFullName(position) {
    const positions = {
        'GK': 'Goalkeeper',
        'DF': 'Defender',
        'MD': 'Midfielder',
        'AT': 'Attacker'
    };
    return positions[position] || position;
}

// Helper function to get position badge color
function getPositionBadgeColor(position) {
    const colors = {
        'GK': 'danger',
        'DF': 'success',
        'MD': 'info',
        'AT': 'warning'
    };
    return colors[position] || 'secondary';
}

// Show error message
function showError(message) {
    const tbody = document.getElementById('squad-tbody');
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="text-center text-danger">
                <i class="fas fa-exclamation-triangle fa-2x mb-2"></i><br>
                ${message}
            </td>
        </tr>
    `;
}