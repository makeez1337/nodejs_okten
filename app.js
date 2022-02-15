const fs = require('fs');
const fsP = require('fs').promises
const path = require('path');

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
// дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

// fs.mkdir(path.join(__dirname,'first_task'),(err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.writeFile(path.join(__dirname,'first_task','text.txt'),'First task',err2 => {
//         if (err2) {
//             console.log(err2);
//             throw err2;
//         }
//         fs.readFile(path.join(__dirname,'first_task','text.txt'),"utf-8",(err3,data) => {
//             if (err3) {
//                 console.log(err3);
//                 throw err3;
//             }
//             fs.appendFile(path.join(__dirname,'first_task','append.txt'),`${data}`,err4 => {
//                 if (err4) {
//                     console.log(err4);
//                     throw err4;
//                 }
//             })
//         })
//     })
// }))

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// старий файл видаліть після того як все завершиться. Також вийде callback hell

// fs.writeFile(path.join(__dirname,'second_task.txt'),'SECOND TASK',err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })
//
// fs.readFile(path.join(__dirname, 'second_task.txt'), "utf-8", ((err, data) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.mkdir(path.join(__dirname, 'second_task'), err2 => {
//         if (err2) {
//             console.log(err2);
//             throw err2;
//         }
//         fs.writeFile(path.join(__dirname, 'second_task', 'new_file.txt'), `${data}`, err3 => {
//             if (err3) {
//                 console.log(err3);
//                 throw err3;
//             }
//             fs.unlink(path.join(__dirname, 'second_task.txt'), err4 => {
//                 if (err4) {
//                     console.log(err4);
//                     throw err4;
//                 }
//             })
//         })
//     })
// }))


// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать
// - це файли тоді вам потрібно їх очистити,
// але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

// for (let i = 1; i <= 3; i++) {
//     fs.mkdir(path.join(__dirname, 'third_task',`folder${i}`),err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//     fs.writeFile(path.join(__dirname,'third_task',`text${i}.txt`),`${i}asd`,err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
// }

fs.readdir(path.join(__dirname,'third_task'),(err,data) => {

    if (err) {
        console.log(err);
        throw err;
    }

    data.forEach(file => {
        (async() => {
            const stat = await fsP.lstat(path.join(__dirname,'third_task',`${file}`));

            if (stat.isFile()) {
                fs.truncate(path.join(__dirname,'third_task',`${file}`),err1 => {
                    if (err1) {
                        console.log(err1);
                        throw err1;
                    }
                })
            }

            if (stat.isDirectory()) {
                fs.rename(
                    path.join(__dirname,'third_task',`${file}`),
                    path.join(__dirname,'third_task',`${file}_new`),err1 => {
                    if (err1) {
                        console.log(err1);
                        throw err1;
                    }
                })
            }

        })().catch(console.error)
    })

})

// fs.readdir(path.join(__dirname, 'third_task'), (err, files) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     files.forEach(file => {
//         if (file.includes('.txt')) {
//             fs.truncate(path.join(__dirname,'third_task',`${file}`),err1 => {
//                 if (err1) {
//                     console.log(err1);
//                     throw err1;
//                 }
//             })
//         }else {
//             fs.rename(path.join(__dirname,'third_task',`${file}`),path.join(__dirname,'third_task',`${file}_new`),err1 => {
//                 if (err1) {
//                     console.log(err1);
//                     throw err1;
//                 }
//             })
//         }
//     })
// });