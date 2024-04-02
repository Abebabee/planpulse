import { collections } from '../services/database.service';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

export async function createUser(user: User): Promise<void> {
  // Hash password before storing it
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  console.log(user)
  try{
    if(collections.users != undefined){
        await collections.users.insertOne(user);
    }
  }catch(error){
    console.log("error in createUser")
  }
  // Store user data in the database
}
//UpdateUserProfilePicture
export const updateUserProfilePicture = async (userId: string, profilePictureUrl: string): Promise<void> => {
  try {
      // Update the user document in MongoDB
      if(collections.users){
        await collections.users.updateOne(
          { _id: new ObjectId(userId) }, // Filter by user ID
          { $set: { profilePictureUrl } } // Set the profilePictureUrl field
      );
      }
      
  } catch (error) {
      console.error('Error updating user profile picture:', error);
      throw error;
  }
};

// Function to fetch user details by email
export const getUserByEmail = async (email: string) => {
    try {
        // Assuming 'users' is the collection where user data is stored
        if(collections.users){
          const user = await collections.users.findOne({ email });
          return user;
        }
        
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
