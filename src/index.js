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
server.get('/home/cat/:sex/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('res: /');
}));
server.get('/home/cat/:sex', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('res: /');
}));
// server.use(( req, res ) => {
//     console.log(`i am global a part`);
// })
// server.get('/', async ( req, res )=>{
//     var a =  await test( );
//     console.log('i am / handler');
//     res.end( );
// }, [ a, [ b, c ]])
// server.get('/home/cat/:sex/:id', async ( req, res ) => {
//     console.log( 'res: /' )
// })
// server.get('/home/cat/:sex', async ( req, res ) => {
//     console.log( 'res: /' )
// })
