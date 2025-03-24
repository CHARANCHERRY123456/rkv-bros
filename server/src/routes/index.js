import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';
import assignmenrRouter from './content/assignmentRoutes.js';
import folderRouter from './content/folderRoutes.js';
const router = Router();

router.use("/student" , studentRouter);
router.use("/auth" , authRouter);
router.use("/content/assignment" , assignmenrRouter);
router.use("/content/folder" , folderRouter);


export default router;