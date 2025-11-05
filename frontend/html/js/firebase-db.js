// Firebase Database Operations
const teamPlayersData = {
    nigeria: [
        { name: "Stanley Nwabali", position: "GK", isCaptain: false, ratings: { GK: 82, DF: 35, MD: 25, AT: 10 } },
        { name: "William Troost-Ekong", position: "DF", isCaptain: true, ratings: { GK: 30, DF: 84, MD: 45, AT: 35 } },
        { name: "Calvin Bassey", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 82, MD: 50, AT: 30 } },
        { name: "Ola Aina", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 80, MD: 65, AT: 40 } },
        { name: "Zaidu Sanusi", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 78, MD: 60, AT: 45 } },
        { name: "Wilfred Ndidi", position: "MD", isCaptain: false, ratings: { GK: 30, DF: 75, MD: 85, AT: 50 } },
        { name: "Frank Onyeka", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 70, MD: 82, AT: 55 } },
        { name: "Alex Iwobi", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 84, AT: 70 } },
        { name: "Ademola Lookman", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 75, AT: 86 } },
        { name: "Victor Osimhen", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 65, AT: 89 } },
        { name: "Moses Simon", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 72, AT: 83 } },
        { name: "Samuel Chukwueze", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 78, AT: 85 } },
        { name: "Kelechi Iheanacho", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 80, AT: 84 } },
        { name: "Bright Osayi-Samuel", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 79, MD: 68, AT: 55 } },
        { name: "Raphael Onyedika", position: "MD", isCaptain: false, ratings: { GK: 30, DF: 72, MD: 81, AT: 60 } },
        { name: "Francis Uzoho", position: "GK", isCaptain: false, ratings: { GK: 78, DF: 30, MD: 20, AT: 10 } }
    ],
    
    southAfrica: [
        { name: "Ronwen Williams", position: "GK", isCaptain: true, ratings: { GK: 81, DF: 30, MD: 25, AT: 10 } },
        { name: "Nyiko Mobbie", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 76, MD: 55, AT: 40 } },
        { name: "Grant Kekana", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 78, MD: 45, AT: 30 } },
        { name: "Siyanda Xulu", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 77, MD: 50, AT: 35 } },
        { name: "Aubrey Modiba", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 75, MD: 68, AT: 55 } },
        { name: "Teboho Mokoena", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 65, MD: 82, AT: 60 } },
        { name: "Sphephelo Sithole", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 60, MD: 79, AT: 55 } },
        { name: "Thapelo Morena", position: "MD", isCaptain: false, ratings: { GK: 15, DF: 70, MD: 76, AT: 65 } },
        { name: "Percy Tau", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 72, AT: 84 } },
        { name: "Evidence Makgopa", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 65, AT: 80 } },
        { name: "Themba Zwane", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 40, MD: 78, AT: 82 } },
        { name: "Mihlali Mayambela", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 45, MD: 74, AT: 79 } },
        { name: "Zakhele Lepasa", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 60, AT: 81 } },
        { name: "Khuliso Mudau", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 77, MD: 62, AT: 50 } },
        { name: "Thabang Monare", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 78, AT: 55 } },
        { name: "Veli Mothwa", position: "GK", isCaptain: false, ratings: { GK: 76, DF: 25, MD: 20, AT: 10 } }
    ],
    
    egypt: [
        { name: "Mohamed El Shenawy", position: "GK", isCaptain: false, ratings: { GK: 85, DF: 30, MD: 20, AT: 10 } },
        { name: "Ahmed Hegazi", position: "DF", isCaptain: false, ratings: { GK: 35, DF: 83, MD: 45, AT: 30 } },
        { name: "Mohamed Abdelmonem", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 81, MD: 50, AT: 35 } },
        { name: "Ahmed Fatouh", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 79, MD: 65, AT: 45 } },
        { name: "Mohamed Hany", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 77, MD: 62, AT: 50 } },
        { name: "Mohamed Elneny", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 70, MD: 82, AT: 55 } },
        { name: "Marwan Attia", position: "MD", isCaptain: false, ratings: { GK: 30, DF: 72, MD: 80, AT: 50 } },
        { name: "Emam Ashour", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 81, AT: 68 } },
        { name: "Mohamed Salah", position: "AT", isCaptain: true, ratings: { GK: 10, DF: 40, MD: 78, AT: 90 } },
        { name: "Mostafa Mohamed", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 45, MD: 65, AT: 84 } },
        { name: "Omar Marmoush", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 72, AT: 83 } },
        { name: "Mahmoud Trezeguet", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 75, AT: 82 } },
        { name: "Ahmed Sayed Zizo", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 79, AT: 81 } },
        { name: "Ali Gabr", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 78, MD: 45, AT: 30 } },
        { name: "Hamdy Fathy", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 68, MD: 77, AT: 55 } },
        { name: "Mohamed Awad", position: "GK", isCaptain: false, ratings: { GK: 79, DF: 25, MD: 15, AT: 10 } }
    ],
    
    senegal: [
        {name: "Édouard Mendy", position: "GK", isCaptain: false, ratings: { GK: 86, DF: 30, MD: 20, AT: 10 } },
        { name: "Kalidou Koulibaly", position: "DF", isCaptain: true, ratings: { GK: 35, DF: 87, MD: 50, AT: 35 } },
        { name: "Abdou Diallo", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 82, MD: 55, AT: 40 } },
        { name: "Youssouf Sabaly", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 80, MD: 65, AT: 50 } },
        { name: "Fodé Ballo-Touré", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 78, MD: 68, AT: 55 } },
        { name: "Pape Gueye", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 70, MD: 83, AT: 60 } },
        { name: "Pape Matar Sarr", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 84, AT: 65 } },
        { name: "Idrissa Gana Gueye", position: "MD", isCaptain: false, ratings: { GK: 30, DF: 72, MD: 82, AT: 55 } },
        { name: "Sadio Mané", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 80, AT: 88 } },
        { name: "Nicolas Pépé", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 75, AT: 85 } },
        { name: "Ismaïla Sarr", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 55, MD: 78, AT: 84 } },
        { name: "Boulaye Dia", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 65, AT: 83 } },
        { name: "Habib Diallo", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 55, MD: 60, AT: 82 } },
        { name: "Moussa Niakhaté", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 81, MD: 50, AT: 35 } },
        { name: "Cheikhou Kouyaté", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 70, MD: 79, AT: 60 } },
        { name: "Alfred Gomis", position: "GK", isCaptain: false, ratings: { GK: 80, DF: 25, MD: 15, AT: 10 } }
    ],
    
    ivoryCoast: [
        { name: "Yahia Fofana", position: "GK", isCaptain: false, ratings: { GK: 82, DF: 30, MD: 20, AT: 10 } },
        { name: "Serge Aurier", position: "DF", isCaptain: true, ratings: { GK: 25, DF: 81, MD: 65, AT: 55 } },
        { name: "Odilon Kossounou", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 83, MD: 50, AT: 35 } },
        { name: "Evan Ndicka", position: "DF", isCaptain: false, ratings: { GK: 35, DF: 84, MD: 55, AT: 40 } },
        { name: "Ghislain Konan", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 79, MD: 62, AT: 50 } },
        { name: "Franck Kessié", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 72, MD: 85, AT: 65 } },
        { name: "Seko Fofana", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 84, AT: 70 } },
        { name: "Ibrahim Sangaré", position: "MD", isCaptain: false, ratings: { GK: 30, DF: 75, MD: 83, AT: 55 } },
        { name: "Sébastien Haller", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 65, AT: 86 } },
        { name: "Nicolas Pépé", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 75, AT: 84 } },
        { name: "Simon Adingra", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 72, AT: 83 } },
        { name: "Jean-Philippe Krasso", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 60, AT: 81 } },
        { name: "Oumar Diakité", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 68, AT: 80 } },
        { name: "Willy Boly", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 80, MD: 45, AT: 30 } },
        { name: "Jean Michaël Seri", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 68, MD: 80, AT: 60 } },
        { name: "Badra Ali Sangaré", position: "GK", isCaptain: false, ratings: { GK: 78, DF: 25, MD: 15, AT: 10 } }
    ],
    
    morocco: [
        { name: "Yassine Bounou", position: "GK", isCaptain: false, ratings: { GK: 87, DF: 30, MD: 20, AT: 10 } },
        { name: "Achraf Hakimi", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 84, MD: 70, AT: 65 } },
        { name: "Romain Saïss", position: "DF", isCaptain: true, ratings: { GK: 30, DF: 83, MD: 55, AT: 40 } },
        { name: "Nayef Aguerd", position: "DF", isCaptain: false, ratings: { GK: 35, DF: 82, MD: 50, AT: 35 } },
        { name: "Noussair Mazraoui", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 81, MD: 72, AT: 60 } },
        { name: "Sofyan Amrabat", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 75, MD: 85, AT: 55 } },
        { name: "Azzedine Ounahi", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 60, MD: 83, AT: 70 } },
        { name: "Selim Amallah", position: "MD", isCaptain: false, ratings: { GK: 15, DF: 65, MD: 81, AT: 68 } },
        { name: "Hakim Ziyech", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 82, AT: 86 } },
        { name: "Youssef En-Nesyri", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 65, AT: 84 } },
        { name: "Zakaria Aboukhlal", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 55, MD: 72, AT: 82 } },
        { name: "Amine Harit", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 78, AT: 81 } },
        { name: "Abdelhamid Sabiri", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 79, AT: 80 } },
        { name: "Jawad El Yamiq", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 79, MD: 45, AT: 30 } },
        { name: "Bilal El Khannouss", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 60, MD: 80, AT: 65 } },
        { name: "Munir Mohamedi", position: "GK", isCaptain: false, ratings: { GK: 81, DF: 25, MD: 15, AT: 10 } }
    ],
    
    ghana: [
        { name: "Lawrence Ati-Zigi", position: "GK", isCaptain: false, ratings: { GK: 80, DF: 30, MD: 20, AT: 10 } },
        { name: "Daniel Amartey", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 79, MD: 50, AT: 35 } },
        { name: "Alexander Djiku", position: "DF", isCaptain: false, ratings: { GK: 35, DF: 81, MD: 55, AT: 40 } },
        { name: "Gideon Mensah", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 77, MD: 60, AT: 45 } },
        { name: "Alidu Seidu", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 78, MD: 58, AT: 50 } },
        { name: "Thomas Partey", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 75, MD: 84, AT: 60 } },
        { name: "Mohammed Kudus", position: "MD", isCaptain: false, ratings: { GK: 15, DF: 60, MD: 85, AT: 82 } },
        { name: "Abdul Samed", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 68, MD: 81, AT: 55 } },
        { name: "Jordan Ayew", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 72, AT: 83 } },
        { name: "Inaki Williams", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 70, AT: 85 } },
        { name: "Kamaldeen Sulemana", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 75, AT: 82 } },
        { name: "Antoine Semenyo", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 60, MD: 65, AT: 81 } },
        { name: "Joseph Paintsil", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 50, MD: 72, AT: 80 } },
        { name: "Nicholas Opoku", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 76, MD: 45, AT: 30 } },
        { name: "Elisha Owusu", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 65, MD: 78, AT: 55 } },
        { name: "Richard Ofori", position: "GK", isCaptain: true, ratings: { GK: 78, DF: 25, MD: 15, AT: 10 } }
    ],
    
    cameroon: [
        { name: "André Onana", position: "GK", isCaptain: false, ratings: { GK: 85, DF: 30, MD: 25, AT: 10 } },
        { name: "Collins Fai", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 78, MD: 55, AT: 45 } },
        { name: "Jean-Charles Castelletto", position: "DF", isCaptain: false, ratings: { GK: 30, DF: 80, MD: 50, AT: 35 } },
        { name: "Christopher Wooh", position: "DF", isCaptain: false, ratings: { GK: 35, DF: 81, MD: 45, AT: 30 } },
        { name: "Nouhou Tolo", position: "DF", isCaptain: false, ratings: { GK: 20, DF: 77, MD: 60, AT: 50 } },
        { name: "André-Frank Zambo Anguissa", position: "MD", isCaptain: false, ratings: { GK: 25, DF: 70, MD: 84, AT: 65 } },
        { name: "Pierre Kunde", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 81, AT: 60 } },
        { name: "Olivier Ntcham", position: "MD", isCaptain: false, ratings: { GK: 15, DF: 60, MD: 80, AT: 70 } },
        { name: "Vincent Aboubakar", position: "AT", isCaptain: true, ratings: { GK: 10, DF: 55, MD: 65, AT: 85 } },
        { name: "Karl Toko Ekambi", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 50, MD: 70, AT: 83 } },
        { name: "Bryan Mbeumo", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 45, MD: 75, AT: 84 } },
        { name: "Georges-Kévin Nkoudou", position: "AT", isCaptain: false, ratings: { GK: 15, DF: 55, MD: 72, AT: 81 } },
        { name: "Farís Moumbagna", position: "AT", isCaptain: false, ratings: { GK: 10, DF: 60, MD: 60, AT: 80 } },
        { name: "Enzo Tchato", position: "DF", isCaptain: false, ratings: { GK: 25, DF: 76, MD: 55, AT: 40 } },
        { name: "Yvan Neyou", position: "MD", isCaptain: false, ratings: { GK: 20, DF: 65, MD: 77, AT: 55 } },
        { name: "Devis Epassy", position: "GK", isCaptain: false, ratings: { GK: 79, DF: 25, MD: 15, AT: 10 } }
    ]
};

// Function to populate teams with player data
async function autoPopulateTeamPlayers(team) {
    const teamKey = team.name.toLowerCase().replace(/\s+/g, '');
    
    if (teamPlayersData[teamKey] && (!team.players || team.players.length === 0)) {
        try {
            await db.collection('teams').doc(team.id).update({
                players: teamPlayersData[teamKey]
            });
            console.log(`Auto-populated ${team.name} with player data`);
            return { ...team, players: teamPlayersData[teamKey] };
        } catch (error) {
            console.error(`Error populating ${team.name}:`, error);
            return team;
        }
    }
    return team;
}
// Save teams to Firebase
async function saveTeamsToFirebase() {
    try {
        const data = loadTournamentData();
        
        // Clear existing teams in Firebase
        const teamsSnapshot = await db.collection('teams').get();
        teamsSnapshot.forEach(doc => {
            db.collection('teams').doc(doc.id).delete();
        });
        
        // Add teams to Firebase with auto-population
        for (const team of data.teams) {
            const teamData = { ...team };
            delete teamData.id; // Remove id since Firebase will create its own
            
            // Ensure players are populated
            const teamKey = team.name.toLowerCase().replace(/\s+/g, '');
            if (!teamData.players || teamData.players.length === 0) {
                teamData.players = teamPlayersData[teamKey] || [];
            }
            
            await db.collection('teams').add(teamData);
        }
        
        console.log('Teams saved to Firebase with auto-population!');
        return true;
    } catch (error) {
        console.error('Error saving teams to Firebase:', error);
        return false;
    }
}

// Load teams from Firebase
async function loadTeamsFromFirebase() {
    try {
        const teamsSnapshot = await db.collection('teams').get();
        const teams = [];
        
        for (const doc of teamsSnapshot.docs) {
            let team = { id: doc.id, ...doc.data() };
            
            // Auto-populate if players are missing
            team = await autoPopulateTeamPlayers(team);
            
            teams.push(team);
        }
        
        console.log('Teams loaded from Firebase with auto-population:', teams);
        return teams;
    } catch (error) {
        console.error('Error loading teams from Firebase:', error);
        return null;
    }
}

// Save matches to Firebase
async function saveMatchesToFirebase() {
    try {
        const data = loadTournamentData();
        
        // Clear existing matches
        const matchesSnapshot = await db.collection('matches').get();
        matchesSnapshot.forEach(doc => {
            db.collection('matches').doc(doc.id).delete();
        });
        
        // Add matches to Firebase
        for (const match of data.matches) {
            await db.collection('matches').add({
                team1: match.team1,
                team2: match.team2,
                score1: match.score1,
                score2: match.score2,
                completed: match.completed
            });
        }
        
        console.log('Matches saved to Firebase successfully!');
        return true;
    } catch (error) {
        console.error('Error saving matches to Firebase:', error);
        return false;
    }
}

// Load matches from Firebase
async function loadMatchesFromFirebase() {
    try {
        const matchesSnapshot = await db.collection('matches').get();
        const matches = [];
        
        matchesSnapshot.forEach(doc => {
            matches.push({ id: doc.id, ...doc.data() });
        });
        
        console.log('Matches loaded from Firebase:', matches);
        return matches;
    } catch (error) {
        console.error('Error loading matches from Firebase:', error);
        return null;
    }
}

// Update match result in Firebase
async function updateMatchInFirebase(matchId, score1, score2) {
    try {
        await db.collection('matches').doc(matchId).update({
            score1: score1,
            score2: score2,
            completed: true
        });
        console.log('Match updated in Firebase');
        return true;
    } catch (error) {
        console.error('Error updating match in Firebase:', error);
        return false;
    }
}

// Make functions available globally
window.saveTeamsToFirebase = saveTeamsToFirebase;
window.loadTeamsFromFirebase = loadTeamsFromFirebase;
window.saveMatchesToFirebase = saveMatchesToFirebase;
window.loadMatchesFromFirebase = loadMatchesFromFirebase;
window.updateMatchInFirebase = updateMatchInFirebase;
window.populateTeamsWithPlayers = autoPopulateTeamPlayers;