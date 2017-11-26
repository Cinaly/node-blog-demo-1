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
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');

let app = express();

// 配置中间件
app.use(bodyParser.urlencoded({extended: true}));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// 创建数据库连接池
let pool = mysql.createPool({
    // connectionlimit: 10, // default value
    user: 'root'
});

// 根目录路由
app.get('/test', (req, res) => {
    res.render('test', {name: 'test...'});
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/default.html'));
});

// 注册页链接路由
app.get('/sign-up', (req, res) => {
    res.render('sign-up', {message: null});
});

// 登录页链接路由
app.get('/sign-in', (req, res) => {
    res.render('sign-in', {message: null});
});

// 注册请求的路由
app.post('/signUp', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10); // 随机盐
    let encryptedPassword = bcrypt.hashSync(password, salt);
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = 'SELECT * FROM blog.user WHERE username = ?';
        connection.query(sql, [username], (err, results, fields) => {
            if (results.length === 1) {
                res.render('sign-up', {message: 'Username already exist.'});
            } else {
                sql = 'INSERT INTO blog.user VALUE(NULL, ?, ?)';
                connection.query(sql, [username, encryptedPassword], (err, results, fields) => {
                    if (err) throw err;
                    if (results.affectedRows === 1) {
                        res.render('sign-in', {message: 'Sign up successful, sign in please.'});
                    } else {
                        res.render('sign-up', {message: 'Error.'});
                    }
                });
            }
        });
        connection.release();
    });
});

// 登录请求的路由
app.post('/signIn', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = 'SELECT * FROM blog.user WHERE username = ?';
        connection.query(sql, [username, password], (err, results, fields) => {
            if (err) throw err;
            if (results.length === 1) {
                let encryptedPassword = results[0].password;
                console.log(encryptedPassword);
                if (bcrypt.compareSync(password, encryptedPassword)) {
                    res.sendFile(path.join(__dirname, '/views/index.html'));
                } else {
                    res.render('sign-in', {message: 'Invalid username or password.'})
                }
            } else {
                    res.render('sign-in', {message: 'Invalid username or password.'})
            }
        });
        connection.release();
    });
});

// 端口
app.listen(80);