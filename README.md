# shang-node
商 —— 后台node应用

### 技术架构：自己写的express、版本自动管理

***

### My Express

This is a lib wrote by myself which is inspired by  [Express](https://github.com/expressjs/express).
it has some part of an app.  
* HTTP/TCP Server
* inner parse system
* DB connection
* Socket
* Security

***

### HTTP/TCP Server

#### the core concept
Executed order: Inner Middlewares( parse request obj ) -> Global Middlewares( server.use ) ->  Specify Middlewares part A( last params of server.get/post/.. ) -> handler -> Specify Middlewares part B( last params of server.get/post/.. )

> My Express —— HTTP/TCP Server

#### usage
<pre>
var server = app.listen({ port: number, domain?: string, type?: 'http'|'https'|'net'|'dgram' })`
</pre>

> My Express —— HTTP/TCP Server Global Middlewares

#### usage
<pre>
server.use(( req, res )=> { //...  })
</pre>

> My Express —— HTTP/TCP Server Specify Middlewares

<pre>
server.get('/home', async ( req, res )=>{
    console.log('i am handler')
}, [ a, [ b, c ]])
</pre>

the handler function is supportted the **async/await** function

Executed order : Global Middlewares -> function a -> function b -> handler -> function c

'a' is a **alone middleware** function, '[b, c]' is **a set of middleware** functions
we can **monitor the api** use for an requestby doing this :

<pre>
var b = ( req, res ) => {
    let date = new Date();
    req.timeStart = date.getTime( );
}
</pre>

<pre>
var c = ( req, res ) => {
    let date = new Date();
    let result = date.getTime() - req.timeStart;
}
</pre>

> My Express —— HTTP/TCP request params parse

#### usage

<pre>
server.get('/home/:sex/:id', async ( req, res ) => {    
    console.log( 'handler' )    
})
</pre>

curl 127.0.0.1:3000/home/man/423 --->

**req.path** = '/home' **req.params** = { sex: 'man', id: '423' }

**excessive parameters will be ignored**

curl 127.0.0.1:3000/home/man/423/123 --->

**req.path** = '/home' **req.params** = { sex: 'man', id: '423' }

***
