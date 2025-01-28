var person2 = ["Jim", "Robert", 1998, 21.5]; // array
// console.log(person2[0]);

var person1 = {
  name: "Jim",
  age: 1998,
  DOB: function () {
    return 2004 - this.age;
  },
};

var mhs = [
  { id: 1, name: "John", email: "john@mail.com" },
  { id: 2, name: "Wick", email: "wick@mail.com" },
  { id: 3, name: "Rob", email: "rob@mail.com" },
];

// console.log(mhs[1].email);

for (var x in mhs) {
  // console.log(mhs[x]);
}

function Person(name, email, DOB, siblings) {
  this.name = name;
  this.email = email;
  this.DOB = DOB;
  this.siblings = siblings;
  this.age = function () {
    return 2024 - this.DOB;
  };
}

// console.log(person1.name);
// console.log(person1.age);
// console.log(person1.DOB());

var person2 = new Person("Erick", "eric@mail.com", 1997, ["Ari", "Brian"]);
var person3 = new Person("Jhon", "john@mail.com", 2002, ["Erick", "Teb"]);
// console.log(person2.email);
// console.log(person3.siblings);
// console.log(person3.siblings);

person2.name = "Richard";
// console.log(person2.name);
person2.phone = "08112345";
// console.log(person2.phone);

delete person2.DOB;

// console.log(person2.DOB);

// person2.name = prompt('Siapa nama?');
// console.log(person2.name);

for (var key in person2) {
  // console.log(key, '--', person2[key]);
}

var x = new Date();
// console.log(x.getMilliseconds());

// function Point(x, y) {
//     this.x = x;
//     this.y = y;
//     this.distance = (x2, y2) => {
//         let dx = this.x - x2;
//         let dy = this.y - y2;
//         return Math.sqrt(dx*dx + dy*dy);
//     }
// }

class Point {
  #z = 100;
  static info = "this is string";
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  set z(value) {
    //setter
    this.#z = value;
  }

  get z() {
    // getter
    return this.#z;
  }

  distance(x2, y2) {
    let dx = this.x - x2;
    let dy = this.y - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

function abc() {
  return 1 + 2;
}

var p = new Point();
// console.log(p.x); // 10
// console.log(p.y); // 2
// console.log(p.distance(5, 6)); //

// Object Oriented Programming OOP
// inheritance
// polimorphism
// encapsulation

// NaN Not a Number

var p2 = new Point(9);
// console.log(p2.x); // 9
// console.log(p2.y); // 0
// console.log(Point.info);
p2.y = 7;
// console.log(p2.y); // 7
p2.z = 75;
// console.log(p2.z);

class Triangle extends Point {
  constructor(a, t, z) {
    super(a, t);
    this.z = z;
  }
  area() {
    return (this.x * this.y) / 2;
  }
}

class Persegi extends Point {
  constructor(p, l) {
    super(p, l);
  }
  area() {
    return this.x * this.y;
  }
}

var t = new Triangle(8, 12, 6);
// console.log(t.area()); // 8*12/2
// console.log(t.distance(2 ,3));

var p = new Persegi(10, 20);
// console.log(p.area());
