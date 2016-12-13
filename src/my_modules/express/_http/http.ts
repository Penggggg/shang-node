import * as http from 'http';
import { setReqPath, setReqParams, setReqParamsQuery } from './_req/index';
import { IHttp, IPath } from '../interface/_http.interface';



export class _Http implements IHttp {

    /**
     * 外层全路由中间件 每个item结构 
     * [  middleware-1, middleware-2, ... ]
     */
    private outterMiddlewares: Array<Function> = [ ];

    /**
     * 单个路由中间件，由这个对象储存所有路由对应的中间件，
     * 一级以req.path的值为键值，而不是req.url
     * 二级为req.params个数
     * 三级以GET,PUT,DELETE,POST为键值，值为中间件数组
     * [ [ middleware-1-a, middleware-1-b ], [ middleware-2-a, middleware-2-b ], ... ]
     */
    private innerMiddlewares = { }

    /**
     * 内部中间件，用来改写req, res对象
     */
    private spcialMiddlewares: Array<Function> = [ setReqParams ];


    constructor( ) { }


    /**
     * createServer( port, domain )创建一个Http Server
     */
    createServer( port: number, domain: string ) {
        try {
            let server = http.createServer(( req, res ) => {
               // step 0: 跑一遍内部中间件
               this.spcialMiddlewares.forEach(( middlewareItem, index ) => {
                    try {
                        middlewareItem( req, res );
                    } catch ( e ) {
                        console.log(`http spcialMiddlewares middlewares Error: middleware - ${index}: ${e}`)
                    }
                })  
                
                // if ( typeof this.innerMiddlewares[ req.url ] !== 'undefined ') {              
                //     // step 1: 跑一遍全局中间件
                //     this.outterMiddlewares.forEach(( middlewareItem, index ) => {
                //         try {
                //             middlewareItem( req, res )
                //         } catch ( e ) {
                //             console.log(`http global middlewares Error: middleware - ${index}: ${e}`)
                //         }
                //     })
                //     // step 2: 跑一遍当前path的中间件的 a part 
                //     this.innerMiddlewares[ req.url ][ req.method ].forEach(( middlewareItem, index ) => {
                //         try {
                //             middlewareItem[ 0 ]( req, res )
                //         } catch ( e ) {
                //             console.log(`http inner middlewares part A Error: middleware - ${index}: ${e}`)
                //         }
                //     })
                //     let innerAsync = async ( ) => {
                //         // step 3: 跑一遍当前path的handler
                //         try { 
                //             await this.innerMiddlewares[ req.url ].handler( req, res );
                //         } catch ( e ) { console.log(`http handler Error! ${e}`) }
                //     }
                //     let outterAsync = async ( ) => {
                //         await innerAsync( );
                //         // step 4: 跑一遍当前path的中间件的 b part
                //         this.innerMiddlewares[ req.url ][ req.method ].forEach(( middlewareItem, index ) => {
                //                 try {
                //                     if ( middlewareItem[ 1 ] !== null ) {middlewareItem[ 1 ]( req, res );}
                //                 } catch ( e ) {
                //                     console.log(`http inner middlewares part A Error: middleware - ${index}: ${e}`)
                //                 }
                //         }) 
                //     }
                //     outterAsync( );
                // } else {
                //     console.log ( `无该路由handler` )
                // }

            })
            server.listen( port, domain );
            return server;
        } catch ( e ) {
            console.log(`http.createServer Error ${e}`);
        }
    }



    /**
     * use( mdidleware )：中间件注入到全路由中
     */
    use( ...middleware ) {
        // 预处理：参数检查
        let argTypeError = false;
        if ( middleware.length === 0 ) { return; }
        middleware.some(( func ) => {
            if ( typeof func !== 'function') { 
                console.log(`http.use Errror: argument Type must be a function`);
                argTypeError = true;
                return true }
        })
        if ( argTypeError ) { return; }

        // 正式处理：把中间件插入到全路由中
        middleware.forEach(( func ) => {
            this.outterMiddlewares.push( func );
        })

    }



    /**
     * post 方法
     */
    post( ) { }



    /**
     * get( path, handler, [ a, b, c ])  req.url:GET 中间件
     */
    get( path: string, handler, middlewares?: Array< Function | Array<Function>> ) {
        let paramsLength: number = 0;
        let reqPath: string = '';
        let params: Array< string > = [ ];
        // 参数检查
        if ( this.checkArgError( path, handler, middlewares )) { console.log(`http.get argument type error`); return }

        // 参数param提炼
        if ( /\:/g.test( path )){ 
            let _ = this.getParams( path );
            paramsLength = _.paramsLength; reqPath = _.reqPath; params = _.params;
        }
        
        // 把middewares和handler注入到path-GET-paramsLength
        // 防止原对象覆盖
        this.innerMiddlewares[ reqPath ] = this.innerMiddlewares[ reqPath ] || {  };
        if ( typeof this.innerMiddlewares[ reqPath ][ paramsLength ] !== 'undefined' ) { console.log(`路由设置params存在参数数量相等的情况，即将覆盖: ${reqPath} ${params}`) }
        let _current: IPath = this.innerMiddlewares[ reqPath ][ paramsLength ] = {
            handler: null,  GET: [], Params: []
         };
         // handler
        _current.handler = handler;
        _current.Params = params;
        // middleware
        if ( typeof middlewares !== 'undefined' ) {
            middlewares.forEach(( middlewareItem ) => {
                let item: Array<Function> = [];
                item[ 0 ] = typeof middlewareItem === 'function' ? middlewareItem : middlewareItem[0];
                item[ 1 ] = typeof middlewareItem !== 'function' ? middlewareItem[1] : null;
                _current.GET.push( item );
            })
        }
    }



    /**
     * delete 方法
     */
    delete( ) { }



    /**
     * put 方法 
     */
    put( ) { }


    /**
     * 参数检查
     */
    private checkArgError( path: string, handler, middlewares?: Array< Function | Array<Function>> ): boolean {
        // 参数检查
        if ( typeof path !== 'string' || typeof handler !== 'function' ){ console.log(`http.get Error: argument type error`); return true; }
        if ( typeof middlewares !== 'undefined' ) {
           return middlewares.some(( middlewareItem ) => {
                if ( !( typeof middlewareItem === 'function' || ( middlewareItem instanceof Array ))){ return true;}
                if ( middlewareItem instanceof Array ) { 
                    if ( middlewareItem.length > 2 ) { return true; }
                    return middlewareItem.some(( innerFuc ) => {
                        if ( typeof innerFuc !== 'function' ) { return true;}
                    }
                )}
            })
        } else {
            return false ;
        }

    }

    /**
     * req params提取
     */
    private getParams( path: string ): { paramsLength: number, params: Array< string >, reqPath: string } {
        let reqPath = path.split(':')[0].slice( 0, -1 );
        let rowParams = path.split(':').splice( 1 );
        let paramsLength = rowParams.length;
        let params = [ ];
        try { 
            params = rowParams.map(( param ) => {
                return param.replace( /\//g, '');
            })
        } catch ( e ) { console.log(`http.getParams error!: ${e}`)}
        return {
            paramsLength,
            params,
            reqPath
        };
    }

} 