const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {


    list: async() => {
        return (await User.find().select('-password').lean().exec());
    },

    add: async(username, password) => {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        return (await User.create({
            username,
            password: hashedPassword
        }));

    },

    get: async(filter = {}) => {
        return filter.hasOwnProperty('id') ? (await User.findById(filter.id).select('-password').lean()) : (await User.find(filter).select('-password'));
    }

};