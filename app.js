/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/11/26 9:59
 */

// 引入模块
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');

let app = express();

// 配置中间件
app.use(bodyParser.urlencoded({extended: true}));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(session({
    secret: 'blog',
    resave: true,
    saveUninitialized: false
}));

require('./routes/default')(app);
require('./routes/user')(app);

// 端口
app.listen(80);