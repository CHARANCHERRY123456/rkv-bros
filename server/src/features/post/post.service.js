import PostRepository from './post.repository.js';

class PostService {
  constructor() {
    this.repository = PostRepository;
  }

  async createPost(postData) {
    return this.repository.create(postData);
  }

  async getAllPosts({page , limit , userId}){
    if(!page) page = 1;
    if(!limit) limit = 10;
    return this.repository.getAllPosts({page , limit , userId});
  }

  async getPostById({postId , userId}){
    return this.repository.getPostById({postId , userId});
  }

  async toggleLike(likeData){
    return this.repository.toggleLike(likeData);
  }


}

export default new PostService();