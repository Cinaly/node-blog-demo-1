/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/11/26 17:16
 */

const mysql = require('mysql');

let pool = mysql.createPool({
    user: 'root',
    dateStrings: 'date'
});

module.exports = function (app) {
    app.post('/article/create', (req, res) => {
        let title = req.body.title;
        let content = req.body.content;
        let photo = null;
        let userId = req.session.userId;

        let sql = 'INSERT INTO blog.article(title, content, photo, userId) VALUE(?, ?, ?, ?)';
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, [title, content, photo, userId], (err, results, fields) => {
                if (err) throw err;
                if (results.affectedRows === 1) {
                    // res.render('index', {session: req.session, message: 'Published.'});
                    res.redirect('/article/list');
                } else {
                    res.render('index', {session: req.session, message: 'Error.'})
                }
            });
            connection.release();
        });
    });

    app.get('/article/list', (req, res) => {
        let userId = req.session.userId;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            let sql = 'SELECT * FROM blog.article WHERE userId = ?';
            connection.query(sql, [userId], (err, results, fields) => {
                if (err) throw err;
                res.render('index', {session: req.session, articles: results, message: 'published.'});
            })
        });
    });
};