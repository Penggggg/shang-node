# shang-node
商 —— 后台node应用

### 技术架构：自己写的express、版本自动管理

*** 

### My Express 

This is a lib wrote by myself which is inspired by Express.
it has some part of an app. Like HTTP/TCP Server、DB connection、Socket、Security...

***

### HTTP/TCP Server

the running order : Global Middlewares ->  Specify Middlewares part A -> handler -> Specify Middlewares part B

> My Express —— HTTP/TCP Server

`var server = app.listen({ port: number, domain?: string, type?: 'http'|'https'|'net'|'dgram' })`

> My Express —— HTTP/TCP Server Global Middlewares

`server.use(( req, res )=> { //...  })`

> My Express —— HTTP/TCP Server Specify Middlewares

`server.get('/home', async ( req, res )=>{
    console.log('i am handler')
}, [ a, [ b, c ]])`

the handler function is supportted the async/await function

the running order : Global Middlewares -> function a -> function b -> handler -> function c

'a' is a alone middleware function, '[b, c]' is a set of middleware functions
we can monitor the request we want to by doing this :

var b = ( req, res ) => {
    let date = new Date();
    req.timeStart = date.getTime( );
}

var c = ( req, res ) => {
    let date = new Date();
    let result = date.getTime() - req.timeStart;
}

> My Express —— HTTP/TCP request params parse

server.get('/home/:sex/:id', async ( req, res ) => {
    console.log( 'handler' )
})

curl 127.0.0.1:3000/home/man/423 ---> req.path = '/home' req.params = { sex: 'man', id: '423' }

excessive parameters will be ignored
curl 127.0.0.1:3000/home/man/423/123 ---> req.path = '/home' req.params = { sex: 'man', id: '423' }

#### 