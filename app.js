import express from 'express';
const app = express();

import trackRoutes from './routes/trackRoutes.js';
import placeRoutes from './routes/placeRoutes.js';

app.use(express.json());

app.use('/tracks', trackRoutes);
app.use('/places', placeRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
