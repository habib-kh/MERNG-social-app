const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');


module.exports = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_,{postID}){
            try {
                const post = await Post.findById(postID);
                if(!post) {
                    throw new Error('Post not found');
                }
                return post;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_,{body},context){
            const user = checkAuth(context);
            const post = new Post({
                userName: user.userName,
                createdAt: new Date().toISOString(),
                user:user.id,
                body,
            });
            const newPost = await post.save();
            return newPost;
        }
    }

}