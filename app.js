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

let app = express();

// 配置中间件
app.use(bodyParser.urlencoded({extended: true}));

// 创建数据库连接池
let pool = mysql.createPool({
    // connectionlimit: 10, // default value
    user: 'root'
});

// 根目录路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/default.html'));
});

// 注册页链接路由
app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/sign-up.html'));
});

// 登录页链接路由
app.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/sign-in.html'));
});

// 注册请求的路由
app.post('/signUp', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = 'INSERT INTO blog.user VALUE(NULL, ?, ?)';
        connection.query(sql, [username, password], (err, results, fields) => {
            if (err) throw err;
            if (results.affectedRows === 1) {
                res.sendFile(path.join(__dirname, '/views/sign-in.html'));
            } else {
                res.sendFile(path.join(__dirname, '/views/sign-up.html'));
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
        let sql = 'SELECT * FROM blog.user WHERE username = ? AND password = ?';
        connection.query(sql, [username, password], (err, results, fields) => {
            if (err) throw err;
            if (results.length === 1) {
                res.sendFile(path.join(__dirname, '/views/index.html'));
            } else {
                res.sendFile(path.join(__dirname, '/views/sign-in.html'));
            }
        });
        connection.release();
    });
});

// 端口
app.listen(80);