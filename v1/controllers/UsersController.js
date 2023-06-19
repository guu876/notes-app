const userService = require('../services/userService');
const authService = require('../services/authService');

module.exports = {

  login: async (req, res) => {
    const {username, password} = req.body;

    const auth = await authService.authenticate(username, password);
    
    if (typeof auth[0] === 'boolean' && auth[0] === true) {
        res.status(200).json({Bearer: auth[1]})
    } else {
        res.status(401).json({message: auth[1]});
    }

  },

  index: async (req, res) => {
    const users = await userService.list();
    
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(401).json({message: 'No users exists.'});
    }
  },

  create: async(req, res) => {
    const {username, password} = req.body;

    if (await userService.add(username, password)) {
        res.status(200).json({message:  `User with username: ${user.username} created.`});
    } else {
        res.status(400).json({message: 'Invalid user data provided.'});
    }

  },

  read: () => {},

  update: () => {},

  delete: () => {},
};
