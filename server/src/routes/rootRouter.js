import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
const rootRouter = new express.Router();
import shoesRouter from "./api/v1/shoesRouter.js"


rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/shoes", shoesRouter)
rootRouter.use("/", clientRouter);

//place your server-side routes here

export default rootRouter;
