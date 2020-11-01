const Post = require('../../models/Post');


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
        
    }
}