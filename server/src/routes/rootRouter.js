import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import shoesRouter from "./api/v1/shoesRouter.js"

const rootRouter = new express.Router();

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/shoes", shoesRouter)
rootRouter.use("/", clientRouter)

export default rootRouter;
