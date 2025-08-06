import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

import tokenRoute from './routes/token.js';
import userinfoRoute from './routes/userinfo.js';
import UserDataRoute from "./routes/users.js";
import localService from "./routes/local-service.js"
import woredaLogin from "./routes/woredaLogin.js"
import woredaDash from "./routes/woredaDashboard.js"
import woredaRequest from "./routes/woredaRequest.js"

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const prisma = new PrismaClient();
app.set('prisma', prisma); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors(
    {
        origin: 'https://frontend-production-97a2.up.railway.app', 
        credentials: true
    }
));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/token', tokenRoute);
app.use('/api/userinfo', userinfoRoute);
app.use('/api/users',UserDataRoute)
app.use("/api/request", localService)
app.use("/api/woreda/login",woredaLogin)
app.use("/api/woreda/dashboard",woredaDash)
app.use("/api/woreda",woredaRequest)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

