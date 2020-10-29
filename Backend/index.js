const { ApolloServer} = require('apollo-server');

const gql = require('graphql-tag');

const {MONGODB} = require('./config');
const  mongoose  = require('mongoose');
const Post = require('./models/Post');


const typeDefs = gql`

    type Post{
        id:ID!
        body: String!
        createdAt: String!
        userNmae: String!
    }
    type Query{
        getPosts:[Post] 
    
         
    }
`;

const resolvers = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser:true}).then( () => {
  return server.listen({port: 5000});   }
).then(()=>{
    console.log('listening on PORT:5000');
})
