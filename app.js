const path = require("path");
const express = require('express');
const hbs = require('express-handlebars');
const {engine} = require("express-handlebars");

const app = express();

const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', staticPath);

let users = [
    {
        email: 'makeez@mail.com',
        password: 'asdqwe123',
        firstName: 'Makeez',
        lastName: 'Ivanov',
        age: 20,
        city: 'Sokal',
        id: 1
    },
    {
        email: 'oleg@mail.com',
        password: 'oleg123q',
        firstName: 'Oleg',
        lastName: 'Voytov',
        age: 30,
        city: 'Lviv',
        id: 2
    },
];

app.get('/login', ((req, res) => {
    res.render('login');
}))

app.get('/signIn', ((req, res) => {
    res.render('signIn');
}))

app.post('/signIn', ((req, res) => {
    const {email, password} = req.body;

    const filteredUser = users.filter(user => {
        if (user.email.includes(email) && user.password.includes(password)) {
            return true;
        }
    });
    const userId = filteredUser[0]?.id;

    if (userId) {
        res.redirect(`/users/${userId}`);
    } else {
        res.redirect('/error');
    }
}))

app.get('/users', ((req, res) => {
    const {city, age} = req.query;
    let filteredUsers = [...users];

    if (city && age) {
        filteredUsers = users.filter(user => user.city === city && user.age === age);
    } else if (city) {
        filteredUsers = users.filter(user => user.city === city);
    } else if (age) {
        filteredUsers = users.filter(user => user.age === age);
    }

    res.json(filteredUsers);
}))

app.get('/users/:id', ((req, res) => {
    const {id} = req.params;
    const user = users.filter(user => user.id === +id);
    console.log(user);

    if (user.length) {
        res.render('user', {user});
    } else {
        res.json('No such user');
    }
}))

app.get('/error', ((req, res) => {
    res.render('error');
}))

app.get('*', (req, res) => {
    res.render('notFound');
})

app.post('/login', ((req, res) => {
        if (!users.length) {
            users.push({...req.body, id: 1});
            res.redirect('/users');
        } else {
            const lastUserId = users[users.length - 1].id;
            const isEmailExist = users.some(user => user.email === req.body.email);

            if (isEmailExist) {
                res.redirect('/error');
            }else {
                users.push({...req.body, id: lastUserId + 1});
                res.redirect('/users');
            }
        }
    }
))

app.post('/users/:id', ((req, res) => {
    const {id} = req.params;
    users = users.filter(user => user.id !== +id);
    res.redirect('/users');
}))


app.listen(5200, () => {
    console.log('Server on PORT 5200 has started');
})

