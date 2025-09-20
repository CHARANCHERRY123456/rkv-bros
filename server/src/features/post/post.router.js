import express from 'express';
import PostController from './post.controller.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

// const controller = new PostController();
const postRouter = express.Router();

postRouter.post("/" , authMiddleware, PostController.createPost);
postRouter.get("/" , authMiddleware , PostController.getAllPosts);

export default postRouter;