import express, { Request, Response } from 'express';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3812;

// Get current directory path
const currentDir = process.cwd();

// Serve static files from React build
app.use(express.static(path.join(currentDir, 'server', 'dist', 'client')));

// Fallback route for client-side routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(currentDir, 'server', 'dist', 'client', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Serving from: ${path.join(currentDir, 'server', 'dist', 'client')}`);
});