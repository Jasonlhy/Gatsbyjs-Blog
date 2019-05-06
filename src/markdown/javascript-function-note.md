---
path: '/blog/JavaScript-function-and-this'
title: JavaScript function 和 this
date: 2019-05-07
update: 2019-05-07
description: 記錄一些 JavaScript function 用法和注意地方
categories: Programming
tags: 
- JavaScript
- React
---

## function 和 this

在 function 中存取 object 的 property，需要用 `this` 關鍵字。由於 JavaScript 的 object 是 prototype-based，因此設計上 function 和 object 之間無直接關係，到底 `this` 指向那一個 object，在 function 被執行時才會決定。

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

**ES6** class 表達

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

在以下例子中，執行 `jason.hello()` 時的 object context 是 jason，當中的 `this` 指向 jason 這個 object

```JavaScript
var jason = new Student()
json.name = "Jason"
jason.hello() // => Hello, I am Jason
```

## this 問題

如你所見，一般 OOP 使用情況中 `this` 會找到合適的 object，存取當中的 property。問題出自當 function 以 callback 執行時，`this` 會 resolve 到不同的 object。

```JavaScript
jason.testObject = function() {
  console.log("Object context: ", this)
}
function executeCallback(hello){
  hello();
}

executeCallback(jason.hello)  // => Hello, I am undefined
executeCallback(jason.testObject) // Object context: global 
```

以上例子中, 當 hello 以 callback 執行時, `this` 不是指向 jason，`this` 會指向 global，因此 `this.anme` 找不同

## 解決 this 問題

明確地設定 function 的 `this` 找那個 object, 利用 `bind` 或 arrow function

### bind

object 運行時 `bind`： 

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

利用 arrow function，function 會自動 `bind` 的 object context 為 this

```js
class Student {
  constructor(name) {
    this.school = "Awesome school"
    this.name = name
  }
  // ---- hello()
  // ++++ hello
  hello = () => {
    console.log("Hello, I am " + this.name);
  }
}
```

## 和 React 關係

因此 JSX 的關係，function 多數以 callback 形式執行，`handleClick` 以 callback 執行，執行時會 error。解決方法類似

```jsx
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor (props){
    super(props)
    this.state = { count: 1 }
  }

  handleClick() {
    let { count } = this.state // undefined is not an object (evaluating 'this.state')
    count += 1
    this.setState({
      state: count
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
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```