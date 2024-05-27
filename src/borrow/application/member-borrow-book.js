const validate = require('../../../common/helper/validation')
const requestBorrowBook =  require('../domain/value-objects/request-borrow-book')
const requestReturnBook =  require('../domain/value-objects/request-return-book')
const {RuntimeError} = require("../../../common/error/error");
const db = require('../../../migration/mysql/index')

const borrowingBook = async (request) => {
    request = validate(requestBorrowBook, request)
    await checkBookStatus(request.bookId)
    await makeSureThatMemberNotBeingPenaltize(request.memberId)
    await countBorrowBookByMemberId(request.memberId)
    return create(request)
}

const checkBookStatus = async (bookId) => {
    let book = await db.books.findAll({
        where: {
            id: bookId
        }
    })

    if (book.stock === 0) {
        throw new RuntimeError("book borrowed by other member");
    }
}

const countBorrowBookByMemberId = async (memberId) => {
    let count = await db.borrows.count({
        where: {
            memberId,
            returnTimestamps: null
        }
    });

    if (count >= 2) {
        throw new RuntimeError("Members may not borrow more than 2 books")
    }
}

const makeSureThatMemberNotBeingPenaltize = async (memberId) => {
    let member = await db.members.findOne({id : memberId})

    if (!member) {
        throw new RuntimeError("member not found")
    }

    if (member.returnTimestamps !== null) {
        if (isDateInPast(member.penaltiesUntil)) {
            await db.members.update(member.id, {penaltiesUntil : null})
        } else {
            throw new RuntimeError("Member is currently being penalized")
        }
    }
}

function isDateInPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < today;
}

const create = (borrow) => {
    return db.borrows.create(borrow)
}

const returnBook = async (request) => {
    request = validate(requestReturnBook, request)
    let borrow = await returnedBookMustBeBookThatBorrowed(request)
    await givePenaltyIfBorrowedMoreThan7Days(borrow)
    await db.books.increment('stock', {by : 1})
    return borrow
}

const returnedBookMustBeBookThatBorrowed = async (request) => {
    let borrow = await db.borrows.findOne({
        where: {
            id: request.borrowId
        }
    })

    if (borrow.memberId !== request.memberId) {
        throw new RuntimeError("The returned book is a book that the member has borrowed");
    }

    return borrow
}

const givePenaltyIfBorrowedMoreThan7Days = async (borrow) => {
    let now = new Date()
    let diffDay = calculateDateDifference(borrow.createdAt, now)
    if (diffDay > 7) {
        await db.members.update(borrow.memberId, {
            penaltiesUntil : addDaysToToday(diffDay - 7)
        })
    }

    let updated = { updatedTimestamp: now, totalDaysReturn: diffDay }
    await db.borrows.update(borrow.id, updated)
}

function addDaysToToday(daysToAdd) {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    return today;
}

const calculateDateDifference = (startDate, endDate) => {
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.floor(dayDifference);
}


module.exports = {
    borrowingBook,
    returnBook
}