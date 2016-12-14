"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require("./my_modules/express");
var app = express_1.default();
var server = app.listen({ port: 3000 });
console.log('creating server...');
server.use((req, res) => {
    console.log('global fuck');
});
let a = () => {
    console.log(`inner fuck`);
};
let b = () => {
    console.log(`inner fuck`);
};
server.get('/home', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('handler fuc1k');
}), [[a, b]]);
server.get('/home/:sex/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('handler');
}));
server.get('/home/:sex', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('handler');
}));
server.get('/home/:sex/:id/:name/:asd', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('1');
}));
server.get('/users', () => __awaiter(this, void 0, void 0, function* () {
    console.log(`users`);
}));
