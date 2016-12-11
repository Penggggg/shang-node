

export interface IApp {
    /**
     * 返回一个http/https/net/dgram服务器
     */
    listen( arg: IArguments.listen ): void
    /**
     * 使用一个全局中间件
     */
    use( any ): void
    /**
     * 使用一个全局配置
     */
    set( any ): void
    /**
     * 获取一个全局配置的信息
     */
    get( any ): void
    /**
     * 禁用某个全局配置
     */
    disable( any ): void
    /**
     * 开启某个全局配置
     */
    enable( any ): void
}

export namespace IArguments {

    export interface listen {
        port: number,
        domain?: string,
        type?: 'http' | 'https' | 'net' | 'dgram'
    }
    
}

