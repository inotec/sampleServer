//  function addNumbers
//       -- takes three arguments
//          -- numberOne (a number)
//          -- numberTwo (a number)
//          -- callback (a function that will be provided two arguments -- an errror if one occured, and the total);
//
//  example usage:
//  addNumbers(1,2, function (err, total) {
//    console.log(total);  
// })
//                 
function addNumbers (numberOne, numberTwo, callback) {
  // if the numbers are not numbers
  if ((typeof numberOne !== 'number') || (typeof numberTwo !== 'number')) {
    callback(new Error('both numbers must be numbers'));
  } else {
    var total = numberOne + numberTwo;
    callback(null, total);
  }
};

// examples of calling it
addNumbers("one", 2, function (err, result) {
  if (err) {
    console.log('there was an error!');
    console.log(err);
  } else {
    console.log('the total was: ' + result);
  }
});

addNumbers(1, 2, function (err, result) {
  if (err) {
    console.log('there was an error!');
    console.log(err);
  } else {
    console.log('the total was: ' + result);
  }
});