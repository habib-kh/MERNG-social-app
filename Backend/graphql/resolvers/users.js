const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators');

const generateToken = user => {
    const token =jwt.sign({
        userName: user.userName,
        id:user._id,
        email:user.email   
    },SECRET_KEY,{expiresIn:'1h'});
    return token;
}
module.exports = {
    Mutation: {
        async register(_, {registerInput:{userName, email, password, confirmPassword}}, context, info){
            //validate user data 
            const validation = validateRegisterInput(userName,email,password,confirmPassword);
            if(!validation.valid){
                throw new UserInputError('Errors',{errors:validation.errors});
            }
            
            //check if user has already taken 
            const oldUser = await User.findOne({userName});
            if(oldUser){
                throw new UserInputError('userName already taken', {
                    errors:{
                        username: ' username already taken' 
                    }
                });
            } 
            
            password = await bcrypt.hash(password, 12);
             const newUser = new User({
                 userName,
                 email,
                 password,
                 createdAt: new Date().toISOString()
             });
             const res = await newUser.save();
             const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },
        async login(_, {userName,password}, context, info){
            const validation=validateLoginInput(userName, password);
            if(!validation.valid){
                throw new UserInputError('Errors', {errors:validation.errors});
            }
            const user = await User.findOne({userName});
            //check for existance of user 
            console.log('adcsdc');
            if(!user){
                console.log('1221');
                throw new UserInputError('username or password wrong',{
                    username : 'user  is wrong'
                });
            }
            //check password 
            validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){
                throw new UserInputError('username or password wrong',{
                    password: 'password is wrong'
                });
            }
            //generate token 
            const token = generateToken(user);

            return {
                ...user._doc,
                id:  user._id,
                token
            }

        }
    }
}