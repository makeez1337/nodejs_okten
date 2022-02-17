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

app.get('/login', ((req, res) => {
    res.render('login');
}))

app.post('/login',((req, res) => {
    console.log(req.body);
}))



app.listen(5200, () => {
    console.log('Server on PORT 5200 has started');
})


