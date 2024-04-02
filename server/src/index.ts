// index.ts
import express from 'express';
import { connectToDatabase } from './services/database.service';
import { projectRouter } from './routes/projects.router';
import { userRouter } from './routes/user.router';
import imagesRouter from './routes/images.router'; // Import the image router
import * as dotenv from 'dotenv';
const cors = require('cors');
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET ?? 'filler';
const port = process.env.PORT || 3001;
console.log('token i index: ' + JWT_SECRET);

connectToDatabase()
    .then(() => {
        app.use('/projects', projectRouter);
        app.use('/users', userRouter);
        app.use('/images', imagesRouter); // Mount the image router

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error);
        process.exit();
    });
