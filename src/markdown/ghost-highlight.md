---
path: "/blog/Ghost-Highlight"
date: "2017-07-01"
title: "Ghost Highlight"
tags:
- Ghost
---

# 簡介

利用 `Prism.js` 和 Code Injection 能輕易為 Ghost 加上 syntax highlight。

1. 首先在 https://cdnjs.com 搜尋 prism
2. 複制當中的 css 和 js 連結
3. 在 Code Injection header 貼上 css，在 footber 貼上 js

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.min.css" rel="stylesheet" />
```

4. 在 code block 上加上語言 ID 作識別，語言 ID 可以在 [這裡找](http://prismjs.com/#languages-list)。

```markdown
```javascript
if (!columnNumber){
    columnNumber = this.length;
}
``
```

基本的 highlight 只支持 markup，css，clike，和 javascript。如果要支持更多語言，要加入更多的 js。

# 鳴謝
[Adding Syntax Highlighting to your Ghost blog the easy way (5 minutes max)](http://blog.toast38coza.me/adding-syntax-highlighting-to-your-ghost-blog-the-easy-way/)
