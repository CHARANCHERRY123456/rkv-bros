import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';
import assignmentRouter from '../features/assignment/assignment.routes.js';
import analyticRouter from './analyticRoute.js'
import chatRouter from '../features/chat/routes/index.js';
import searchRouter from '../features/search/routes/index.js';
import postRouter from '../features/post/post.router.js';


const router = Router();
router.use("/student" , studentRouter);
router.use("/auth" , authRouter);
router.use("/assignments" , assignmentRouter);
router.use("/dashboard" , analyticRouter);
router.use("/chat" , chatRouter); // Feature-based chat with legacy support built-in
router.use("/search" , searchRouter);
router.use("/post" , postRouter);
router.use("/health" , (req , res)=>{
    res.send({
        "message" : "congrats bro nee website pani chesta undi"
    })
})

export default router; 