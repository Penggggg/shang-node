import express from './my_modules/express';

var app =  express( );

var server = app.listen({ port: 3000 })
console.log('creating server...');

server.use(( req, res ) => {
    console.log('global fuck')
})

let a = ( ) => {
    console.log(`inner fuck`)
}

let b = ( ) => {
    console.log(`inner fuck`)
}

server.get('/home', async ( req, res ) => {
    console.log( 'handler fuc1k' )
}, [ [a,b] ])

server.get('/home/:sex/:id', async ( req, res ) => {
    console.log( 'handler' )
})

server.get('/home/:sex', async ( req, res ) => {
    console.log( 'handler' )
})

server.get('/home/:sex/:id/:name/:asd', async ( req, res ) => {
    console.log( '1' )
})



server.get('/users', async ( ) => {
    console.log(`users`)
})




