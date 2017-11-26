/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/11/26 16:05
 */

module.exports = function (app) {
    // 根目录路由
    app.get('/', (req, res) => {
        res.render('default', {});
    });

    // 注册页链接路由
    app.get('/sign-up', (req, res) => {
        res.render('sign-up', {message: null});
    });

    // 登录页链接路由
    app.get('/sign-in', (req, res) => {
        res.render('sign-in', {message: null});
    });
};