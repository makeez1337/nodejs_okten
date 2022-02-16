const fs = require('fs');


//CREATE TXT FILE WITH USERS

const createFileWithUsers = (arrayWithUsers,pathToAppend) => {
    const userKeys = Object.keys(arrayWithUsers[0]);

    for (let user of arrayWithUsers) {

        const name = `\nNAME: ${user[userKeys[0]]}\n`
        const age = `AGE: ${user[userKeys[1]]}\n`
        const city = `CITY: ${user[userKeys[2]]}\n`
        const newUser = `${name}${city}${age}`

        fs.appendFile(pathToAppend,
            `${newUser}`
            , err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
    }
}


//FOR SWAPPING DATA BETWEEN FILES
const swapData = (pathFrom, pathTo) => {
    fs.readFile(pathFrom, "utf-8", ((err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.writeFile(pathTo, data, err => {
            if (err) {
                console.log(err);
                throw err;
            }
        })
    }))
}

module.exports = {
    swapData,
    createFileWithUsers
}