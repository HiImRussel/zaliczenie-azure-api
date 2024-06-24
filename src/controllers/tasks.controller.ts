/** Express */
import { Request, Response } from "express";

/** Models */
import Task from "../models/task.model";

/** Constants */
import { STATUS } from "../constants/status.constants";

/** Validation */
import addTaskSchema from "../validations/addTask.validation";
import updateTaskSchema from "../validations/updateTask.validation";

/** Services */
import { parseJoiError } from "../services/parseError.service";

export const getAllTasks = async (req: Request, res: Response) => {
    const { userId } = req;

    if (!userId) {
        return res.status(401).json({
            status: STATUS.ERROR,
            message: "User not found!",
        });
    }

    const tasks = await Task.findAll({
        where: { ownerID: userId },
        attributes: { exclude: ["ownerID"] },
    });

    res.status(200).json({
        status: STATUS.OK,
        tasks,
    });
};

export const addTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const { userId } = req;

    const { error } = addTaskSchema.validate({ title, description });

    if (!userId) {
        return res.status(401).json({
            status: STATUS.ERROR,
            message: "User not found!",
        });
    }

    if (error) return parseJoiError(error, res);

    await Task.create({
        ownerID: userId,
        title,
        description,
        completed: false,
    });

    res.status(200).json({
        status: STATUS.OK,
    });
};

export const updateTask = async (req: Request, res: Response) => {
    const { id, title, description, completed } = req.body;
    const { userId } = req;

    const { error } = updateTaskSchema.validate({
        id,
        title,
        description,
        completed,
    });

    if (!userId) {
        return res.status(401).json({
            status: STATUS.ERROR,
            message: "User not found!",
        });
    }

    if (error) return parseJoiError(error, res);

    const task = await Task.findOne({ where: { id, ownerID: userId } });

    if (!task) {
        return res.status(401).json({
            status: STATUS.ERROR,
            message: "Task not found!",
        });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    try {
        await task.save();
    } catch (e) {
        return res.status(401).json({
            status: STATUS.ERROR,
            message: "An error occurred while updating a task!",
        });
    }

    res.status(200).json({
        status: STATUS.OK,
        task,
    });
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req;

    const task = await Task.findOne({ where: { id, ownerID: userId } });

    if (!task) {
        return res.status(401).json({
            status: STATUS.ERROR,
            message: "Task not found!",
        });
    }

    await task.destroy();

    res.status(200).json({
        status: STATUS.OK,
    });
};
