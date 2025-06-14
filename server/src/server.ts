import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import cors from 'cors';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3812;

// Apply CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
const clientPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientPath));

// Fallback route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Serving client from: ${clientPath}`);
});