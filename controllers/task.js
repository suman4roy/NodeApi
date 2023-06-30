import { Task } from "../models/Task";

export const newTask = async (req, res,next)=>{
    try {
        const {title, description} = req.body;

    await Task.create({
        title,description,user:req.user,
    });

    res.status(201).json({
        success:true,
        message:"Task added Successfully",
    });
    } catch (error) {
        next(error);
    }
}

export const getMytasks = async (req, res, next)=>{
    try {
        const user_id = req.user._id;

    const tasks = await Task.find({user: user_id});

    res.status(200).json({
        success:true,
        tasks,
    });
    } catch (error) {
       next(error); 
    }
}

export const updateTask = async (req, res, next)=>{
    try {
        const {id} = req.params;

    const task = await Task.findById(id);
    task.isCompleted = !task.isCompleted; 
    await task.save();

    res.status(200).json({
        success:true,
    });
    } catch (error) {
       next(error); 
    }
}
export const deleteTask = async (req, res, next)=>{
   try {
    const task  = await Task.findById(req.params.id);
    await task.deleteOne();

    res.status(200).json({
        success:true,
    });
   } catch (error) {
        next(error);
   }
}