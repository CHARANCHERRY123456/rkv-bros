import {Router} from 'express';
import studentRouter from './studentRoute.js';
import authRouter from './authRoutes.js';
import assignmenrRouter from './content/assignmentRoutes.js';
import analyticRouter from './analyticRoute.js'
import chatRouter from './chat/chat.js';
import newChatRouter from '../features/chat/routes/index.js';
import searchRouter from '../features/search/routes/index.js';


const router = Router();
router.use("/student" , studentRouter);
router.use("/auth" , authRouter);
router.use("/assignments" , assignmenrRouter);
router.use("/dashboard" , analyticRouter);
router.use("/chat" , newChatRouter); // New feature-based chat with WhatsApp-style ordering
router.use("/chat-legacy" , chatRouter); // Keep old routes for emergency fallback
router.use("/search" , searchRouter);
router.use("/health" , (req , res)=>{
    res.send({
        "message" : "congrats bro nee website pani chesta undi"
    })
})

export default router; 