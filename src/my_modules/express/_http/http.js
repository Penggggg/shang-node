"use strict";
var http = require('http');
var _Http = (function () {
    function _Http() {
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
    _Http.prototype.createServer = function (port, domain) {
        var _this = this;
        try {
            var server = http.createServer(function (req, res) {
                res.write('123');
                res.end();
                // step 1: 跑一遍全局中间件
                _this.outterMiddlewares.forEach(function (middlewareItem, index) {
                    try {
                        middlewareItem(req, res);
                    }
                    catch (e) {
                        console.log("http global middlewares Error: middleware - " + index + ": " + e);
                    }
                });
                // step 2: 跑一遍当前path的中间件的 a part 
                _this.innerMiddlewares[req.url][req.method].forEach(function (middlewareItem, index) {
                    try {
                        middlewareItem[0](req, res);
                    }
                    catch (e) {
                        console.log("http inner middlewares part A Error: middleware - " + index + ": " + e);
                    }
                });
                // step 3: 跑一遍当前path的handler
                try {
                    _this.innerMiddlewares[req.url].handler(req, res);
                }
                catch (e) {
                    console.log("http handler Error!");
                }
                // step 4: 跑一遍当前path的中间件的 b part
                _this.innerMiddlewares[req.url][req.method].forEach(function (middlewareItem, index) {
                    try {
                        if (middlewareItem[1] !== null) {
                            middlewareItem[1](req, res);
                        }
                    }
                    catch (e) {
                        console.log("http inner middlewares part A Error: middleware - " + index + ": " + e);
                    }
                });
            });
            server.listen(port, domain);
            return server;
        }
        catch (e) {
            console.log("http.createServer Error " + e);
        }
    };
    /**
     * use( mdidleware )：中间件注入到全路由中
     */
    _Http.prototype.use = function () {
        var _this = this;
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i - 0] = arguments[_i];
        }
        // 预处理：参数检查
        var argTypeError = false;
        if (middleware.length === 0) {
            return;
        }
        middleware.some(function (func) {
            if (typeof func !== 'function') {
                console.log("http.use Errror: argument Type must be a function");
                argTypeError = true;
                return true;
            }
        });
        if (argTypeError) {
            return;
        }
        // 正式处理：把中间件插入到全路由中
        middleware.forEach(function (func) {
            _this.outterMiddlewares.push(func);
        });
    };
    /**
     * post 方法
     */
    _Http.prototype.post = function () { };
    /**
     * get( path, handler, [ a, b, c ])  req.url:GET 中间件
     */
    _Http.prototype.get = function (path, handler, middlewares) {
        // 参数检查
        if (typeof path !== 'string' || typeof handler !== 'function') {
            console.log("http.get Error: argument type error");
            return;
        }
        var middleTypeError = middlewares.some(function (middlewareItem) {
            if (!(typeof middlewareItem === 'function' || (middlewareItem instanceof Array))) {
                return true;
            }
            if (middlewareItem instanceof Array) {
                if (middlewareItem.length > 2) {
                    return true;
                }
                return middlewareItem.some(function (innerFuc) {
                    if (typeof innerFuc !== 'function') {
                        return true;
                    }
                });
            }
        });
        if (middleTypeError) {
            console.log("http.get argument type error: middlewares");
            return;
        }
        // 把middewares和handler注入到path-GET
        var _current = this.innerMiddlewares[path] = {
            handler: null, GET: []
        };
        _current.handler = handler;
        middlewares.forEach(function (middlewareItem) {
            var item = [];
            item[0] = typeof middlewareItem === 'function' ? middlewareItem : middlewareItem[0];
            item[1] = typeof middlewareItem !== 'function' ? middlewareItem[1] : null;
            _current.GET.push(item);
        });
    };
    /**
     * delete 方法
     */
    _Http.prototype.delete = function () { };
    /**
     * put 方法
     */
    _Http.prototype.put = function () { };
    return _Http;
}());
exports._Http = _Http;
