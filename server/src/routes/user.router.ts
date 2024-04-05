import express, { Request, Response } from 'express';
import { createUser } from '../services/database.userservice';
import { collections } from 'services/database.service';
import { User } from 'models/user';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
export const userRouter = express.Router();

const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret'; // Replace with your JWT secret key
//login
userRouter.post('/login', async (req: Request, res: Response)=>{
    try{
        const userData = req.body as User
        if(collections.users!==undefined){
            const existingUser = await collections.users.findOne({email: userData.email})
            if(!existingUser){
                return res.status(400).json({message: "Invalid email"})
            }
            const isValid = await bcrypt.compare(userData.password, existingUser.password)
            if(!isValid){
                return res.status(401).json({message: "Incorrect password"})
            }
            // If the email and password are correct, generate a JWT token
            const token = jwt.sign({ email: existingUser.email, userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

            // Send the token to the client
            return res.status(200).json({ token });
        }
    }catch(err){
        
    }
})
//get picture url:
userRouter.get('/:userId', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        // Find the user in the database
        if(collections.users){
            const user = await collections.users.findOne({ _id: new ObjectId(userId) });

            // If user is not found, return 404
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // If user has a profile picture URL, include it in the response
            const userData = {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                profilePictureUrl: user.profilePictureUrl ,
            };
    
            return res.status(200).json(userData); 
        }
        
    } catch (error) {
        // Log and handle errors
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//new user
userRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const userData = req.body as User;
        // Generate a new ObjectId for the user
        userData._id = new ObjectId();
        // Initialize the userData object with an _id property

        if (collections.users !== undefined) {
            // Check if a user with the same email already exists
            const existingUser = await collections.users.findOne({ email: userData.email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Create the user with the provided data
            await createUser(userData);
        }

        // Send a success response
        res.status(201).json({ message: 'User created successfully', userData });
    } catch (error) {
        // Log and handle errors
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});