import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

import trackRoutes from './routes/trackRoutes.js';
import stepRoutes from './routes/stepRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import stepController from "./controllers/stepController.js";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/tracks', trackRoutes);
app.use('/tracks/:trackId/steps', stepRoutes);
app.get('/steps', stepController.getAllSteps);
app.use('/places', placeRoutes);
app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/themes', themeRoutes);
app.use('/departments', departmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
