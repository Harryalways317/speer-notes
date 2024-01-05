import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import { rateLimiter } from './middlewares';
import { notesRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;
const md = new MarkdownIt();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(rateLimiter);

// Routes
// app.get('/', (req, res) => {
//   res.send(
//     'Welcome to My Submission for Speer Notes, use /api as base end point!'
//   );
// });
app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, '..', 'README.md');

  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading README.md:', err);
      return res.status(500).send('Error loading documentation');
    }
    const html = md.render(data);
    res.send(html);
  });
});
app.get('/api/health', (req, res) => {
  res.send('Service is up and running! :)');
});
app.use('/api', notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
