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

# JavaScript Object 定義
javascript 的 object 是 key-value pair
因此 key 有時會被叫作 property, member, etc...
value 可以是 integer, true, false, function, etc 

**√ 定義**

```js
var object = {} // empty object
var object = {name : my_nickname} // my_nickanme is the defined variable
var object = { 'name' : "jason" , 'job' : "sutdent" }   // hv ''var object = { name :"jason", job :"student"}     // no''
var object = { 名字 : "jason" }     // console.log(object. 名字) -> jason
var object = { nick_name : "jason" }     // console.log(object.nick_name) -> jason
```

**✘ 定義**

```js
var object = { my name : "jason" } // key 如有空格要''var object = { nick-name :"jason"} // key 如有 - 要''
```

## 存取 Object 成員

利用 `.` 作分隔, 注意提取未定義的 property 會回傳 undefined value

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

## 檢查 Type

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

## 參考

- [ECMAScript Compatibility table](http://kangax.github.io/compat-table/es5/)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/)
