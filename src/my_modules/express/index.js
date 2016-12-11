"use strict";
const http_1 = require("./_http/http");
let express;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = express = () => {
    return new App();
};
class App {
    constructor() { }
    /**
     * 返回一个http/https/net/dgram服务器
     */
    listen({ port, domain = '127.0.0.1', type = 'http' }) {
        switch (type) {
            // 返回一个_Http实例
            case 'http': {
                let _http = new http_1._Http();
                _http.createServer(port, domain);
                return _http;
            }
            default: {
                console.log(`app.listen argument 'type' Error`);
                break;
            }
        }
    }
    /**
    * 使用一个全局中间件
    */
    use() { }
    /**
     * 使用一个全局配置
    */
    set() { }
    /**
     * 获取一个全局配置的信息
    */
    get() { }
    /**
     * 禁用某个全局配置
    */
    disable() { }
    /**
     * 开启某个全局配置
     */
    enable() { }
}
