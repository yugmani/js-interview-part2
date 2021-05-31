/* **************************************** */
// JS Interview Checklist - Part 2 (Advanced)
/* **************************************** */
/* 
They may forget what you said - but they will never forget how you made them feel 
- Carl W. Buehner 
*/

/* **************************************** */
// 1. Polyfills
/* **************************************** */

// A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.

// A. Let's implement it for map
// this - array
// this[i] - current value

Array.prototype.myMap = function(cb) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(cb(this[i], i, this));
    console.log(this[i]); // Expected 1, 2, 3
  }

  return arr;
};

const arr = [1, 2, 3];
const newCB = a => a * 2;

// console.log(arr.myMap(newCB));
//Expected [2, 4, 6];

// B. bind

let name = {
  first: 'Princess',
  last: 'Gurung'
};

let display = function() {
  console.log(`She is ${this.first} ${this.last}.`);
};

Function.prototype.myBind = function(...args) {
  //this -> display
  let obj = this;
  return function() {
    obj.call(args[0]);
  };
};

// let displayMe = display.bind(obj)

let displayMe = display.myBind(name);

// displayMe(); //Expected: She is Princess Gurung.

// C. With some parameters

let displayMore = function(city, country) {
  console.log(`${this.first} ${this.last} from ${city}, ${country}`);
};

Function.prototype.yourBind = function(...args) {
  let obj = this;
  //get the args except the first one
  params = args.slice(1);
  return function(...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

let displayYou = displayMore.yourBind(name, 'KTM');
// displayYou('Nepal'); //Expected: Princess Gurung from KTM, Nepal

/* **************************************** */
//2. CLOSURES
/* **************************************** */

// Function bundled together with its lexical environment forms a closure

// what is lexical environment❓

// It is essentially the surrounding state - the local memory along with the lexical environment of its parent.

function x() {
  var a = 7;
  function y() {
    console.log(a);
  }

  return y;
}

var z = x();
// console.log(z); //Expected: [ Function: y]
// z();   // Expected: 7;

// When x is invoked, y is returned. Now, y is waiting to be executed. Kind of like a loaded gun waiting to be shot! 🔫

// So, when we finally invoke z - y is invoked. Now, y has to log a so it first tries to find 🔍 it in the local memory but it's not there. It goes to its parent function. It finds a there.

// Voila❗There you have it - this is closure.

// Even when functions are returned (in the above case y) they still remember their lexical scope (where it came from)

/* **************************************** */
// 3. Currying
/* **************************************** */

let add = function(x) {
  return function(y) {
    console.log(x + y);
  };
};

let addByTwo = add(2);
// console.log(addByTwo);  //Expected: [Function: y]
// addByTwo(3);  //Expected: 5;

/* **************************************** */
// 4. Data Hiding / Encapsulation
/* **************************************** */

//  Suppose, you want to create a counter application. Every time, you call it - the count increases by 1. But you don't want to expose the variable outside the function. How to do it?

// You guessed it - closure❗

function Counter() {
  var count = 0;
  this.incrementCount = function() {
    count++;
    console.log(count);
  };
}

// console.log(count); //Error:count is not defined;

var adder = new Counter();
// adder.incrementCount();  //1;

// Disadvantages 😅
// Overconsumption of memory or memory leaks can happen.
// For example, the closed-over-variable will not be garbage collected. As even if the outer function has run, the returned inner function still has a reference to the closed-over-variable.

// Note: Garbage collector basically removes unused variables from the memory automatically.

/* **************************************** */
// 5. 🤝Promises
/* **************************************** */

// The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

// It is in one of these three states:

// pending: initial state, neither fulfilled nor rejected
// fulfilled: operation was completed successfully
// rejected: operation failed

const promise = new Promise((resolve, reject) => {
  let value = true;

  if (value) {
    resolve('hey value is true');
  } else {
    reject('There was an error, value is false');
  }
});

promise
  .then(x => {
    console.log(x);
  })
  .catch(error => console.log(error));
