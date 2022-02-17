const path = require("path");
const express = require('express');
const hbs = require('express-handlebars');
const {engine} = require("express-handlebars");

const app = express();

const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("trust proxy", 1);
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', staticPath);

const users = [];
const usersEmails = [];

app.get('/login', ((req, res) => {
    res.render('login');
}))

app.get('/users', ((req, res) => {
    const {city, age} = req.query;
    let filteredUsers = [];

    if (city && age) {
        filteredUsers = users.filter(user => user.city === city && user.age === age);
    } else if (city) {
        filteredUsers = users.filter(user => user.city === city);
    } else if (age) {
        filteredUsers = users.filter(user => user.age === age);
    }

    if (filteredUsers.length) {
        res.json(filteredUsers);
    } else {
        res.json(users);
    }
}))

app.get('/users/:id', ((req, res) => {
    const {id} = req.params;
    const user = users.filter(user => user.id === +id);

    if (user.length && user) {
        res.json(user);
    } else {
        res.json('No such user');
    }
}))

app.get('/error', ((req, res) => {
    res.render('error');
}))

app.post('/login', ((req, res) => {
    if (!users.length) {
        users.push({...req.body, id: 0});
        res.redirect('/users');
    } else {
        const lastUserId = users[users.length - 1].id;

        if (!usersEmails.includes(req.body.email)) {
            users.push({...req.body, id: lastUserId + 1});
            res.redirect('/users');
        } else {
            res.redirect('/error');
        }
    }
    usersEmails.push(req.body.email);
}))

app.use((req, res) => {
    res.render('notFound');
})

app.listen(5200, () => {
    console.log('Server on PORT 5200 has started');
})


