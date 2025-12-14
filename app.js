import express from 'express';
const app = express();

import trackRoutes from './routes/trackRoutes.js';
import stepRoutes from './routes/stepRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use(express.json());

app.use('/tracks', trackRoutes);
app.use('/tracks/:trackId/steps', stepRoutes);
app.use('/places', placeRoutes);
app.use('/users', userRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
