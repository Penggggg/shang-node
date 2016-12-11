"use strict";
var express_1 = require('./my_modules/express');
var app = express_1.default();
var server = app.listen({ port: 3000 });
console.log('creating server...');
server.use(function (req, res) {
    console.log("i am global a part");
});
var a = function (req, res) {
    console.log("i am inner / part A");
};
var b = function (req, res) {
    var date = new Date();
    console.log("i am inner / part A " + date.getTime());
    req.timeStart = date.getTime();
};
var c = function (req, res) {
    var date = new Date();
    var result = date.getTime() - req.timeStart;
    console.log("i am inner / part B " + date.getTime());
    console.log("total: " + result);
};
server.get('/', function (req, res) {
    console.log('i am / handler');
}, [a, [b, c]]);
