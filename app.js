/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/11/26 9:59
 */

const express = require('express');
const path = require('path');

let app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/default.html'));
});

app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/sign-up.html'));
});

app.listen(80);