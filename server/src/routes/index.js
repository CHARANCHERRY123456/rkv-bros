import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';
import assignmenrRouter from './content/assignmentRoutes.js';

const router = Router();
router.use("/student" , studentRouter);
router.use("/auth" , authRouter);
router.use("/api/assignments" , assignmenrRouter);



export default router;