const validate = require('../../../common/helper/validation')
const requestBorrowBook =  require('../domain/value-objects/request-borrow-book')
const requestReturnBook =  require('../domain/value-objects/request-return-book')
const {RuntimeError} = require("../../../common/error/error");
const db = require('../../../migration/mysql/index')

const borrowingBook = async (request) => {
    request = validate(requestBorrowBook, request)
    let member = await getMember(request.memberId)

    let book = await getBook(request.bookId)

    // todo: checking stock
    if (book.stock === 0) {
        throw new RuntimeError("book borrowed by other member");
    }

    // todo: member cannot currently penalize
    await makeSureThatMemberNotBeingPenaltize(member)

    // todo: member cannot borrow more than two book
    await countBorrowBookByMemberId(member)

    // todo: decrease stock book
    await book.decrement('stock', {by : 1})

    // todo: create borrow
    return create(request)
}

const countBorrowBookByMemberId = async (member) => {
    let count = await db.borrows.count({
        where: {
            memberId : member.id,
            returnTimestamps: null
        }
    });

    if (count >= 2) {
        throw new RuntimeError("Members may not borrow more than 2 books")
    }
}

const makeSureThatMemberNotBeingPenaltize = async (member) => {
    if (member.penaltiesUntil !== null) {
        if (isDateInPast(member.penaltiesUntil)) {
            member.penaltiesUntil = null
            await member.save()
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

    let member = await getMember(request.memberId)

    let borrow = await getBorrow(request.borrowId)

    // todo: book must the borrow the member currently
    if (borrow.memberId !== request.memberId) {
        throw new RuntimeError("The returned book is a book that the member has borrowed");
    }

    // todo: update borrow, and give penalize if return more then 7 days
    await updateBorrowAndGivePenaltyIfBorrowedMoreThan7Days(borrow)

    // todo: increase stock book
    await increaseStockBook(borrow)

    return borrow
}



const updateBorrowAndGivePenaltyIfBorrowedMoreThan7Days = async (borrow) => {
    let now = new Date()
    let diffDay = calculateDateDifference(borrow.createdAt, now)
    if (diffDay > 7) {
        await db.members.update({
            penaltiesUntil : addDaysToToday(3)
        }, {
            where : {
                id : borrow.memberId
            }
        })
    }

    borrow.returnTimestamps = now
    borrow.totalDaysReturn = diffDay
    await borrow.save()
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

const increaseStockBook = async (borrow) => {
    let book = await db.books.findOne({where : {id: borrow.bookId}})
    await book.increment('stock', {by : 1})
}

const getBook = async  (bookId) => {
    let book = await db.books.findOne({where: {id: bookId}})
    if (!book) {
        throw new RuntimeError("book does not exist")
    }

    return book
}

const getMember = async (memberId) => {
    let member= await db.members.findOne({where: {id: memberId}})
    if (!member){
        throw new RuntimeError("member not found")
    }

    return member
}

const getBorrow = async (borrowId) => {
    let borrow = await db.borrows.findOne({where: {id: borrowId}})
    if (!borrow) {
        throw new RuntimeError("borrow not found")
    }

    return borrow
}


module.exports = {
    borrowingBook,
    returnBook
}