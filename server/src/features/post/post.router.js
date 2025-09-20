import express from 'express';
import PostController from './post.controller.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const postRouter = express.Router();

postRouter.post("/" , authMiddleware, PostController.createPost);
postRouter.get("/" , authMiddleware , PostController.getAllPosts);
postRouter.get("/:postId" , authMiddleware , PostController.getPostById);
postRouter.put("/:postId/like" , authMiddleware , PostController.toggleLike);


export default postRouter;