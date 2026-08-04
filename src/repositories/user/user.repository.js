const userReadRepository = require("./user.read.repository");
const updateUserRepository = require("./updateUser.repository");

module.exports = {
    create: (data) => userReadRepository.create(data),
    findOne: (query, options) => userReadRepository.findOne(query, options),
    findById: (id, options) => userReadRepository.findById(id, options),
    findByIdAndUpdate: (id, updateData, options) => updateUserRepository.findByIdAndUpdate(id, updateData, options),
};
