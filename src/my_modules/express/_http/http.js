"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const http = require("http");
class _Http {
    constructor() {
        /**
         * 外层全路由中间件 每个item结构
         * [  middleware-1, middleware-2, ... ]
         */
        this.outterMiddlewares = [];
        /**
         * 单个路由中间件，由这个对象储存所有路由对应的中间件，一级以req.url的值为键值，二级以GET,PUT,DELETE,POST为键值，值为中间件数组
         * [ [ middleware-1-a, middleware-1-b ], [ middleware-2-a, middleware-2-b ], ... ]
         */
        this.innerMiddlewares = {};
        /**
         * 内部中间件，用来改写req, res对象
         */
        this.spcialMiddlewares = [];
    }
    /**
     * createServer( port, domain )创建一个Http Server
     */
    createServer(port, domain) {
        try {
            let server = http.createServer((req, res) => {
                res.write('123');
                res.end();
                // step 1: 跑一遍全局中间件
                this.outterMiddlewares.forEach((middlewareItem, index) => {
                    try {
                        middlewareItem(req, res);
                    }
                    catch (e) {
                        console.log(`http global middlewares Error: middleware - ${index}: ${e}`);
                    }
                });
                // step 2: 跑一遍当前path的中间件的 a part 
                this.innerMiddlewares[req.url][req.method].forEach((middlewareItem, index) => {
                    try {
                        middlewareItem[0](req, res);
                    }
                    catch (e) {
                        console.log(`http inner middlewares part A Error: middleware - ${index}: ${e}`);
                    }
                });
                let innerAsync = () => __awaiter(this, void 0, void 0, function* () {
                    // step 3: 跑一遍当前path的handler
                    try {
                        yield this.innerMiddlewares[req.url].handler(req, res);
                    }
                    catch (e) {
                        console.log(`http handler Error!`);
                    }
                });
                let outterAsync = () => __awaiter(this, void 0, void 0, function* () {
                    yield innerAsync();
                    // step 4: 跑一遍当前path的中间件的 b part
                    this.innerMiddlewares[req.url][req.method].forEach((middlewareItem, index) => {
                        try {
                            if (middlewareItem[1] !== null) {
                                middlewareItem[1](req, res);
                            }
                        }
                        catch (e) {
                            console.log(`http inner middlewares part A Error: middleware - ${index}: ${e}`);
                        }
                    });
                });
                outterAsync();
            });
            server.listen(port, domain);
            return server;
        }
        catch (e) {
            console.log(`http.createServer Error ${e}`);
        }
    }
    /**
     * use( mdidleware )：中间件注入到全路由中
     */
    use(...middleware) {
        // 预处理：参数检查
        let argTypeError = false;
        if (middleware.length === 0) {
            return;
        }
        middleware.some((func) => {
            if (typeof func !== 'function') {
                console.log(`http.use Errror: argument Type must be a function`);
                argTypeError = true;
                return true;
            }
        });
        if (argTypeError) {
            return;
        }
        // 正式处理：把中间件插入到全路由中
        middleware.forEach((func) => {
            this.outterMiddlewares.push(func);
        });
    }
    /**
     * post 方法
     */
    post() { }
    /**
     * get( path, handler, [ a, b, c ])  req.url:GET 中间件
     */
    get(path, handler, middlewares) {
        // 参数检查
        if (this.checkArgError(path, handler, middlewares)) {
            console.log(`http.get argument type error`);
            return;
        }
        // 把middewares和handler注入到path-GET
        let _current = this.innerMiddlewares[path] = {
            handler: null, GET: []
        };
        _current.handler = handler;
        middlewares.forEach((middlewareItem) => {
            let item = [];
            item[0] = typeof middlewareItem === 'function' ? middlewareItem : middlewareItem[0];
            item[1] = typeof middlewareItem !== 'function' ? middlewareItem[1] : null;
            _current.GET.push(item);
        });
    }
    /**
     * delete 方法
     */
    delete() { }
    /**
     * put 方法
     */
    put() { }
    /**
     * 参数检查
     */
    checkArgError(path, handler, middlewares) {
        // 参数检查
        if (typeof path !== 'string' || typeof handler !== 'function') {
            console.log(`http.get Error: argument type error`);
            return true;
        }
        return middlewares.some((middlewareItem) => {
            if (!(typeof middlewareItem === 'function' || (middlewareItem instanceof Array))) {
                return true;
            }
            if (middlewareItem instanceof Array) {
                if (middlewareItem.length > 2) {
                    return true;
                }
                return middlewareItem.some((innerFuc) => {
                    if (typeof innerFuc !== 'function') {
                        return true;
                    }
                });
            }
        });
    }
}
exports._Http = _Http;
