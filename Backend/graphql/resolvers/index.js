const posts = require('./posts');
const user = require('./users');

module.exports = {
    Query: {
        ...posts.Query
    },
    Mutation: {
        ...user.Mutation
    }
}