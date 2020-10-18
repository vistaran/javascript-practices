const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Tell our expressjs nodeapp to accept data in x-www-form-urlencoded format and in application/json format as well
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.set('Content-type', 'text/plain');
    res.status(201).send('<h1>Hello World!</h1>');
})

app.get('/user', (req, res) => {
    res.send({
        name: 'Piyush',
        age: 23
    });
});

app.post('/create_user', (req, res) => {
    res.send(req.body.name);
});

app.listen(port, () => {
    // After the server starts
    console.log(`Example app listening at http://localhost:${port}`);
})