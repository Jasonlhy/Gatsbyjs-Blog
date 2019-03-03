---
path: "/blog/JavaScript-Trick"
date: "2018-03-05"
title: "JavaScript-Trick"
---

# 事發

之前其中一個 [hungry delete commit](https://github.com/Jasonlhy/VSCode-Hungry-Delete/commit/af8312a76acb73b236bf97fd414eb2ed820e54c9)

```javascript
if (!columnNumber){
    columnNumber = this.length;
}
```

因為 Javascript 的 Boolean 特性由致一個 bug。原意要想用 `if (!columnNumber)` 判斷是否 undefined，因為 `columnNumber` 是一個 optional number。但當 `columnNumber` 為 0 時，`(!columnNumber)` 為 **true**，會 return 錯誤的計算結果。

**解決方法**

使用 typeof 就好了。

```javascript
if (typeof columnNumber === 'undefined') {
    columnNumber = this.length;
}
```

# Boolean 特性

JavaScript 判斷 Boolean Expression 時會自動轉換類型，[Truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy) 會轉為 true，而 [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 會轉為 false。

非 [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 的就是 [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy) ，特別有：

```
- {}
- []
- Infinity
- -Infinity
```

而 [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 只有以下幾種：

```
- false
- null
- undefined
- 0
- NaN
- ''
- ""
```