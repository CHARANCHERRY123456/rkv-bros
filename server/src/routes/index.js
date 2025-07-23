import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';
import assignmenrRouter from './content/assignmentRoutes.js';
import analyticRouter from './analyticRoute.js'
import chatRouter from './chat/chat.js';
import searchRouter from '../features/search/routes/index.js';


const router = Router();
router.use("/student" , studentRouter);
router.use("/auth" , authRouter);
router.use("/assignments" , assignmenrRouter);
router.use("/dashboard" , analyticRouter);
router.use("/chat" , chatRouter);
router.use("/" , (req , res)=>{
    res.send({
        "message" : "congrats bro nee website pani chesta undi"
    })
})
router.use("/search" , searchRouter);

export default router; 