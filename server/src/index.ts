import express from 'express';
import { connectToDatabase } from './services/database.service';
import { projectRouter } from './routes/projects.router';
import { userRouter } from './routes/user.router';
import imagesRouter from './routes/images.router';
import * as dotenv from 'dotenv';
import { createServer } from 'http'; // Import the HTTP module
import { Server } from 'socket.io'; // Import the Socket.IO server class
import cors from "cors"
import Task from 'models/task';
//const cors = require('cors');

const app = express();
const httpServer = createServer(app); // Create HTTP server
//const io = new Server(httpServer); // Create Socket.IO server
const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow requests from this origin
      methods: ["GET", "POST"] // Allow these HTTP methods
    }
  });
dotenv.config();
app.use(cors());
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET ?? 'filler';
const port = process.env.PORT || 3001;

connectToDatabase()
    .then(() => {
        app.use('/projects', projectRouter);
        app.use('/users', userRouter);
        app.use('/images', imagesRouter);

        // WebSocket setup
        io.on('connection', (socket) => {
            console.log('A client connected');

            socket.on('taskStatusUpdate', (data:{projectId: string, taskId:string, status:string})=>{
                socket.broadcast.emit('taskStatusUpdated', data);
            })
            socket.on('newTask', (data:{projectId: string, task: Task})=>{
                socket.broadcast.emit('newTaskUpdated',data);
            })
            socket.on('disconnect', () => {
                console.log('A client disconnected');
            });
        });

        httpServer.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error);
        process.exit();
    });
