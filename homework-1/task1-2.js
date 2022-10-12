// TASK 1.2


// -------------------------------------------
// Test 1
// Convert via command line

// csvtojson csv/nodejs-hw1-ex1.csv > json/nodejs-hw1-ex2.json

// END: Test 1
// -------------------------------------------



// -------------------------------------------
// Test 3

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

// Test 3
// -------------------------------------------
