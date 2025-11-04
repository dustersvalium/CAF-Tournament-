//Testing
const tournamentData = {
    teams: [
        { id: 1, name: 'Nigeria', manager: 'Jose Peseiro', country: 'Nigeria', rating: 78.4, players: [] },
        { id: 2, name: 'South Africa', manager: 'Hugo Broos', country: 'South Africa', rating: 71.5, players: [] },
        { id: 3, name: 'Egypt', manager: 'Hossam Hassan', country: 'Egypt', rating: 75.8, players: [] },
        { id: 4, name: 'Senegal', manager: 'Aliou Cisse', country: 'Senegal', rating: 79.1, players: [] },
        { id: 5, name: 'Ivory Coast', manager: 'Emerse Fae', country: 'Ivory Coast', rating: 76.2, players: [] },
        { id: 6, name: 'Morocco', manager: 'Walid Regragui', country: 'Morocco', rating: 74.5, players: [] },
        { id: 7, name: 'Ghana', manager: 'Otto Addo', country: 'Ghana', rating: 73.9, players: [] },
        { id: 8, name: 'Cameroon', manager: 'Rigobert Song', country: 'Cameroon', rating: 72.8, players: [] }
    ],
    
    matches: [
        { id: 1, team1: 'Nigeria', team2: 'South Africa', score1: null, score2: null, completed: false },
        { id: 2, team1: 'Egypt', team2: 'Senegal', score1: null, score2: null, completed: false },
        { id: 3, team1: 'Ivory Coast', team2: 'Morocco', score1: null, score2: null, completed: false },
        { id: 4, team1: 'Ghana', team2: 'Cameroon', score1: null, score2: null, completed: false }
    ]
};


function loadTournamentData() {
    const saved = localStorage.getItem('tournamentData');
    if (saved) {
        return JSON.parse(saved);
    } else {
        // Initialize with default data
        localStorage.setItem('tournamentData', JSON.stringify(tournamentData));
        return tournamentData;
    }
}

function saveTournamentData(data) {
    localStorage.setItem('tournamentData', JSON.stringify(data));
}

function updateMatchResult(matchId, score1, score2) {
    const data = loadTournamentData();
    const match = data.matches.find(m => m.id === matchId);
    if (match) {
        match.score1 = score1;
        match.score2 = score2;
        match.completed = true;
        saveTournamentData(data);
        return true;
    }
    return false;
}

// Make functions available globally
window.loadTournamentData = loadTournamentData;
window.saveTournamentData = saveTournamentData;
window.updateMatchResult = updateMatchResult;