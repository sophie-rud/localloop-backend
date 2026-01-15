import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
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
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1500, // Maximum 1500 requêtes par IP
    message: "Trop de requêtes, veuillez réessayer plus tard.",
});

app.use(helmet());
// app.use(helmet({
//     contentSecurityPolicy: false, // Désactiver si cela bloque vos scripts
//     crossOriginEmbedderPolicy: false, // Désactiver si vous chargez des ressources externes
// }));
app.use(hpp());
app.use(limiter);

app.use('/tracks', trackRoutes);
app.use('/tracks/:trackId/steps', stepRoutes);
// app.get('/steps', stepController.getAllSteps);
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
