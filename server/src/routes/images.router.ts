// images.router.ts

import express, { Request, Response } from 'express';
import multer from 'multer';
import { collections } from '../services/database.service';
import { ObjectId } from 'mongodb';
import { getUserByEmail, updateUserProfilePicture } from '../services/database.userservice';
import { Storage } from '@google-cloud/storage';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const path = require("path")
//const upload = multer({ dest: 'uploads/' }); // Set destination folder for temporary file storage

//process.env.GOOGLE_APPLICATION_CREDENTIALS = '/path/to/your/service-account-key.json';

// Create a new instance of Storage using the environment variable for authentication
const storage = new Storage({
    keyFilename: path.join(__dirname, '../../planpulse-418310-201486e42a75.json'),
    projectId: process.env.PROJECT_ID,
});

storage.getBuckets().then(x=> console.log(x))
const bucketName = process.env.GCS_BUCKET_NAME || "";//storage.bucket("planpulse-image-bucket")
console.log(bucketName)


const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size (in bytes), adjust as needed
    },
});

router.post('/upload-profile-picture', upload.single('profilePicture'), async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const file = req.file;

        if (!userId || !file) {
            return res.status(400).json({ message: 'User ID and file are required' });
        }

        const fileName = `${userId}-${file.originalname}`;
        const filePath = `profile-pictures/${fileName}`;

        // Upload file to GCS bucket
        await storage.bucket(bucketName).file(filePath).save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
        });

        // Optionally, you can store the file URL in the database or perform any other actions
        await updateUserProfilePicture(userId, filePath)
        return res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Define a route to handle image uploads

export default router;
