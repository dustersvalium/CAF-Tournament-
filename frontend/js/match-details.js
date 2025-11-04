// match-details.js - Match Details Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    loadMatchDetails();
});

// Load match details from URL parameter
function loadMatchDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('id');
    
    if (!matchId) {
        showError('No match specified');
        return;
    }
    
    loadMatchData(matchId);
}

// Load match data from Firebase/local storage
async function loadMatchData(matchId) {
    try {
        // Try to load from Firebase first
        let matches = await loadMatchesFromFirebase();
        
        // If Firebase fails, try local storage
        if (!matches) {
            const localData = loadTournamentData();
            matches = localData.matches;
        }
        
        if (!matches || matches.length === 0) {
            throw new Error('No matches data found');
        }
        
        // Find the match - convert matchId to number for comparison
        const match = matches.find(m => m.id == matchId);
        
        if (!match) {
            throw new Error('Match not found');
        }
        
        console.log('Match found:', match); // Debug log
        displayMatchDetails(match);
        
    } catch (error) {
        console.error('Error loading match data:', error);
        showError(error.message);
    }
}

// Display match details on the page
function displayMatchDetails(match) {
    // Update match header with actual scores
    document.getElementById('team1-name').textContent = match.team1;
    document.getElementById('team2-name').textContent = match.team2;
    
    // Use actual scores from the match data
    const score1 = match.score1 !== null && match.score1 !== undefined ? match.score1 : 0;
    const score2 = match.score2 !== null && match.score2 !== undefined ? match.score2 : 0;
    
    document.getElementById('match-score').textContent = `${score1} - ${score2}`;
    document.getElementById('match-status').textContent = match.completed ? 'Full Time' : 'Not Started';
    
    // Update lineup headers
    document.getElementById('team1-lineup-header').innerHTML = `<h6 class="m-0 font-weight-bold text-primary">${match.team1} Lineup</h6>`;
    document.getElementById('team2-lineup-header').innerHTML = `<h6 class="m-0 font-weight-bold text-primary">${match.team2} Lineup</h6>`;
    
    // Generate match events (goals, cards, etc.) using ACTUAL scores
    const matchEvents = generateMatchEvents(match);
    displayMatchTimeline(matchEvents);
    
    // Display statistics
    displayMatchStatistics(match);
    
    // Display match information
    displayMatchInformation(match);
    
    // Display team lineups
    displayTeamLineups(match);
}

// Generate realistic match events including goals based on ACTUAL scores
function generateMatchEvents(match) {
    const events = [];
    
    // Add match start event
    events.push({
        minute: '0\'',
        type: 'start',
        description: 'Match kicks off',
        team: null
    });
    
    // Generate goals based on the ACTUAL score from match data
    const score1 = match.score1 || 0;
    const score2 = match.score2 || 0;
    
    console.log('Generating events for score:', score1, '-', score2); // Debug log
    
    // Generate goals for team 1
    if (score1 > 0) {
        const goalMinutes = generateGoalMinutes(score1);
        goalMinutes.forEach((minute, index) => {
            events.push({
                minute: `${minute}'`,
                type: 'goal',
                description: `${generateGoalScorer(match.team1)} - ${match.team1} ${score1}-${score2}`,
                team: match.team1
            });
        });
    }
    
    // Generate goals for team 2
    if (score2 > 0) {
        const goalMinutes = generateGoalMinutes(score2);
        goalMinutes.forEach((minute, index) => {
            // Update score display for each goal
            const currentScore1 = score1;
            const currentScore2 = Math.min(score2, index + 1);
            events.push({
                minute: `${minute}'`,
                type: 'goal',
                description: `${generateGoalScorer(match.team2)} - ${match.team1} ${currentScore1}-${currentScore2}`,
                team: match.team2
            });
        });
    }
    
    // Add some random match events (yellow cards, substitutions)
    if (score1 > 0 || score2 > 0) {
        events.push({
            minute: '23\'',
            type: 'card',
            description: 'Yellow card issued',
            team: Math.random() > 0.5 ? match.team1 : match.team2
        });
        
        events.push({
            minute: '65\'',
            type: 'substitution',
            description: 'Substitution made',
            team: Math.random() > 0.5 ? match.team1 : match.team2
        });
        
        events.push({
            minute: '78\'',
            type: 'card',
            description: 'Yellow card issued',
            team: Math.random() > 0.5 ? match.team1 : match.team2
        });
    }
    
    // Add match end event
    events.push({
        minute: '90\'',
        type: 'end',
        description: 'Full time',
        team: null
    });
    
    // Sort events by minute
    return events.sort((a, b) => {
        const minuteA = parseInt(a.minute);
        const minuteB = parseInt(b.minute);
        return minuteA - minuteB;
    });
}

// Generate realistic goal minutes spread throughout the match
function generateGoalMinutes(goalCount) {
    const minutes = [];
    for (let i = 0; i < goalCount; i++) {
        // Spread goals between minute 15 and 85
        const minute = Math.floor(Math.random() * 70) + 15;
        minutes.push(minute);
    }
    // Sort minutes in ascending order
    return minutes.sort((a, b) => a - b);
}

// Generate realistic goal scorers for teams
function generateGoalScorer(teamName) {
    const goalScorers = {
        'Nigeria': ['Victor Osimhen', 'Ademola Lookman', 'Kelechi Iheanacho', 'Samuel Chukwueze', 'Alex Iwobi'],
        'South Africa': ['Percy Tau', 'Themba Zwane', 'Evidence Makgopa', 'Mihlali Mayambela', 'Zakhele Lepasa'],
        'Egypt': ['Mohamed Salah', 'Mostafa Mohamed', 'Omar Marmoush', 'Mahmoud Trezeguet', 'Ahmed Sayed Zizo'],
        'Senegal': ['Sadio Mané', 'Nicolas Pépé', 'Ismaïla Sarr', 'Boulaye Dia', 'Habib Diallo'],
        'Ivory Coast': ['Sébastien Haller', 'Nicolas Pépé', 'Simon Adingra', 'Jean-Philippe Krasso', 'Oumar Diakité'],
        'Morocco': ['Hakim Ziyech', 'Youssef En-Nesyri', 'Zakaria Aboukhlal', 'Amine Harit', 'Abdelhamid Sabiri'],
        'Ghana': ['Mohammed Kudus', 'Inaki Williams', 'Jordan Ayew', 'Kamaldeen Sulemana', 'Antoine Semenyo'],
        'Cameroon': ['Vincent Aboubakar', 'Bryan Mbeumo', 'Karl Toko Ekambi', 'Georges-Kévin Nkoudou', 'Farís Moumbagna']
    };
    
    const scorers = goalScorers[teamName] || ['Team Player', 'Star Striker', 'Midfielder'];
    return scorers[Math.floor(Math.random() * scorers.length)];
}

// Display match timeline
function displayMatchTimeline(events) {
    const timeline = document.getElementById('match-timeline');
    
    if (!events || events.length === 0) {
        timeline.innerHTML = '<div class="text-center text-muted">No match events recorded</div>';
        return;
    }
    
    timeline.innerHTML = events.map(event => `
        <div class="timeline-item">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <span class="goal-badge">${event.minute}</span>
                    <strong class="ml-2">${event.description}</strong>
                </div>
                ${event.team ? `<span class="badge badge-primary">${event.team}</span>` : ''}
            </div>
            ${getEventIcon(event.type)}
        </div>
    `).join('');
}

// Get appropriate icon for event type
function getEventIcon(eventType) {
    const icons = {
        'goal': '<i class="fas fa-futbol text-success ml-4"></i> GOAL!',
        'card': '<i class="fas fa-square text-warning ml-4"></i> Yellow Card',
        'substitution': '<i class="fas fa-exchange-alt text-info ml-4"></i> Substitution',
        'start': '<i class="fas fa-play text-primary ml-4"></i> Match Start',
        'end': '<i class="fas fa-whistle text-secondary ml-4"></i> Match End'
    };
    
    return `<div class="text-muted small mt-1">${icons[eventType] || ''}</div>`;
}

// Display match statistics
function displayMatchStatistics(match) {
    const statsDiv = document.getElementById('match-stats');
    
    // Use actual scores for statistics
    const score1 = match.score1 || 0;
    const score2 = match.score2 || 0;
    
    // Generate realistic statistics based on the actual match
    const stats = {
        possession: {
            team1: Math.floor(Math.random() * 20) + 40, // 40-60%
            team2: Math.floor(Math.random() * 20) + 40
        },
        shots: {
            team1: score1 + Math.floor(Math.random() * 5),
            team2: score2 + Math.floor(Math.random() * 5)
        },
        shotsOnTarget: {
            team1: score1 + Math.floor(Math.random() * 3),
            team2: score2 + Math.floor(Math.random() * 3)
        },
        fouls: {
            team1: Math.floor(Math.random() * 10) + 5,
            team2: Math.floor(Math.random() * 10) + 5
        },
        corners: {
            team1: Math.floor(Math.random() * 8),
            team2: Math.floor(Math.random() * 8)
        }
    };
    
    statsDiv.innerHTML = `
        <div class="mb-3">
            <strong>Possession</strong>
            <div class="progress mb-1">
                <div class="progress-bar bg-primary" style="width: ${stats.possession.team1}%">
                    ${match.team1}: ${stats.possession.team1}%
                </div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-success" style="width: ${stats.possession.team2}%">
                    ${match.team2}: ${stats.possession.team2}%
                </div>
            </div>
        </div>
        
        <div class="row text-center">
            <div class="col-6">
                <strong>Shots</strong><br>
                <span class="h5">${stats.shots.team1}</span> - <span class="h5">${stats.shots.team2}</span>
            </div>
            <div class="col-6">
                <strong>Shots on Target</strong><br>
                <span class="h5">${stats.shotsOnTarget.team1}</span> - <span class="h5">${stats.shotsOnTarget.team2}</span>
            </div>
        </div>
        
        <div class="row text-center mt-3">
            <div class="col-6">
                <strong>Fouls</strong><br>
                <span class="h5">${stats.fouls.team1}</span> - <span class="h5">${stats.fouls.team2}</span>
            </div>
            <div class="col-6">
                <strong>Corners</strong><br>
                <span class="h5">${stats.corners.team1}</span> - <span class="h5">${stats.corners.team2}</span>
            </div>
        </div>
    `;
}

// Display match information
function displayMatchInformation(match) {
    const infoDiv = document.getElementById('match-info');
    
    const score1 = match.score1 || 0;
    const score2 = match.score2 || 0;
    
    infoDiv.innerHTML = `
        <p><strong>Status:</strong> <span class="badge ${match.completed ? 'badge-success' : 'badge-warning'}">${match.completed ? 'Completed' : 'Not Started'}</span></p>
        <p><strong>Final Score:</strong> ${score1} - ${score2}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Competition:</strong> African Nations League 2025</p>
        <p><strong>Venue:</strong> ${getRandomStadium()}</p>
        <p><strong>Attendance:</strong> ${Math.floor(Math.random() * 20000) + 30000}</p>
        <p><strong>Referee:</strong> ${getRandomReferee()}</p>
    `;
}

// Display team lineups
async function displayTeamLineups(match) {
    try {
        const teams = await loadTeamsFromFirebase() || loadTournamentData().teams;
        
        const team1 = teams.find(t => t.name === match.team1);
        const team2 = teams.find(t => t.name === match.team2);
        
        displayTeamLineup('team1-lineup', team1);
        displayTeamLineup('team2-lineup', team2);
        
    } catch (error) {
        console.error('Error loading lineups:', error);
        document.getElementById('team1-lineup').innerHTML = '<div class="text-muted">Lineup not available</div>';
        document.getElementById('team2-lineup').innerHTML = '<div class="text-muted">Lineup not available</div>';
    }
}

// Display individual team lineup
function displayTeamLineup(containerId, team) {
    const container = document.getElementById(containerId);
    
    if (!team || !team.players || team.players.length === 0) {
        container.innerHTML = '<div class="text-muted">Lineup not available</div>';
        return;
    }
    
    // Group players by position
    const byPosition = {
        'GK': team.players.filter(p => p.position === 'GK'),
        'DF': team.players.filter(p => p.position === 'DF'),
        'MD': team.players.filter(p => p.position === 'MD'),
        'AT': team.players.filter(p => p.position === 'AT')
    };
    
    container.innerHTML = `
        <div class="mb-3">
            <h6 class="text-primary">Goalkeeper</h6>
            ${byPosition.GK.map(player => `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>${player.name} ${player.isCaptain ? '©' : ''}</span>
                    <span class="badge badge-secondary">${player.ratings.GK}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="mb-3">
            <h6 class="text-success">Defenders</h6>
            ${byPosition.DF.map(player => `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>${player.name} ${player.isCaptain ? '©' : ''}</span>
                    <span class="badge badge-secondary">${player.ratings.DF}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="mb-3">
            <h6 class="text-info">Midfielders</h6>
            ${byPosition.MD.map(player => `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>${player.name} ${player.isCaptain ? '©' : ''}</span>
                    <span class="badge badge-secondary">${player.ratings.MD}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="mb-3">
            <h6 class="text-warning">Attackers</h6>
            ${byPosition.AT.map(player => `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>${player.name} ${player.isCaptain ? '©' : ''}</span>
                    <span class="badge badge-secondary">${player.ratings.AT}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Helper functions for random data
function getRandomStadium() {
    const stadiums = [
        'Cairo International Stadium', 
        'Stade Olympique Alassane Ouattara',
        'FNB Stadium', 
        'Stade Mohamed V', 
        'Accra Sports Stadium',
        'Stade Ahmadou Ahidjo', 
        "Stade de l'Amitié",
        'National Stadium'
    ];
    return stadiums[Math.floor(Math.random() * stadiums.length)];
}

function getRandomReferee() {
    const referees = [
        'Janny Sikazwe', 
        'Bakary Gassama', 
        'Ahmad Heeralal', 
        'Jean Jacques Ndala', 
        'Mahmoud El Banna', 
        'Bernard Camille'
    ];
    return referees[Math.floor(Math.random() * referees.length)];
}

// Show error message
function showError(message) {
    const timeline = document.getElementById('match-timeline');
    timeline.innerHTML = `
        <div class="text-center text-danger">
            <i class="fas fa-exclamation-triangle fa-2x mb-2"></i><br>
            ${message}
        </div>
    `;
}