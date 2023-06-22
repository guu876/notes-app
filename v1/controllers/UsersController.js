const userService = require('../services/userService');
const authService = require('../services/authService');

module.exports = {

  login: async (req, res) => {
    const {username, password} = req.body;

    const auth = await authService.authenticate(username, password);
  
    if (typeof auth[0] === 'boolean' && auth[0] === true) {
        res.status(200).json({
          auth: true,
          auth_type: 'Bearer',
          token: auth[1]
        })
    } else {
        res.status(401).json({message: auth[1]});
    }

  },

  logout: async (req, res) => {
    const {authorization} = req.headers;
    if (await authService.logout(authorization)) {
      return res.status(200).json(true);
    }
    res.status(400).json('Invalid token.');
  },

  register: async (req, res) => {
     const {username, password} = req.body;
     const _user = await userService.add(username, password);
     const user = await userService.get({id: _user.id})

     if (user) {
      res.status(200).json(user);
     } else {
      res.status(400).json({message: 'Invalid user data provided.'});
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
    const user = await userService.add(username, password);
    if (user) {
        res.status(200).json({message:  `User with username: ${user.username} created.`});
    } else {
        res.status(400).json({message: 'Invalid user data provided.'});
    }

  },

  read: () => {},

  update: () => {},

  delete: () => {},
};
