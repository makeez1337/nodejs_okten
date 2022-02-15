const fs = require('fs');
const path = require('path');

// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson,

// fs.mkdir(path.join(__dirname, 'main'), (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.mkdir(path.join(__dirname, 'main', 'online'), (err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     }));
//
//     fs.mkdir(path.join(__dirname, 'main', 'inPerson'), err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     });
// });

// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;

const onlineUsers = [
    {name: 'Max', age: 20, city: 'Sokal'},
    {name: 'Oleg', age: 25, city: 'Lviv'},
    {name: 'Sasha', age: 35, city: 'Kiev'},
    {name: 'Anton', age: 18, city: 'Kharkiv'}
];

const inPersonUsers = [
    {name: 'Alina', age: 20, city: 'Lviv'},
    {name: 'Vika', age: 25, city: 'Lviv'},
    {name: 'Olena', age: 23, city: 'Kiev'},
    {name: 'Nastya', age: 27, city: 'Odessa'}
];

// const personUsersKeys = Object.keys(inPersonUsers[0]);
//
// for (let inPersonUser of inPersonUsers) {
//     const name = `\nNAME: ${inPersonUser[personUsersKeys[0]]}\n`
//     const age = `AGE: ${inPersonUser[personUsersKeys[1]]}\n`
//     const city = `CITY: ${inPersonUser[personUsersKeys[2]]}\n`
//     const user = `${name}${city}${age}`
//     fs.appendFile(path.join('main', 'inPerson', 'inPerson.txt'),
//         `${user}`
//         , err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//         })
// }

// const onlineUserKeys = Object.keys(onlineUsers[0]);
//
// for (const onlineUser of onlineUsers) {
//     const name = `\nNAME: ${onlineUser[onlineUserKeys[0]]}\n`
//     const age = `AGE: ${onlineUser[onlineUserKeys[1]]}\n`
//     const city = `CITY: ${onlineUser[onlineUserKeys[2]]}\n`
//     const user = `${name}${city}${age}`
//     fs.appendFile(path.join(__dirname, 'main', 'online', 'online.txt'), `${user}`, err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
// }


// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів
// з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

fs.rename(path.join(__dirname,'main','inPerson','inPerson.txt'),path.join(__dirname,'main','online','inPerson.txt'),err => {
    if (err) {
        console.log(err);
        throw err;
    }
})

fs.rename(path.join(__dirname,'main','online','online.txt'),path.join(__dirname,'main','inPerson','online.txt'),err => {
    if (err) {
        console.log(err);
        throw err;
    }
})