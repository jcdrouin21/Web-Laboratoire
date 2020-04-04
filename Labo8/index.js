const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { uuid } = require('uuidv4');

const port = process.env.PORT || 8080;
const app = express();

const users = [];

app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');

app.use(bodyParser());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.render('login.ejs'));

app.get('/register', (req, res) => res.render('register.ejs'));

const validate = (token, username) => {
    return !!token &&
        !!username &&
        !!users[username] &&
        users[username].token === token;
};
app.get('/userprofile', (req, res) => {
    const token = req.cookies.labtoken;
    let username;
    Object.keys(users).forEach( (name) => {
        if (users[name].token === token) {
            username = name;
        }
    });
    if (!validate(token, username)) {
        res.status(401).redirect('/login');
        return;
    }
    res.render('userProfile.ejs', {username});
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if(!(username in users)) {
        users[username] = {username: username, password: password};
        const token = uuid();
        users[username].token = token;
        res.cookie('labtoken', token).status(200).redirect('/userprofile');
        return;
    }
    res.status(401).send("This username already exists.")
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!!users[username] && users[username].password === password) {
        const token = uuid();
        users[username].token = token;
        res.cookie('labtoken', token).status(200).redirect('/userprofile');
        return;
    }
    res.status(401).send("Password or username invalid.");
});


app.listen(port, () => console.log(`Listening on port : ${port}`));


