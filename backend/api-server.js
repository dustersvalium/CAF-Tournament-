// api-server.js
const http = require('http');

const teams = [
    {
        _id: '1',
        name: 'Nigeria',
        manager: 'Jose Peseiro',
        country: 'Nigeria',
        rating: 78.4,
        players: []
    },
    {
        _id: '2', 
        name: 'Ivory Coast',
        manager: 'Emerse Fae', 
        country: 'Ivory Coast',
        rating: 76.2,
        players: []
    },
    {
        _id: '3',
        name: 'Egypt',
        manager: 'Hossam Hassan',
        country: 'Egypt', 
        rating: 75.8,
        players: []
    }
];

const server = http.createServer((req, res) => {
    // Set CORS headers - CRITICAL
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // API Routes - SIMPLE AND DIRECT
    if (req.url === '/api/teams' && req.method === 'GET') {
        console.log('✅ Serving /api/teams');
        res.writeHead(200);
        res.end(JSON.stringify(teams));
        return;
    }
    
    if (req.url === '/api/health' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'OK', message: 'API Server is running' }));
        return;
    }
    
    // Default response
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found', url: req.url, method: req.method }));
});

const PORT = 5502;
server.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📊 Teams endpoint: http://localhost:${PORT}/api/teams`);
});