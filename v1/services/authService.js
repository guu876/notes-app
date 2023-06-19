const User = require('../models/User');
const bcrypt = require('bcrypt');
const Jwt = require('../../utils/jwt');

const validatePassword = (password, encryptedPassword) => {
    return bcrypt.compare(password, encryptedPassword);
}

module.exports = {

    authenticate: async(username, password) => {
        const user = await User.findOne({username}).exec();
    
        if (!user || !validatePassword(password, user.password) ) {
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

    logout: () => {

    }

};