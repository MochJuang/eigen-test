const { RuntimeError } = require('../../../common/error/error')
const db = require('../../../migration/mysql/index')


const getAllMembersWithTotalBookHasBorrowed =  () => {
    return db.members.findAll({
        attributes: [
            'id',
            'name',
            'code',
            [db.sequelize.fn('COUNT', db.sequelize.col('borrows.id')), 'bookBorrowed'],
        ],
        include : [
            {
                model: db.borrows,
                required: false,
                attributes: [],
                where: {
                    returnTimestamps: null
                },
            }
        ],
        group: ['members.name'],
        order: [[db.sequelize.col('bookBorrowed'), 'DESC']],
    })
}

module.exports = {
    getAllMembersWithTotalBookHasBorrowed,
}