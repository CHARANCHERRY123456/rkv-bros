import Post from './schema/Post.js';
import CrudRepository from '../../repositories/CrudRepository.js';

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }
    async getAllPosts({page , limit , userId}){
        const posts = await Post.aggregate([
            // {$match : {userId : { $eq: userId }} }, // if want to exclude self posts
            {$sort : {createdAt : -1}},
            {$skip : (page-1)*limit},
            {$limit : limit},

            {
                $lookup : {
                    from : "likes",
                    localField : "_id",
                    foreignField : "postId",
                    as : "likes"
                }
            },

            {
                $addFields : {
                    likeCount  : {$size : "$likes"},
                    isLikeByMe : {$in : [userId , "$likes.userId" ]}

                }
            },

            {$project : {likes : 0}}
        ])

        return posts;
    }
}

export default new PostRepository();