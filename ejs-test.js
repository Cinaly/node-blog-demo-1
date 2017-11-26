/*
 * https://github.com/thu/node-blog-demo
 *
 * Copyright mingfei.net@gmail.com 
 * Released under the MIT license 
 * 
 * Date: 2017/11/26 15:06
 */

console.log(require('ejs').render('Hello, <%= name%>', {name: 'EJS!'}));