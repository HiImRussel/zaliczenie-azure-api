/** Express */
import { Router } from "express";

/** Middleware */
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    addTask,
    deleteTask,
    getAllTasks,
    updateTask,
} from "../controllers/tasks.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/all", verifyJWT, getAllTasks);

/** Post */
router.post("/add", verifyJWT, addTask);

/** Patch */
router.patch("/update", verifyJWT, updateTask);

/** Delete */
router.delete("/delete/:id", verifyJWT, deleteTask);

export default router;
