import PostService from "./post.service.js";

class PostController {
    constructor() {
        this.service = PostService;
    }
    createPost = async(req, res) => {
        try {
            const post = await this.service.createPost({
                userId : req.user.id,
                content : req.body.content,
                mediaUrl : req.body.mediaUrl
            });
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message : error.message });
        }
    }

    getAllPosts = async (req , res)=>{
        try {
            const {page , limit} = req.query;
            const userId = req.user?.id;
            const posts = await this.service.getAllPosts({page , limit , userId});
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({message : error.message});
            
        }
    }

}

export default new PostController();