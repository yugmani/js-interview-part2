// JS Interview Checklist - Part 2 (Advanced)

// 1. Polyfills
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
displayYou('Nepal'); //Expected: Princess Gurung from KTM, Nepal


