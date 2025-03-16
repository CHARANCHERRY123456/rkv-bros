import {Router} from 'express';
import studentRouter from './studentRoute.js';

const router = Router();

router.use("/student" , studentRouter);


export default router;