const posts = require('./posts');
const user = require('./users');

module.exports = {
    Query: {
        ...posts.Query,
        ...user.Query
    },
    Mutation: {
        ...user.Mutation,
        ...posts.Mutation
    }
}