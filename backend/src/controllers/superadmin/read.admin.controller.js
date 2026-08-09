const { getAllAdmins } = require("../../services/superadmin/superAdmin.service");

exports.getAdmins = async (req, res) => {
    const admins = await getAllAdmins()
    return res.status(200).json({
        success: true,
        admins
    })
}
