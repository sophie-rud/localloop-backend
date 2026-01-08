import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import trackRoutes from './routes/trackRoutes.js';
import stepRoutes from './routes/stepRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import stepController from "./controllers/stepController.js";
import path from "path";
import fs from 'fs';
import resetPasswordRoutes from "./routes/resetPasswordRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

const app = express();

// Create uploads if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

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
app.use('/favorites', favoriteRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', resetPasswordRoutes);
app.use('/themes', themeRoutes);
app.use('/departments', departmentRoutes);

// Configure uploaded static files (avatars, photos)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res, filePath) => {
        res.set("Cache-Control", "public, max-age=31536000");
    }
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
