/** Config */
import app from "../configs/app.config";

/** Routes */
import authRouter from "./auth.route";
import userRouter from "./user.route";

app.use("/auth", authRouter);
app.use("/user", userRouter);
