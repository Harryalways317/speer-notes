import express from 'express';
import cors from 'cors';
import { rateLimiter } from './middlewares';
import { notesRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(rateLimiter);

// Routes
app.use('/', (req, res) => {
  res.send(
    'Welcome to My Submission for Speer Notes, use /api as base end point!'
  );
});
app.use('/api/health', (req, res) => {
  res.send('Service is up and running! :)');
});
app.use('/api', notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
