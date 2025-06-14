import express, { Request, Response } from 'express';
import path from 'path';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3812;

// Serve static files
app.use(express.static(path.join(__dirname, 'client')));

// Fallback route
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});