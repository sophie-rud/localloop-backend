import express from 'express';
const app = express();

import trackRoutes from './routes/trackRoutes.js';

app.use(express.json());

app.use('/tracks', trackRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
