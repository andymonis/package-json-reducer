#!/usr/bin/env node

/*
 * # package-json-reducer
 * Removes entries from package.json for safer externalisation.
 * @author andymonis
 * 2017
 */

var fs = require('fs');

console.log( process.cwd() );

let inputPackageJson = undefined;
let stripParams = undefined;
let outputPackageJson = undefined;

// determine the INPUT package.json ( the last argument )
inputPackageJson = process.argv[ process.argv.length - 1 ];

// determine the OUTPUT package.json ( the argument after -o )
let oIndex = process.argv.indexOf( "-o" );
outputPackageJson = oIndex > -1 ? process.argv[ oIndex + 1 ] : undefined;

// determine the STRIP properties ( the argument after -s )
let sIndex = process.argv.indexOf( "-s" );
console.log( `sIndex=${sIndex}` );
stripParams = sIndex > -1 ? process.argv[ sIndex + 1 ] : undefined;
console.log( `stripParams=${stripParams}` );

if( !inputPackageJson || !stripParams || !outputPackageJson ){
    console.log( `Param error check inputs` );
    console.log( `input ${inputPackageJson}, strip ${stripParams}, output ${outputPackageJson}` );
    exit -1;
}

// Read the input and parse 
console.log( `loading ${inputPackageJson}` );
let fInput = fs.readFileSync( inputPackageJson );
let jsonInput = JSON.parse( fInput );

// Iterate over strip params and remove from top level.
// Note: need to strip '' from around the params
let _params = stripParams.split( " " );
for( let i=0; i<_params.length; i++ ){
    // delete jspm.dev
    if( _params[ i ].indexOf( "." ) > -1 ){
        let keys = _params[ i ].split( "." );

        if( jsonInput[ keys[ 0 ] ] && jsonInput[ keys[ 0 ] ][ keys[ 1 ] ] )
        delete jsonInput[ keys[ 0 ] ][ keys[ 1 ] ];
    } else {
        if( jsonInput[ _params[ i ] ] ){
            console.log( `removing [${_params[ i ]}]` );
            delete jsonInput[ _params[ i ] ];
        }
    }
}

// Write the output to the output file
fs.writeFileSync( outputPackageJson, JSON.stringify( jsonInput, null, 4 ) );
console.log( `saved to [${outputPackageJson}]` );


