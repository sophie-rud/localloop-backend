import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import path from "path";
import fs from 'fs';

const app = express();
import apiRouter from './routes/index.js';
import errorMiddleware from "./middlewares/error-middleware.js";

// Create uploads folder if it doesn't exist
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
    max: 1200, // Maximum 1200 requêtes par IP
    message: "Trop de requêtes, veuillez réessayer plus tard.",
});

app.use(helmet({
    contentSecurityPolicy: false, // Deactivate if helmet block scripts
    crossOriginEmbedderPolicy: false, // Deactivated because external data are charged from leaflet
}));
app.use(hpp());
app.use(limiter);

app.use('/api', apiRouter);

// Configure uploaded static files (avatars, photos)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res, filePath) => {
        res.set("Cache-Control", "public, max-age=31536000");
    }
}));

app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
