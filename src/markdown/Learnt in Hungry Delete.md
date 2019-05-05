---
path: "/blog/Learnt in Hungry Delete"
date: 2017-03-05
title: "Hungry Delete 中學到的"
tags:
- VSCode
- TypeScript
---

## 簡介

Visual Studio code，簡稱 vscode，是微軟的 open source editor，由 `Node.js` 寫成，支持主流的程式語言。其定位為 IDE 和 Plain Text Editor 之間，所以當中設計巳經包含 `Debugger API` 等等。

Hungry Delete 是一個 vscode 的 extension, 由 typescript 寫成。有興趣的朋友可以從 [Marketplace](https://marketplace.visualstudio.com/items?itemName=jasonlhy.hungry-delete) 下載。設計初衷是減少按 backspace 的次數，暫時的主要功能有 Hungry Delete 和 Smart Backspace。


**Hungry Delete**

按下 `ctrl+backspace`

![hungry-delete](https://github.com/Jasonlhy/VSCode-Hungry-Delete/raw/master/images/after.gif)

**Smart Backspace**

控下 `backspace`

![smart-backspace](https://github.com/Jasonlhy/VSCode-Hungry-Delete/raw/master/images/after_smartbackspace.gif)


## VScode API 設計

### 大致結構

window 和 workspace 是其中兩個主要 namespace，為最外層的 API, 前者負責管理 editors 和 showMessage，後者負責管理 file systems 和 configuration。

每個 tab 為一個 TextEditor。負責管理 selection(s) 及 修改內容 `insert`, `delete`, `replace`。

每個 TextEditor tab 只可以打開一個檔案，檔案內容為 TextDocument。

TextDocument 即管理檔案內容

- 多少行數 `lineCount`
- EOL Character `eol`
- 檔案是什麼語言 `languageId`
- 提取某一行 `lineAt` 等等。

每一行稱為 TextLine 負責

- 該行的範圍 `range` 和 `rangeIncludingLineBreak`
- 第一個非空白的字元 `firstNonWhitespaceCharacterIndex`
- 是不是空白行 `isEmptyOrWhitespace`
- 及內容 `string`

### Position 

Position 是其中一個共用的結構，記錄 Row 和 Column

TextEditor 的 selection 有 `start`, `end`, `anchor` 和 `reversed` ，前三者全是 Position。

- 當 selection 左至右時, `start` = `anchor`, `reversed` = false
- 當 selection 右至左時, `start` < `anchor`, `reversed` = true

TextLine 內 Range 的 `start`, `end` 也是 Position。
