// team-registration.js - Team Registration Functionality

let playerCount = 0;

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    // Add initial players
    for (let i = 0; i < 11; i++) {
        addPlayer();
    }
    
    // Handle form submission
    document.getElementById('teamRegistrationForm').addEventListener('submit', handleTeamRegistration);
});

// Add a new player row
function addPlayer() {
    playerCount++;
    const playersContainer = document.getElementById('playersContainer');
    
    const playerRow = document.createElement('div');
    playerRow.className = 'player-row';
    playerRow.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Player ${playerCount} Name *</label>
                    <input type="text" class="form-control player-name" required>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Position *</label>
                    <select class="form-control player-position" required>
                        <option value="">Select Position</option>
                        <option value="GK">Goalkeeper (GK)</option>
                        <option value="DF">Defender (DF)</option>
                        <option value="MD">Midfielder (MD)</option>
                        <option value="AT">Attacker (AT)</option>
                    </select>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>GK Rating</label>
                    <input type="number" class="form-control player-rating-gk player-rating-input" min="0" max="100" value="50">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>DF Rating</label>
                    <input type="number" class="form-control player-rating-df player-rating-input" min="0" max="100" value="50">
                </div>
            </div>
            <div class="col-md-1">
                <div class="form-group">
                    <label>&nbsp;</label>
                    <button type="button" class="btn btn-danger btn-sm btn-block" onclick="removePlayer(this)" ${playerCount <= 11 ? 'disabled' : ''}>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2 offset-md-4">
                <div class="form-group">
                    <label>MD Rating</label>
                    <input type="number" class="form-control player-rating-md player-rating-input" min="0" max="100" value="50">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>AT Rating</label>
                    <input type="number" class="form-control player-rating-at player-rating-input" min="0" max="100" value="50">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>Captain</label>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input player-captain">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    playersContainer.appendChild(playerRow);
}

// Remove a player row
function removePlayer(button) {
    if (playerCount > 11) {
        const playerRow = button.closest('.player-row');
        playerRow.remove();
        playerCount--;
        updatePlayerLabels();
    }
}

// Update player number labels
function updatePlayerLabels() {
    const labels = document.querySelectorAll('.player-row .form-group label');
    let currentPlayer = 1;
    
    labels.forEach(label => {
        if (label.textContent.startsWith('Player')) {
            label.textContent = `Player ${currentPlayer} Name *`;
            currentPlayer++;
        }
    });
}

// Handle team registration
async function handleTeamRegistration(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById('registrationStatus');
    
    try {
        // Show loading
        statusDiv.innerHTML = '<div class="alert alert-info">Registering team...</div>';
        
        // Get team data
        const teamData = {
            name: document.getElementById('teamName').value.trim(),
            country: document.getElementById('country').value.trim(),
            manager: document.getElementById('manager').value.trim(),
            rating: parseInt(document.getElementById('teamRating').value) || 75,
            players: getPlayersData()
        };
        
        // Validate data
        if (!teamData.name || !teamData.country || !teamData.manager) {
            throw new Error('Please fill in all required team fields');
        }
        
        if (teamData.players.length < 11) {
            throw new Error('Team must have at least 11 players');
        }
        
        // Check if team already exists
        const existingTeams = await loadTeamsFromFirebase();
        if (existingTeams.some(team => team.name.toLowerCase() === teamData.name.toLowerCase())) {
            throw new Error(`Team "${teamData.name}" already exists`);
        }
        
        // Save to Firebase
        await db.collection('teams').add(teamData);
        
        // Update local data
        const localData = loadTournamentData();
        localData.teams.push({ ...teamData, id: Date.now().toString() });
        saveTournamentData(localData);
        
        // Show success
        statusDiv.innerHTML = `
            <div class="alert alert-success">
                <h5><i class="fas fa-check-circle"></i> Team Registered Successfully!</h5>
                <p><strong>${teamData.name}</strong> has been added to the tournament.</p>
                <p>They are now available for matches and simulations.</p>
                <a href="teams.html" class="btn btn-primary btn-sm">View All Teams</a>
            </div>
        `;
        
        // Reset form
        document.getElementById('teamRegistrationForm').reset();
        document.getElementById('playersContainer').innerHTML = '';
        playerCount = 0;
        for (let i = 0; i < 11; i++) {
            addPlayer();
        }
        
    } catch (error) {
        statusDiv.innerHTML = `<div class="alert alert-danger">Registration failed: ${error.message}</div>`;
    }
}

// Get players data from form
function getPlayersData() {
    const players = [];
    const playerRows = document.querySelectorAll('.player-row');
    
    playerRows.forEach(row => {
        const name = row.querySelector('.player-name').value.trim();
        const position = row.querySelector('.player-position').value;
        const isCaptain = row.querySelector('.player-captain').checked;
        
        if (name && position) {
            players.push({
                name: name,
                position: position,
                isCaptain: isCaptain,
                ratings: {
                    GK: parseInt(row.querySelector('.player-rating-gk').value) || 0,
                    DF: parseInt(row.querySelector('.player-rating-df').value) || 0,
                    MD: parseInt(row.querySelector('.player-rating-md').value) || 0,
                    AT: parseInt(row.querySelector('.player-rating-at').value) || 0
                }
            });
        }
    });
    
    return players;
}
