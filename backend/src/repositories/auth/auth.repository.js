const Register = require("../../models/userSchema");

const findUser = async (query, select = "") => {
  const dbQuery = Register.findOne(query);
  if (select) {
    dbQuery.select(select);
  }
  return await dbQuery;
};

const createUser = async (userData) => {
  return await Register.create(userData);
};

const saveUser = async (user, options = {}) => {
  return await user.save(options);
};

module.exports = {
  findUser,
  createUser,
  saveUser,
};
