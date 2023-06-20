const User = require('../models/User');
const bcrypt = require('bcrypt');
const Jwt = require('../../utils/jwt');

module.exports = {

    authenticate: async(username, password) => {
        const user = await User.findOne({username}).exec();
     
        if (!user || (await user.validatePassword(password, user.password)) === false ) {
            return [false, 'Incorrect username/password.'];
        }
       
        const payload = {uid:user._id}; 

        const token = Jwt.GenerateAccessToken(payload);
        user.token = token;
        await user.save();
        return [true, token];

    },

    // validatePassword: (password, encryptedPassword) => {
        
    // },

    register: async(username, password) => {

    },

    logout: async(authorization) => {
        const split = authorization.split('Bearer ');
        const token = split[1];
        const user = await User.findOne({token}).select('-password').exec();
        if (user) {
            user.token = '';
            if (user.save()) return true;
        }
        return false;
    },

};