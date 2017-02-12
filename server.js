const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-type, Accept');
    next();
});

app.use('/api', api);

const port = process.env.port || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () =>console.log(`Api is running on localhost:${port}`));