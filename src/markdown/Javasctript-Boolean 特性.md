---
path: "/blog/JavaScript-Boolean 特性"
date: "2018-03-05"
update: 2019-05-05
title: JavaScript-Boolean 特性
tags:
- JavaScript
---

# 事發

之前其中一個 [hungry delete commit](https://github.com/Jasonlhy/VSCode-Hungry-Delete/commit/af8312a76acb73b236bf97fd414eb2ed820e54c9)

```javascript
if (!columnNumber){
    columnNumber = this.length;
}
```

因為 Javascript 的 boolean 特性由致一個 bug。原意想用 `if (!columnNumber)` 判斷是否 undefined, 因為 `columnNumber` 是一個 optional number。但當 `columnNumber` 為 0 時,`(!columnNumber)` 為 **true**, 會計算錯誤的結果。

解決方法: 

使用 typeof 就好了。

```javascript
if (typeof columnNumber === 'undefined') {
    columnNumber = this.length;
}
```

## Boolean 特性

JavaScript 判斷 boolean expression 時會自動轉換類型, [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy) 會轉為 true, 而 [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 會轉為 false。

非 [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 就是 [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy), 值得注意: 以下幾種也是 **Truthy**

```
- {}
- []
- Infinity
- -Infinity
```

而 [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 只有以下幾種:

```
- false
- null
- undefined
- 0
- NaN
- ''-""
```

## 轉變為 boolean

一些 framework 會指明 boolean 的 value, 例如 `vue.js`, 可以利由 `!!` 把 boolean expresson 轉換為 boolean value. 

```js
!!([]) // true
!!(1) // true
!!(undefined) // false
!!(0) // false
```

又或者為用 Boolean

```js
Boolean([]) // true
Boolean(1) // true
Boolean(undefined) // false
Boolean(0) // false
```
