//
// TASK 1.2
//


// -------------------------------------------
// Test 1
// Use command line to convert CSV to JSON

// csvtojson csv/nodejs-hw1-ex1.csv > json/nodejs-hw1-ex2.json

// END: Test 1
// -------------------------------------------



// -------------------------------------------
// Test 3
// CSV file is loaded fully into the RAM

// const fs = require('fs');
import fs from 'fs';
// const csvtojson =require('csvtojson');
import csvtojson from 'csvtojson';

const csvfilepath = "csv/nodejs-hw1-ex1.csv"

csvtojson()
.fromFile(csvfilepath)
.then((jsonBooksdata) => {
  console.log(jsonBooksdata)

  fs.writeFile("json/nodejs-hw1-ex2-test3.json",JSON.stringify(jsonBooksdata, null, 2),"utf-8",(err) => {
    if(err) {
      console.log(err)
    }
    console.log("jsonBooksdata array is saved to file nodejs-hw1-ex2-test3.json ");
  })

}).catch((err) => {
    console.log(err);
});

// END: Test 3
// -------------------------------------------



// -------------------------------------------
// Test 4
// The file is not loaded fully in the RAM

// // const fs = require('fs');
// import fs from 'fs';
// //const readline = require('readline');
// import readline from 'readline';
// //const stream = require('stream');
// import stream from 'stream';

// // Read CSV file line by line to Array
// const instream = fs.createReadStream('csv/nodejs-hw1-ex1.csv');
// const outstream = new stream;
// const rl = readline.createInterface(instream, outstream);

// let arr = [];

// rl.on('line', function(line) {
//   // process line here
//   arr.push(line);
//   console.log("Line from CSV: ", line)
// });

// rl.on('close', function() {
//   // do something on finish here
//   console.log("Saved to Array: ", arr);

//   let json = JSON.stringify(arr);
//   console.log("Test JSON: ", json);
// });

// // Write file content line by line
// // not done

// END: Test 4
// -------------------------------------------
