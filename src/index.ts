import express from './my_modules/express';

var app =  express( );

var server = app.listen({ port: 3000 })
console.log('creating server...');



server.get('/home/cat/:sex/:id', async ( req, res ) => {
    console.log( 'res: /' )
})

server.get('/home/cat/:sex', async ( req, res ) => {
    console.log( 'res: /' )
})



// server.use(( req, res ) => {
//     console.log(`i am global a part`);
// })

// server.get('/', async ( req, res )=>{
//     var a =  await test( );
//     console.log('i am / handler');
//     res.end( );
// }, [ a, [ b, c ]])


// server.get('/home/cat/:sex/:id', async ( req, res ) => {
//     console.log( 'res: /' )
// })

// server.get('/home/cat/:sex', async ( req, res ) => {
//     console.log( 'res: /' )
// })




