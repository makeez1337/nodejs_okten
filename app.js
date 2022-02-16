const fs = require('fs');
const path = require('path');

const {createFileWithUsers,swapData} = require('./utils');

// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson,

// fs.mkdir(path.join(__dirname, 'main'), (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//
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
//
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

const inPersonPath = path.join(__dirname, 'main', 'inPerson', 'inPerson.txt');
const onlinePath = path.join(__dirname, 'main', 'online', 'online.txt');

// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

// createFileWithUsers(onlineUsers, onlinePath);
// createFileWithUsers(inPersonUsers, inPersonPath);

// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів
// з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

// swapData(inPersonPath, onlinePath);
// swapData(onlinePath, inPersonPath);

