
module.exports = async (db) => {
    const data = [
        {
            code: "M001",
            name: "Angga",
        },
        {
            code: "M002",
            name: "Ferry",
        },
        {
            code: "M003",
            name: "Putri",
        },
    ]

    for (const member of data) {
        await db.members.create(member)
    }

}