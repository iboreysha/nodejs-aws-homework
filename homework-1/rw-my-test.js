//
// My test file for Read-Write testing
//


// -------------------------------------------
// Test 10
// CSV file is loaded line by line to Array

// const fs = require('fs');
import fs from 'fs';
//const readline = require('readline');
import readline from 'readline';
//const stream = require('stream');
import stream from 'stream';

const instream = fs.createReadStream('csv/nodejs-hw1-ex1.csv');
const outstream = new stream;
const rl = readline.createInterface(instream, outstream);

let arr = [];

rl.on('line', function(line) {
  // process line here
  arr.push(line);
  console.log("Line from CSV: ", line)
});

rl.on('close', function() {
  // do something on finish here
  console.log("Saved to Array: ", arr);

  let json = JSON.stringify(arr);
  console.log("Test JSON: ", json);
});

// END: Test 10
// -------------------------------------------
