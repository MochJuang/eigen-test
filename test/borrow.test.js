const testUtils = require('./test-util')
const app = require('../src/http')
const supertest = require('supertest')

describe('POST /api/borrow', () => {
    beforeEach(async () => {
        // await testUtils.createTestBook()
        // await testUtils.createTestMember()
    })

    afterEach(async ()=> {
        await testUtils.deleteTestBook()
        await testUtils.deleteTestMember()
    })

    it('Should can borrow', async () => {
        let book = await testUtils.getTestBook()
        let harry = await testUtils.getTestMemberHarry()
        let request = {
            memberId : harry.id,
            bookId : book.id,
        }
        const result = await supertest(app)
            .post('/api/borrow')
            .set('Content-Type', 'application/json')
            .send(request)

        console.log(request)
        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.id).toBeDefined();
        expect(result.body.bookId).toBe(book.id);
        expect(result.body.memberId).toBe(harry.id);

    })
    //
    // it('Should can\'t borrow, because currently have penalized', () => {
    //
    // })
    //
    // it('Should can\'t borrow, because book borrow by other member ', () => {
    //
    // });
    //
    // it('Should can\'t borrow, because member have borrowed book more than two book ', () => {
    //
    // });
});