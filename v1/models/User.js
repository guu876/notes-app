const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
}, {
    methods: {
        validatePassword: async function (password)  {
            return (await bcrypt.compare(password, this.password));
        }
            
    }

});

module.exports = mongoose.model("User", userSchema);
