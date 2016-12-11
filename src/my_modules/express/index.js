"use strict";
var http_1 = require('./_http/http');
var express;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = express = function () {
    return new App();
};
var App = (function () {
    function App() {
    }
    /**
     * 返回一个http/https/net/dgram服务器
     */
    App.prototype.listen = function (_a) {
        var port = _a.port, _b = _a.domain, domain = _b === void 0 ? '127.0.0.1' : _b, _c = _a.type, type = _c === void 0 ? 'http' : _c;
        switch (type) {
            // 返回一个_Http实例
            case 'http': {
                var _http = new http_1._Http();
                _http.createServer(port, domain);
                return _http;
            }
            default: {
                console.log("app.listen argument 'type' Error");
                break;
            }
        }
    };
    /**
    * 使用一个全局中间件
    */
    App.prototype.use = function () { };
    /**
     * 使用一个全局配置
    */
    App.prototype.set = function () { };
    /**
     * 获取一个全局配置的信息
    */
    App.prototype.get = function () { };
    /**
     * 禁用某个全局配置
    */
    App.prototype.disable = function () { };
    /**
     * 开启某个全局配置
     */
    App.prototype.enable = function () { };
    return App;
}());
