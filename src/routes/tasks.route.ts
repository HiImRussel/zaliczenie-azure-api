/** Express */
import { Router } from "express";

/** Middleware */
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    addTask,
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

export default router;
