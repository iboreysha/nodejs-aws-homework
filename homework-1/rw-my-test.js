// Read-Write file my tests


// -------------------------------------------
// Test 5
// Read the all file at once
// const fs = require('fs');
// fs.readFile('csv/nodejs-hw1-ex1.csv', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
// });
// END: Test 5
// -------------------------------------------



// -------------------------------------------
// Test 6
// const fs = require('fs');
// fs.readFile('csv/nodejs-hw1-ex1.csv', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     let arr = data.toString();
//     arr = arr.split("\n");
//     console.log(arr.length);
//     console.log(arr[5]);
// });
// END: Test 6
// -------------------------------------------


// -------------------------------------------
// Test 7
// const fs = require('fs');
// let arr;
// arr = fs.readFileSync('csv/nodejs-hw1-ex1.csv', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }
// });
// arr = arr.toString();
// arr = arr.split("\n");
// console.log(arr[5]);
// END: Test 7
// -------------------------------------------


// -------------------------------------------
// Test 8
// const fs = require('fs');
// import fs from 'fs';
// let arr;
// arr = fs.readFileSync('csv/nodejs-hw1-ex1.csv', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }
// });
// arr = arr.toString();
// arr = arr.split("\n");
// console.log(arr);
// console.log(arr[5]);
// END: Test 8
// -------------------------------------------



// -------------------------------------------
// Test 9
// Read file into array line by line

// const fs = require('fs');
import fs from 'fs';

const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

let arrContent = readFileLines('csv/nodejs-hw1-ex1.csv');

console.log(arrContent);

// END: Test 9
// -------------------------------------------
