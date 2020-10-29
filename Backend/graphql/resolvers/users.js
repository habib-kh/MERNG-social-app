const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');
module.exports = {
    Mutation: {
        async register(_, {registerInput:{userName, email, password, confirmPassword}}, context, info){
             password = await bcrypt.hash(password, 12);
            console.log(password);
             const newUser = new User({
                 userName,
                 email,
                 password,
                 createdAt: new Date().toISOString
             });
             const res = await newUser.save();
             const token = jwt.sign({
                userName: res.userName,
                id:res.id,
                email:res.email   
            },SECRET_KEY,{expiresIn:'1h'});
            console.log(res);
            return {
                ...res._doc,
                id: res._id,
                token, 
            }
        }
    }
}