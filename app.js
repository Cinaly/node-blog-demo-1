/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/12/3 9:56
 */

const express = require('express');

let app = express();

app.get('/', (req, res) => {
   console.log('get /...');
});

app.listen(80);