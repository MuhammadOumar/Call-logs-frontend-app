import express, { Request, Response } from 'express';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3812;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Fallback route (for React Router)
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
