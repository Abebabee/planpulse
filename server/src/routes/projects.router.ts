// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Project from "../models/project";
import Task from "models/task";
import Message from "models/message"
import NewProject from "models/newproject";
import { getUserByEmail } from '../services/database.userservice'; 
// Global Config
export const projectRouter = express.Router();

projectRouter.use(express.json());

// GET


projectRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const userId = _req.query.userId as string;
        if (!userId) {
            return res.status(400).send("User ID is required");
        }
        const tempId = new ObjectId(userId)
        if (collections.projects !== undefined) {
            
            const projects = await collections.projects
                .find({
                    $or: [
                        { ownerId: userId },
                        { invitedUsers: tempId } // Check if the userId is in the invitedUsers array
                    ]
                })
                .toArray() as unknown as Project[];

            res.status(200).send(projects);
        } else {
            res.status(404).send("Projects collection not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});




projectRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        if(collections.projects!=undefined){
            const project = (await collections.projects.findOne(query)) as unknown as Project;

            if (project) {
                res.status(200).send(project);
            }
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

//Get task by ID:
// GET a specific task by ID

projectRouter.get("/:projectId/tasks/:taskId", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
  
    try {
      // Find the project with the given ID
      if (collections.projects) {
        const project = await collections.projects.findOne({ _id: new ObjectId(projectId) });
        
        if (!project) {
          return res.status(404).send(`Project with id ${projectId} not found`);
        }
    
        // Find the task with the given ID within the project's tasks array
       
        const task = project.tasks.find((task: Task) => task?.id?.toString() === taskId);
    
        if (!task) {
          return res.status(404).send(`Task with id ${taskId} not found in project with id ${projectId}`);
        }
    
        // Send the task data as the response
        res.status(200).send(task);
      }
      
    } catch (error) {
      console.error("Error getting task:", error);
      res.status(500).send("Internal Server Error");
    }
});
//GET - All messages from project
projectRouter.get('/:projectId/messages', async (req: Request, res: Response) => {
    try {
      const projectId = req.params.projectId;

      if(collections.projects){
        const project = await collections.projects.findOne({ _id: new ObjectId(projectId) });
  
        if (!project) {
          return res.status(404).send(`Project with id ${projectId} not found`);
        }
        const messages = project.messages || [];
        res.status(200).json(messages);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

// POST - New Project

projectRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newProject = req.body as NewProject;
        newProject._id = new ObjectId(newProject._id);
        if(collections.projects!=undefined){
            const result = await collections.projects.insertOne(newProject);
            result
            ? res.status(201).send(`Successfully created a new project with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new project.");
        }
    } catch (error) {
        console.error(error);
    }
});
//POST new message to project
projectRouter.post('/:projectId/messages', async(req: Request, res: Response)=>{
    try {
        const projectId = req.params.projectId;
        const message: Message = req.body;
    
        // Find the project by ID
        if(collections.projects){
            const project = await collections.projects.findOne({ _id: new ObjectId(projectId) });
    
            if (!project) {
              return res.status(404).send(`Project with id ${projectId} not found`);
            }
        
            // Initialize the messages array if it doesn't exist
            if (!project.messages) {
              project.messages = [];
            }
        
            // Add the message to the project's messages array
            project.messages.push(message);
        
            // Update the project in the database
            await collections.projects.updateOne({ _id: new ObjectId(projectId) }, { $set: { messages: project.messages } });
        
            res.status(201).send('Message added successfully');
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})


//POST task
projectRouter.post("/:projectId/tasks", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const newTask = req.body;

    try {
        const query = { _id: new ObjectId(projectId) };
        if(collections.projects!=undefined){
            const project = await collections.projects.findOne(query);
            if (project) {
                project.tasks.push(newTask);
                const result = await collections.projects.updateOne(query, { $set: project });
                if (result.modifiedCount === 1) {
                    res.status(201).send({ message: "Task added successfully" });
                } else {
                    res.status(500).send("Failed to add task");
                }
            } else {
                res.status(404).send(`Project with id ${projectId} not found`);
            }
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
//PUT -New project description:
// Import necessary dependencies and models

// PATCH - Update project description
projectRouter.patch("/:projectId/description", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const { description } = req.body;

    try {
        // Find the project by ID and update its description
        const query = { _id: new ObjectId(projectId) };
        const update = { $set: { description } };

        if (collections.projects) {
            const result = await collections.projects.updateOne(query, update);

            if (result.modifiedCount === 1) {
                res.status(200).send({ message: "Project description updated successfully" });
            } else {
                res.status(404).send(`Project with id ${projectId} not found`);
            }
        }
    } catch (error) {
        console.error("Error updating project description:", error);
        res.status(500).send("Internal Server Error");
    }
});

  
  

// PATCH
projectRouter.patch("/:projectId/tasks/:taskId", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const updatedStatus = req.body.status; // Extract only the status field from the request body

    try {

        const query = { _id: new ObjectId(projectId), "tasks.id": taskId };
        const updateQuery = { $set: { "tasks.$.status": updatedStatus } }; // Update only the status field

        if (collections.projects) {
            const result = await collections.projects.updateOne(query, updateQuery);

            if (result.modifiedCount === 1) {
                res.status(200).send({ message: "Task status updated successfully" });
            } else {
                res.status(404).send(`Task with id ${taskId} not found in project with id ${projectId}`);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//PATCH - Add "assigned users" to task
//PATCH - Update assigned users for a task in a project
projectRouter.patch("/:projectId/tasks/:taskId/assignedUsers", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const assignedUsers = req.body.assignedUsers; // Extract assigned user IDs from the request body

    try {
        // Check if the task exists in the project
        if(collections.projects){
            const query = { _id: new ObjectId(projectId), "tasks.id": taskId };
            const project = await collections.projects.findOne(query);
            if (!project) {
                return res.status(404).send(`Task with id ${taskId} not found in project with id ${projectId}`);
            }
    
            // Retrieve the task from the project
            const task = project.tasks.find((task: any) => task.id === taskId);
            if (!task) {
                return res.status(404).send(`Task with id ${taskId} not found in project with id ${projectId}`);
            }
    
            // Update the assigned users for the task
            task.assignedUsers = assignedUsers;
    
            // Update the project in the database with the modified task
            
            const updateResult = await collections.projects.updateOne(query, { $set: { "tasks.$": task } });
    
            if (updateResult.modifiedCount === 1) {
                res.status(200).send({ message: "Assigned users updated successfully for the task" });
            } else {
                res.status(500).send("Failed to update assigned users for the task");
            }
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});







//PATCH - Add users to invitedUsers array inside project
projectRouter.patch("/:projectId/invitedUsers", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const invitedEmails = req.body.invitedUsers; // Extract invited user emails from the request body

    try {
        // Fetch user IDs corresponding to the provided email addresses
        const userIds = await Promise.all(invitedEmails.map(async (email: string) => {
            const user = await getUserByEmail(email);
            return user ? user._id : null;
        }));

        // Filter out any null values (user not found for an email)
        const validUserIds = userIds.filter(id => id !== null);

        const query = { _id: new ObjectId(projectId) };
        if(collections.projects){
            const project = await collections.projects.findOne(query);

            if (!project) {
                return res.status(404).send(`Project with id ${projectId} not found`);
            }
    
            // Update the project document with the valid user IDs
            project.invitedUsers = validUserIds;
    
            // Save the updated project document
            await collections.projects.updateOne(query, { $set: project });
    
            res.status(200).send({ message: "Users added to invitedUsers array successfully" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});





// DELETE