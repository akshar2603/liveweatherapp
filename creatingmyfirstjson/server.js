// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to serve the JSON file
app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'weather.json'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
