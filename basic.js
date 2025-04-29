// Function to check data types
function getDataTypes() {
  const { number, string, array, object } = {
    number: 4,
    string: "4",
    array: [],
    object: { prop: "value" },
  };
  return { number, string, array, object };
}

// Function to calculate the sum using a for loop
function sumUsingForLoop(limit) {
  sum = 0;
  for (let i = 1; i <= limit; i++) {
    sum += i;
  }

  return sum;
}

// Function to calculate the sum using a while loop
function sumUsingWhileLoop(limit) {
  sum = 0;

  i = 1;

  while (i <= limit) {
    sum += i;
    i++;
  }

  return sum;
}

// Function to check if a number is positive
function isPositive(num) {
  return num>=0 ;
}

// Function to check if a number is even or odd
function isEven(num) {
  return num%2 == 0?'even':'odd' ;
}

// Function to check if a string contains a specific substring
function containsSubstring(str, substring) {
    const arr = str.split(substring).filter (e=>e!='')
  return arr.length > 0 ;
}

module.exports = {
  getDataTypes,
  sumUsingForLoop,
  sumUsingWhileLoop,
  isPositive,
  isEven,
  containsSubstring,
};
