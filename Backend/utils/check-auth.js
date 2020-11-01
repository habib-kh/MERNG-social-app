const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function checkAuth(context){
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            const user = jwt.verify(token,SECRET_KEY);
            if(user){
                return user;
            }
            throw new AuthenticationError('token is wrong/Expired');
        }
        throw new Error('token must be started by Bearer ...');
    }
    throw new Error('token must be in Authorization header');
}

module.exports = checkAuth;