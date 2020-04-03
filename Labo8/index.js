const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const port = process.env.PORT || 8080;
const app = express();

const users = [];


app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');

app.use(bodyParser());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.render('login.ejs'));

const validate = (token, username) => {
    return !!token &&
        users[username].token === token;
}
app.get('/profile', (req, res) => {
    const token = req.cookies.labtoken;
    if (!token || validate(token)) {
        res.status(401).redirect('/login')
        return;
    }
    res.render('userProfile.ejs', {username: user.username})
})

app.post('/users', (req, res) => {
    const {username, password} = req.body;
    const token = uuid();
    users[req.body.username] = {password: req.body.password};
    res.sendStatus(204);
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!!users[username] && users[username].password === password) {
        const token = uuid();
        users[username].token = token;
        res.cookie('labtoken', token).send('Login successful')
        return;
    }
    res.status(401).send("Password or username invalid");
})


app.listen(port, () => console.log(`Listening on port : ${port}`))


