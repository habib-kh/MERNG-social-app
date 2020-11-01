const { ApolloServer} = require('apollo-server');

const gql = require('graphql-tag');

const {MONGODB} = require('./config');
const  mongoose  = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req}) => ({req})
})

mongoose.connect(MONGODB, {useNewUrlParser:true}).then( () => {
  return server.listen({port: 5000});   }
).then(()=>{
    console.log('listening on PORT:5000');
})
