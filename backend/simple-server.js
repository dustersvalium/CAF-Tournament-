// simple-server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Mock data
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
  
  // API Routes
  if (req.url === '/api/teams' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(teams));
    return;
  }
  
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', message: 'Server is running' }));
    return;
  }
  
// Serve frontend files
if (req.method === 'GET') {
    let filePath = req.url === '/' ? '/frontend/html/index.html' : req.url;
    
    // Remove leading slash for path joining
    if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
    }
    
    // If no file extension, assume it's a frontend route
    if (!filePath.includes('.') || filePath.endsWith('/')) {
        filePath = 'frontend/html/index.html';
    }
    
    // Build full path - FIX THIS LINE
    const fullPath = path.join(__dirname, '..', '..', filePath);
    // OR even better, use absolute path:
    // const fullPath = path.join(process.cwd(), filePath);
    
    console.log('Looking for file:', fullPath); // Add this for debugging
    
    // Check if file exists
    if (fs.existsSync(fullPath)) {
        const ext = path.extname(fullPath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg'
        }[ext] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(fullPath).pipe(res);
    } else {
        console.log('File not found:', fullPath); // Debug logging
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found: ' + fullPath);
    }
    return;
}
  
  // Default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

const PORT = 5502;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/teams`);
  console.log(`🌐 Frontend: http://localhost:${PORT}/frontend/html/index.html`);
});