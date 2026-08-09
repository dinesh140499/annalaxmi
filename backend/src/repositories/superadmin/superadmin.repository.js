module.exports = {
    getAllAdmins: async () => {
        return await User.find({ role: 'admin' })
    },
}