import Post from './schema/Post.js';
import Like from './schema/Like.js'
import CrudRepository from '../../repositories/CrudRepository.js';
import mongoose from 'mongoose';

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }
    async getAllPosts({page , limit , userId}){
        const userIdObj = new mongoose.Types.ObjectId(userId);
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
            }, // add a likes(array object) field for each post

            {
                $addFields : {
                    likeCount  : {$size : "$likes"},
                    isLikeByMe : {$in : [userIdObj ,{
                        $map : {
                            input : "$likes",
                            as : "like",
                            in : "$$like.userId"
                        }
                    } ]}

                }
            },

            
            {$lookup : {
                from : "users",
                localField : "userId",
                foreignField : "_id",
                as : "user"
            }},
            {$unwind : "$user"},
            {$project : {likes : 0 , "user.password": 0 , "user.__v":0}},
        ])

        return posts;
    }
    async getPostById({postId , userId}){
        const userIdObj = new mongoose.Types.ObjectId(userId);
        const postIdObj = new mongoose.Types.ObjectId(postId);
        const posts = await Post.aggregate([
            {$match : {_id : postIdObj}},
            {
                $lookup : {
                    from : "likes",
                    localField : "_id",
                    foreignField : "postId",
                    as : "likes"
                }
            }, // add a likes(array object) field for each post

            {
                $addFields : {
                    likeCount  : {$size : "$likes"},
                    isLikeByMe : {$in : [userIdObj ,{
                        $map : {
                            input : "$likes",
                            as : "like",
                            in : "$$like.userId"
                        }
                    } ]}

                }
            },

            {$project : {likes : 0}}
        ])

        return posts;
    }

    async toggleLike({postId , userId}){
        const existing = await Like.findOne({userId , postId});
        console.log(existing);
        
        if(existing){
            await Like.deleteOne({userId , postId});
            console.log("Your like has been removed");
            return {liked : false}
        }else{
            await Like.create({userId , postId});
            console.log("Your like has been added");
            return {liked : true}
        }
    }


}

export default new PostRepository();