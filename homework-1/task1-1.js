//
// TASK 1.1
//


// -------------------------------------------
// Test 1

// Function to reverse string
// function ReverseString(str) {
//   return str.split('').reverse().join('')
// }

// Enter any texts (User input)
// process.stdin.on('data', data => {
//   let inputText= data.toString();
//   console.log(`Reversed text: ${ReverseString(inputText)}`);
// });

// END: Test 1
// -------------------------------------------



// -------------------------------------------
// Test 2

//Function to reverse string
function ReverseString(str) {
  return str.split('').reverse().join('')
}

process.stdin.on('readable', () => {
  let inputText;
  // Use a loop to make sure we read all available data.
  while ((inputText = process.stdin.read()) !== null) {
    process.stdout.write(`Reversed text: ${ReverseString(inputText.toString())}`);
  }
  console.log("\n");
});

// END: Test 2
// -------------------------------------------
