// apiService.js
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {ObjectId} from 'bson'
import Cookies from 'js-cookie';
import { getEmailFromToken, getUserIdFromToken } from '../utils/authUtils';

export interface Task {
    id: ObjectId;
    title: string;
    description: string;
    status: string;
    prio: string;
    assignedUsers?: string[]
    tag?: string
}
  
export interface Project {
    _id: string;
    name: string;
    description: string;
    tasks: Task[];
    ownerId?:string;
    invitedUsers?: string[];
}
interface NewProject {
    _id: ObjectId
    name: string;
    description: string;
    ownerId: string;
    invitedUsers: string[];
    tasks: Task[];
}
interface NewUser{
  fullname:string
  email: string
  password: string
}
interface LoginUser{
  email:string
  password:string
}
interface Message{
  from: string
  message: string
  date:Date
}
type ProjectResponse = AxiosResponse<NewProject>;
type UserResponse = AxiosResponse<NewUser>;

const API_BASE_URL = 'http://localhost:3001';

//GET
export const getAllProjects = async () => {
  const token = Cookies.get('token');
  console.log(token)
  if(token){
    const userId = getUserIdFromToken(token)
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`,{params: {userId}});
        console.log("Response.data: "+response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
  }
};

export const getProjectById = async (projectId: string): Promise<Project> => {
    try {
      const response = await axios.get<Project>(`http://localhost:3001/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      throw error;
    }
};
//Get user data:
export const getUserData = async (userId: string) => {
  try {
    const token = Cookies.get('token');
    if (token) {
      // Set the authorization token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make a GET request to fetch user data including profile picture URL
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`, { headers });

      return response.data; // Return user data
    } else {
      throw new Error('No token found'); // Handle case where no token is found
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getTaskById = async (projectId: string, taskId: string)=>{
  try{
    const response = await axios.get<Task>(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`)
    return response.data;
  }catch(error){
    console.error("Error getting task:"+error)
  }
}

//GET - All messages from project
export const getMessages = async(projectId:string)=>{
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/messages`)
    return response.data
  } catch (error) {
    console.error("Error getting message data: "+error)
  }
}


//POST - New project
export const createProject = async (projectData: NewProject): Promise<ProjectResponse> => {
  try {
      // Remove the $oid prefix and directly assign the ObjectId
      projectData._id = new ObjectId(projectData._id)
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
      return response.data;
  } catch (error) {
      console.error('Error creating project:', error);
      throw error;
  }
};



//POST - login User
export const loginUser = async (userData: LoginUser) => {
  try {
    // Send a POST request to the login endpoint with user data
    const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
    // Return the response, which should contain the JWT token
    Cookies.set('token',response.data.token, {expires: 7, secure: true},)
    return response.data.token;

  } catch (error) {
    // Log and handle errors
    console.error('Error logging in user:', error);
    throw error;
  }
};
//POST - New message here:
export const addNewMessage = async (projectId: string, message: Message): Promise<void> => {
  try {
    await axios.post<string>(`http://localhost:3001/projects/${projectId}/messages`, message);
  } catch (error) {
    console.error('Error adding new message:', error);
    throw error;
  }
};

//POST - New profile picture:
export const addProfilePicture = async (userId: string, file: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('userId', userId); // Append userId to the FormData
    formData.append('profilePicture', file); // Append the file to the FormData
    
    // Send a POST request to the server
    await axios.post(`${API_BASE_URL}/images/upload-profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
      },
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

export const createTask = async (projectId: string, newTask: Task): Promise<Project> => {
    try {
  
      // Send the new task data to the backend
      const response = await axios.post<Project>(`${API_BASE_URL}/projects/${projectId}/tasks`, newTask);
      
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

export const createNewUser = async (userData: NewUser): Promise<UserResponse>=>{
  try{
    const response = await axios.post(`${API_BASE_URL}/users/signup`, userData)
    return response
  }catch(error){
    console.error("error creating new user: "+error);
    throw error
  }
}
//Invite collaborators to project

export const inviteCollaborators = async (projectId: string, invitedUsers: string[]): Promise<void> => {
  try {
    await axios.patch(`${API_BASE_URL}/projects/${projectId}/invitedUsers`, { invitedUsers });
  } catch (error) {
    console.error('Error inviting collaborators:', error);
    throw error;
  }
};


//POST - New Project Description
export const createNewProjectDescription = async (projectId: string, description: string): Promise<void> =>{
  try {
    console.log("hej i createNew!")
    await axios.patch(`${API_BASE_URL}/projects/${projectId}/description`, { description});
  } catch (error) {
    console.error('Error updating description:', error);
  }
};

//UPDATE task
export const updateTaskStatus = async (projectId: string, taskId: string, newStatus: string): Promise<void> => {
  try {
    // Make a PATCH request to update the task status
    console.log(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`)
    await axios.patch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`, { status: newStatus });
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

//Update assigned users on task
export const updateAssignedUsers = async (projectId: string, taskId: ObjectId, assignedUsers: string[]): Promise<void> =>{
  try{
    console.log(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/assignedUsers`)
    await axios.patch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/assignedUsers`, { assignedUsers })
  }catch(error){
    console.error("Error assigning users: "+error)
    throw error;
  }
}


