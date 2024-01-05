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
app.use('/api', notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
