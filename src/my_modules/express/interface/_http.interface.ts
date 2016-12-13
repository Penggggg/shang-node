

export interface IHttp {

    createServer( port: number, domain: string ): void

    use( middleware: any ): void

    post( path: string, handler: any ): void

    get( path: string, handler: any ): void
    
    delete( path: string, handler: any ): void

    put( path: string, handler: any ): void

}

export interface IPath {
    GET?: Array< Array<Function>>
    POST?: Array< Array<Function>>
    DELETE?: Array< Array<Function>>
    PUT?: Array< Array<Function>>
    Params?: Array< string >
    handler: Function
}