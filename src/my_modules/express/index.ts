import { IApp, IArguments } from './interface/app.interface';

import { _Http } from './_http/http';

let express     
export default express = ( ) => {
    return new App( );
}

class App implements IApp {

    constructor( ) { }
    /**
     * 返回一个http/https/net/dgram服务器
     */
    listen({
        port,
        domain = '127.0.0.1',
        type = 'http'
    }: IArguments.listen ) {
        switch ( type ) {
            // 返回一个_Http实例
            case 'http': {
                let _http = new _Http( );
                _http.createServer( port, domain );
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
    use( ) { }
    /**
     * 使用一个全局配置
    */
    set( ) { }
    /**
     * 获取一个全局配置的信息
    */
    get( ) { }
    /**
     * 禁用某个全局配置
    */
    disable( ) { }
    /**
     * 开启某个全局配置
     */
    enable( ) { }
}