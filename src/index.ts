import express from './my_modules/express';

var app =  express( );

var server = app.listen({ port: 3000 })
console.log('creating server...');


server.use(( req, res ) => {
    console.log(`i am global a part`);
})

var a = ( req, res ) => {
    console.log(`i am inner / part A`)
}

var b = ( req, res ) => {
    let date = new Date();
    console.log(`i am inner / part A ${date.getTime()}`)
    req.timeStart = date.getTime( );
}

var c = ( req, res ) => {
    let date = new Date();
    let result = date.getTime() - req.timeStart;
    console.log(`i am inner / part B ${date.getTime()}`)
    console.log(`total: ${result}`)
}

server.get('/',( req, res )=>{
    console.log('i am / handler')
}, [ a, [ b, c ]])
