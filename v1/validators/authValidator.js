const yup = require("yup");
const User = require("../models/User");


const userValidator = yup.object({
  username: yup.string()
              .min(5, "Username should contain at lest 5 characters.")
              .test('unique', '${value} is already taken.', async (value, object) => {
                const duplicate = await User.findOne({username:value}).select('-password').lean();
                console.log(duplicate);
                if (duplicate) {
                  return false;
                }
                return true;
              })
              .test('whitespace', 'No whitespace(s) allowed.', (value, object) =>  !(/\s/.test(value)))
              .required(),
  password: yup.string()
              .min(8, "Should at least contain 8 characters.")
              .test('complex', 'Password is not strong enough.', (value, object) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value))
              .required()
});

module.exports = userValidator;
