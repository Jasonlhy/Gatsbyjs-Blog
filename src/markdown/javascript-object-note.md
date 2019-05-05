---
path: '/blog/JavaScript Object 筆記'
title: JavaScript Object 筆記
date: 2016-01-27 07:20:42
update: 2019-05-05
description: 記錄一些 javascript object 用法和注意地方
categories: Programming
tags: 
- JavaScript
---

## JavaScript Object

JavaScript 的 object 是 key-value pair。 `Key` 有時會被稱為 property, member, 而`Value` 可以是 integer, true, false, function 等等。最簡單構 Object 的方法是用 object literal, 但 Object 之間獨立。如要定義一堆有關聯的 Object ，請利用 [Prototype](#prototype)



**√ Object literal**

```js
var object = {} // empty object
var object = {name : my_nickname} // my_nickanme is the defined variable
var object = { 'name' : "jason" , 'job' : "sutdent" }   // hv ''var object = { name :"jason", job :"student"}     // no''
var object = { 名字 : "jason" }     // console.log(object. 名字) -> jason
var object = { nick_name : "jason" }     // console.log(object.nick_name) -> jason
```

**✘ Object literal**

```js
var object = { my name : "jason" } // key 如有空格要''var object = { nick-name :"jason"} // key 如有 - 要''
```


## 存取 Object Property 

利用 `.` 作分隔可以存取 object property, 提取未定義的 property 會回傳 undefined value

```js
var object = { name : "jason" };
object.name // jason
object.age // undefined
```

因此可以利用 undefined value 檢查某 object 成員有沒有被定義
```js
object.name === undefined // false
object.age === undefined // true
```

也可以利用 `[]` (Object literal), 適用於有 - 的 key
```js
var object = { "my-name": "jason", "image-list" : "image.png" };
object.image-list; // reference error: list
object.my-name; // NaN
object["my-name"]; // jason
```

Object 可以隋意新加成員
```js
var object = { name : "jason" };
object.nickname = "tresa";
object.nickname; // "tresa"
```

## 檢查 Object Type

使用 `typeof` 檢查時, Javascript 的 Object 都是 "object"

```js
var object = { name : "jason" };
typeof object; // "object"
```

## 檢查 Value

可以利用 typeof 去避免 ReferenceError: Can't find variable: list
注意: 所有 variable 即使定義了, 沒有 acess 前 value 都是 undefined

```js
var x;
typeof x; // "undefined"
typeof list // "undefined" (list is not "defined yet")
```

另外方法檢查 undefined

From [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
> The global undefined property represents the primitive value undefined. It is one of JavaScript's primitive types.

由於 undefined 的 type 是'undefined', 因於檢查某成員有沒有被定義也可以用 typeof
```js
var object = { name : "jason" };
typeof object.age === 'undefined' // true
```

## 檢查 Empty Object

利用 `for ... in ...` 檢定有沒有 property name, 有則 return true
```js
var emptyObject = {};
var student = { name : "jason", job : "student" };

function isEmptyObject(testObject){
  var property;
  for (property in testObject){
    return true;
  }
  
  return false;
}

isEmptyObject(emptyObject); // false
isEmptyObject(student); // true
```

## Array

### 檢查 Array

不過 Array 的 type 也是'object', 但可以利用 Array.isArray() 檢查 (ECMAScript >= 5)

```js
var array = ["jason", "object"]
typeof array; // "object" 
Array.isArray(array) // true

```
### 存取 Element

傳統方法, 利用 `length`

```js
for (var i = 0 ; i < array.length; i++ ){
  console.log(array[i]);
}
```

利用 `forEach` (ECMAScript >= 5)
接受 callback(element, index, processingArray)

```js
array.forEach(function(element, index, processingArray){
  console.log(element);
});
```

利用 `for ...of...` (ECMAScript >= 6)

```js
for (var e of array){
  console.log(e);
}
```

## Prototype

需要利用 prototype，Object 之間便可以分享 property。

>JavaScript 是個沒有實做 class 關鍵字的動態語言，所以會對那些基於類別（class-based）語言（如 Java 或 C++）背景出身的開發者來說會有點困惑。（在 ES2015 有提供 class 關鍵字，但那只是個語法糖，JavaScript 仍然是基於原型（prototype-based）的語言）。
>
>講到繼承，JavaScript 就只有一個建構子：物件。每個物件都有一個連著其他原型（prototype）的私有屬性（private property）物件。原型物件也有著自己的原型，於是原型物件就這樣鏈結，直到撞見 null 為止：null 在定義裡沒有原型、也是原型鏈（prototype chain）的最後一個鏈結。
>
>幾乎所有 JavaScript 的物件，都是在原型鏈最頂端的 Object 實例。

### 定義 Prototype

以下例子定義 Student 的 prototype, 它有三個 property: 分別為 `hello`，`school` 和 `studyAt`

程式會利用這個 prototype 建構不同 Student：Jason 和 Wayne。每個 Student 建構時，他們都會分享同一個 prototype。

```JavaScript
function Student() {}
Student.prototype = new Object();
Student.prototype.school = "Awesome school";
Student.prototype.hello = function(){
  console.log("Hello, I am " + this.name);
}
Student.prototype.studyAt = function(){
  console.log("Hello, I study at " + this.school);
}
```

### Prototype Chain

當 Object 沒有相關的 property, 會向上問 prototype

1. `jason.hello()` 會找 `Student.prototype.hello`
2. `this.name` 會找當前 object 的 name
3. `this.school` 會找當前 object 的 school, 之後再找 `Student.prototype.school`

```Javascript
var jason = new Student()
jason.name = "jason"
jason.hello() // => Hello, I am jason
jason.school // => Awesome school
jason.studyAt() // => Hello, I study at Awesome school

var wayne = new Student()
wayne.name = "wayne"
wayne.hello() // => Hello, I am wayne
wayne.school // => Awesome school
wayne.studyAt() // => Hello, I study at Awesome school
```

新 Object 都會分享同一個 Prototype
```javascript
jason.__proto__ === wayne.__proto__ // => true
```

當你改變了當前 object 的 school 會有不同結果

1. `jason.school` 會找自己的 school
2. `wayne.school` 會找 prototype 的 school

```JavaScript
var jason = new Student();
jason.school = "Jason School";
jason.studyAt() // => Hello, I study at Jason School

var wayne = new Student();
wayne.studyAt() // => Hello, I study at Awesome school
```

但當你改變了 Prototype, 會影響關連的 Object

```JavaScript
Student.prototype.hello = function() { console.log("omg"); }
jason.hello() // => omg
wayne.hello() // => omg
```


### ES6 Class 寫法

以上 prototype 和 function, 在 ES6 可以用 class 表達

```JavaScript
class Student {
  constructor(name) {
    this.school = "Awesome school"
    this.name = name
  }
  
  hello(){
    console.log("Hello, I am " + this.name);
  }

  studyAt(){
    console.log("Hello, I study at " + this.school);
  }
}
```


## 參考

- [ECMAScript Compatibility table](http://kangax.github.io/compat-table/es5/)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/)
