/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/11/26 16:00
 */

// 处理跟用户有关的所有请求
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

// 创建数据库连接池
let pool = mysql.createPool({
    // connectionlimit: 10, // default value
    user: 'root'
});

module.exports = function (app) {
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
                    res.end();
                }
                sql = 'INSERT INTO blog.user VALUE(NULL, ?, ?)';
                connection.query(sql, [username, encryptedPassword], (err, results, fields) => {
                    if (err) throw err;
                    if (results.affectedRows === 1) {
                        res.render('sign-in', {message: 'Sign up successful, sign in please.'});
                    } else {
                        res.render('sign-up', {message: 'Error.'});
                    }
                });
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
                    if (bcrypt.compareSync(password, encryptedPassword)) {
                        req.session.username = results[0].username;
                        req.session.userId = results[0].id;
                        res.render('index', {session: req.session, message: null});
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

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/'); // 从定向到 app.get('/',...);
    });
};