var express = require('express');
var router = require('./router/router');
var bodypaser = require('body-parser');
var path = require('path');

var app = express();
app.listen(3000, ()=>{console.log('http://127.0.0.1:3000')});

app.use(bodypaser.urlencoded({extended:false}));
app.use(bodypaser.json());
app.use('/static/', express.static(path.join(__dirname, 'static')));
app.use(router); // 路由