const path = require("path");
const express = require('express');
const hbs = require('express-handlebars');
const {engine} = require("express-handlebars");

let users = require('./dataStorage/users');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

const staticPath = path.join(__dirname, 'static');

//DEFAULT SETUP
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ENGINE SETUP
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', staticPath);

//ROUTES SETUP
app.use(apiRoutes);

app.listen(5200, () => {
    console.log('Server on PORT 5200 has started');
})

