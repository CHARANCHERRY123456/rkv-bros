import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';
import assignmenrRouter from './content/assignmentRoutes.js';
import analyticRouter from './analyticRoute.js'
const router = Router();
router.use("/student" , studentRouter);
router.use("/auth" , authRouter);
router.use("/assignments" , assignmenrRouter);
router.use("/dashboard" , analyticRouter);


export default router;