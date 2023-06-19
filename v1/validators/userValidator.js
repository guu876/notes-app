const yup = require("yup");
const User = require("../models/User");

yup.addMethod(yup.string, "uniqueUsername", (errorMessage) => {

  return yup.string().test("is-unique-username", errorMessage, async (value, ref) => {
    const { path, createError, originalValue } = ref;

    const duplicate = await User.findOne({ username: originalValue }).lean().exec();

    if (duplicate) {
      throw createError({ path, message: errorMessage });
    }

    return true;
  });
});

const userValidator = yup.object({
  username: yup.string().uniqueUsername("Username is already taken.").required(),
  password: yup.string(),
});

module.exports = userValidator;
