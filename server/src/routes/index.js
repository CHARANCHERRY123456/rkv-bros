import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';

const router = Router();

router.use("/student" , studentRouter);
router.use("/auth" , authRouter);


export default router;