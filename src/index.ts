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

server.get('/', async ( req, res )=>{
    var a =  test( );
    console.log('i am / handler')
}, [ a, [ b, c ]])

function test( ) {
    return new Promise((resolve, reject) =>{
        setTimeout(( ) => {
            resolve( );
            console.log(`resolve`)
        }, 2000 )
    })
}


// var outAsyc = async ( ) => {
//     await innerAync( );
//     console.log(`outAsyc Done`)
// }

// var innerAync = async ( ) => {
//     await innerAwait( );
//     console.log(`innerAync Done`)
// }

// var innerAwait = ( ) => {
//     return new Promise(( resolve, reject ) => {
//         setTimeout(( ) => {
//             console.log(`innerAwait Done`);
//             resolve( );
//         }, 2000)
//     })
// }

// outAsyc( );

