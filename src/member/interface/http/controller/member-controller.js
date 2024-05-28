const db = require("../../../../../migration/mysql");
const memberInfrastructure =  require('../../../application/member-application')
const getAllMembersWithTotalBookHasBorrowed = async (req, res, next) => {
    try {
        const result = await memberInfrastructure.getAllMembersWithTotalBookHasBorrowed();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}


module.exports = {
    getAllMembersWithTotalBookHasBorrowed
}