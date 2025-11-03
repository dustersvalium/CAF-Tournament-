//we run the demo data off this server
const http = require('http');

const teams = [
    {_id:'1', name:'Nigeria', manager:'Jose Peseiro', country:'Nigeria', rating:78.4, players:[]},
    {_id:'2', name:'Ivory Coast', manager:'Emerse Fae', country:'Ivory Coast', rating:76.2, players:[]},
    {_id:'3', name:'Egypt', manager:'Hossam Hassan', country:'Egypt', rating:75.8, players:[]}
];

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.url === '/api/teams' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(teams));
        return;
    }
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Server is running!', endpoint: '/api/teams'}));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🎯 SERVER RUNNING: http://localhost:${PORT}`);
    console.log(`📡 API ENDPOINT: http://localhost:${PORT}/api/teams`);
});