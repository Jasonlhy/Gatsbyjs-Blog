---
path: "/blog/JavaScript-function-note"
title: JavaScript function 筆記
date: 2019-05-07
update: 2019-07-30
description: 記錄一些 JavaScript function 用法和注意地方
categories: Programming
tags:
  - JavaScript
  - React
---

## function 和 object

在 function 中存取 object 的 property，需要用 `this` 關鍵字。由於 JavaScript 的 object 是 prototype-based，因此設計上 function 和 object 無直接關係，到底 `this` 指向那一個 object 尋找 property，在 function 被執行時才會決定。 特點是可以借用其他 object 的 function。

很多 Array function (如 `forEach`, `map`, `reduce`), 只需要 length 和 index (0, 1), 剛好 `HTMLOptionsCollection` 也有 length 和 index (0, 1)。 因此你可以借用 Array 的 `map` function, 運用在 `HTMLOptionsCollection` 上

```js
/// map function is somethings like that
//  For real implementation, refer to: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-array.prototype.map
Array.prototype.map = function() {
  console.log("this: ", this)
  var result = []
  for (var i = 0; i < this.length; i++) {
    result.push(this[i])
  }

  return result
}

// <select>
//   <option value="valueA">optionA</option>
//   <option value="valueB">optionB</option>
// </select>

var select = document.createElement("select")
var optionA = select.options.add(new Option("optionA", "valueA"))
var optionB = select.options.add(new Option("optionB", "valueB"))

// HTMLOptionsCollection(2) [option, option, selectedIndex: 0]
// 0: option
// 1: option
// length: 2
// selectedIndex: 0
// __proto__: HTMLOptionsCollection
select.options

// <=> Array.apply(null, select.options).map(m => m.value)
// <=> Array.from(select.options).map(m => m.value)
Array.prototype.map.call(select.options, m => m.value)
// => this: HTMLOptionsCollection
// => ["valueA", "valueB"]
```

### this 意思

先定義一些 function：

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

相對應的 ES6 class 表達：

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

在以下例子中，執行 `jason.hello()` 時的 object 是 jason，當中 `this` 指向 jason 這個 object

```JavaScript
var jason = new Student()
jason.name = "Jason"
jason.hello() // => Hello, I am Jason
```

### this 問題

如你所見，一般使用情況中 `this` 會找到合適的 object，存取當中的 property。問題出自當 function 以 callback 執行時，`this` 會指向另一個 object。

以下例子中, 當 hello 以 callback 執行時, `this` 會指向 Window (Node.Js 下是 global), 而不是 jason，因此 `this.name` 是 undefined。

```JavaScript
jason.testObject = function() {
  console.log("Object context: ", this)
}
function executeCallback(hello){
  hello();
}

executeCallback(jason.hello)  // => Cannot read property 'name' of undefined
executeCallback(jason.testObject) // Object context: Window
```

在 strict mode 中 `this` 會指向 undefined

```js
jason.testObject = function() {
  // ++++ "use strict";
  "use strict"
  console.log("Object context: ", this)
}
function executeCallback(hello) {
  hello()
}

executeCallback(jason.hello) // => Cannot read property 'name' of undefined
executeCallback(jason.testObject) // Object context: undefined
```

React 的工程師也 [經常被 this 的問題困援]([https://reactjs.org/docs/hooks-intro.html])。

> In addition to making code reuse and code organization more difficult, we’ve found that classes can be a large barrier to learning React. You have to understand how this works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without unstable syntax proposals, the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.

## 解決 this 問題

明確地設定 function 的 `this` 找那個 object, 利用 `bind` 或 arrow function

### \_this

在 constructor function 中, 新增一個獨立 variable `_this`, 記錄當前的 object, 作日後參照用途。缺點是參照 `_this` 的 function 不能被定義在 prototype

```js
function Student() {
  var _this = this

  this.objectHello = function() {
    console.log("Hello, I study at " + _this.school)
  }
}
```

### bind

`bind` 指定 function 找那一個 object

**PS:** ES5, IE9 之後

運行時 `bind`：

```js
// ---- executeCallback(jason.hello)
// ++++ executeCallback(jason.hello.bind(this))
executeCallback(jason.hello.bind(this))
```

constructor `bind`：

```JavaScript
class Student {
  constructor(name) {
    this.school = "Awesome school"
    this.name = name
    // ++++ this.hello = this.hello(this)
    this.hello = this.hello(this)
  }
}
```

### Arrow function

利用 arrow function，function 會自動 `bind` 的 object.

**PS:** 不支持 IE (但你可以用 babel)

```js
class Student {
  constructor(name) {
    this.school = "Awesome school"
    this.name = name
  }
  // ---- hello()
  // ++++ hello = () => {
  hello = () => {
    console.log("Hello, I am " + this.name)
  }
}
```

## jQuery

在 jQuery 中也常常會還到這個問題, 因為 jQuery 的 callback function 不是在當前 object 下執行, `this` 不會指向當前 object

```js
function Student() {
  this.registerClick = function() {
    $("#btn").click(function() {
      alert("Hello, " + this.name) // => Hello, undefined
    })
  }
}
```

解決方法: \_this 和 arrow function

\_this 的解法:

```js
function Student() {
  this.registerClick = function() {
    // ++++ var _this = this;
    var _this = this // rembered by closure

    $("#btn").click(function() {
      // ---- alert("Hello, " + this.name);
      // ++++ alert("Hello, " + _this.name);
      alert("Hello, " + _this.name) // => Hello, jason
    })
  }
}
```

arrow function 的解法:

```js
function Student() {
  this.registerClick = function() {
    // ---- $("#btn").click(function(){
    // ++++ $("#btn").click(() => {
    $("#btn").click(() => {
      alert("Hello, " + _this.name) // => Hello, jason
    })
  }
}
```

## React

由於 JSX 關係，function 多數以 callback 執行。以下 `handleClick` 以 callback 執行，執行時會 error，因為 this 會指向 undefined。

```jsx
import React from "react"
import ReactDOM from "react-dom"

import "./styles.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 1 }
  }

  handleClick() {
    let { count } = this.state // undefined is not an object (evaluating 'this.state')
    count += 1
    this.setState({
      state: count,
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        State: {this.state.count}
        <button onClick={this.handleClick}>Click me</button>
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
```

解決方有

- 用 constructor bind, 但很麻煩, 每加一個 handler function 便要 bind 一次 ...
- 用 arrow function, 但要設定 babel 做 stage-2 才 支持 arrow function
- 用 hook

constructor bind:

```jsx
constructor (props){
  super(props)
  this.state = { count: 1 }
  this.handleClick = this.handleClick.bind(this)
}

// .....
<button onClick={this.handleClick}>Click me</button>
```

arrow function:

```jsx
handleClick = (){
  let { count } = this.state // undefined is not an object (evaluating 'this.state')
  count += 1
  this.setState({
    state: count
  })
}

// ....
<button onClick={this.handleClick}>Click me</button>
```

### Hook

Hook 這個方案比較特別, 它只支持 functional component。理念是將 state 從 component 中分離, state 經由 function 獲得。因此你不再依賴於 component, 不需要 `this`, 所以 button onClick 是 `handleClick` 而不是 `this.handleClick`

```jsx
import React, { useState } from "react"

const App = function(props) {
  const [count, setCount] = useState(1)

  const handleClick = function() {
    const newCount = count + 1
    setCount(newCount)
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      State: {this.state.count}
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
```

這個是一個優雅的解決方法, 不但將 `this` 問題解決, 令 React Component 更像一個 pure function。而且獲得 state 的 function 還可以在不同 component reuse。詳見 [youtube](https://www.youtube.com/watch?v=dpw9EHDh2bM):
