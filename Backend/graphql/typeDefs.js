const gql = require('graphql-tag');

module.exports = gql`

    type Post{
        id:ID!
        body: String!
        createdAt: String!
        userNmae: String!
    }
    type User{
        id:ID
        token:String
        userName:String
        email:String
        createdAt:String
    }
    input registerInput {
        userName:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Query{
        getPosts:[Post] 
    }
    type Mutation{
        register(registerInput:registerInput) : User!
    }
`;