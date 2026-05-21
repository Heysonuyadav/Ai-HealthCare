import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import assetRoutes from './routes/asset.routes.js';
import aiRoutes from './routes/ai.routes.js'
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "https://ai-healthcare-1-6y9r.onrender.com",
    credentials: true
}))


app.use("/auth", 
    authRoutes);
app.use("/asset", 
    assetRoutes);
app.use("/ai", 
    aiRoutes)
export default app;
