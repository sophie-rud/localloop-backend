import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

import trackRoutes from './routes/trackRoutes.js';
import stepRoutes from './routes/stepRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

app.use(express.json());
app.use(cookieParser());

app.use('/tracks', trackRoutes);
app.use('/tracks/:trackId/steps', stepRoutes);
app.use('/places', placeRoutes);
app.use('/users', userRoutes);
app.use('/', authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
