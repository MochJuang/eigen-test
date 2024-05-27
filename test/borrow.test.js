

const calculateDateDifference = (startDate, endDate) => {
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.floor(dayDifference);
}

function isDateInPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < today;
}

describe('Borrow', () => {

    it('should ', () => {
        let startDate = new Date('2025-01-14');
        let result = isDateInPast(startDate);
        console.log(result);
    });
})