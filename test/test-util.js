const db = require('../migration/mysql/index');
const supertest = require('supertest');
const app = require('../src/http')

exports.testBookCode = "TEST-07"
exports.testMemberHarryCode = "TEST-MBR-01"
exports.testMemberPotterCode = "TEST-MBR-02"

exports.createTestBook = async () => {
    await db.books.create({
        code: this.testBookCode,
        title: "The Habbits",
        author: "C.S. Lewis",
        stock: 1
    })
}

exports.createTestMember = async () => {
    await db.members.create({
        code: this.testMemberHarryCode,
        name: "Harry",
    })

    await db.members.create({
        code: this.testMemberPotterCode,
        name: "Potter",
    })
}

exports.getTestBook = () => {
    return db.books.findOne({where : { code: this.testBookCode}})
}

exports.getTestMemberHarry = () => {
    return db.members.findOne({where : {code: this.testMemberHarryCode}})
}

exports.getTestMemberPotter = () => {
    return db.members.findOne({where : {code: this.testMemberPotterCode}})
}

exports.deleteTestBook = async () => {
    await db.books.delete({code : this.testBookCode})
}

exports.deleteTestMember = async () => {
    await db.members.delete({ code : this.testMemberHarryCode})
    await db.members.delete({ code : this.testMemberPotterCode})
}

exports.createHarryBorrowingBook = async () => {
    let book = await this.getTestBook()
    let member = await this.getTestMemberHarry()

    await supertest(app)
        .post('/api/borrow')
        .send({
            memberId : harry.id,
            bookId : book.id,
        })
}