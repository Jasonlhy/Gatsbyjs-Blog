---
path: "/blog/Emacs-and-Spacemacs"
date: "2018-01-07"
title: "Emacs and Spacemacs"
---

# 簡介
曾經是 vim 的重度使用者, 求學時期都在用 11 吋的 macbook air, 不用 mouse 的感覺實在太爽。閒時在研究 emacs 的 org mode, 但 emacs 本身的 config 比較麻煩。由於本人比較懶, 而且 spacemacs 的賣點是 evil mode, 外表又不錯, 因此決定用他取代原來的 emacs。

## 安裝 emacs
spacemacs 是安裝在 `.emacs.d` 的設定檔案, 由於 spacemacs 是 emacs 的 [設定 file](https://www.gnu.org/software/emacs/manual/html_node/emacs/Init-File.html), 要先安裝 emacs。

> When Emacs is started, it normally tries to load a Lisp program from an initialization file, or init file for short. This file, if it exists, specifies how to initialize Emacs for you. Emacs looks for your init file using the filenames ~/.emacs, ~/.emacs.el, or ~/.emacs.d/init.el; you can choose to use any one of these three names (see Find Init). Here, ~/ stands for your home directory.

1. 從 [這裡](http://emacsbinw64.sourceforge.net) 下載 emacs window 版本 (GNU 有 window 的 build 版本, 夠這個比較 stable)
2。 解壓
3。 執行請按 `bin\runemacs.exe`

## 安裝 Spacemacs

**[EMACS_DIRECTORY]** 在不同系統有不同位置

- Mac 是 `~`
- Windows 是 `$HOME\AppData\Roaming`, 例如 : `C:\Users\jason\AppData\Roaming`

1. `git clone https://github.com/syl20bnr/spacemacs` **[EMACS_DIRECTORY]**.emacs.d
2. 執行剛才安裝的 emacs

# Org Mode

當初看到這個功能覺得很 geek, 但用起來不錯。
[作者在 google 的簡介影片](https://www.youtube.com/watch?v=oJTwQvgfgMM)

## 標題

例子:
```
* Heading1
** Heading 2
```

- `Tab`: 摺起或展開 cursor 下的 heading 內容
- `Shift+Tab`: 摺起或展開 ** 所有 ** heading 內容
- `Ctrl+Enter`: 新增相同層次的 heading

## 清單
例子:
```
* TODO Task 1
- [ ] Unfinished Item
- [X] Finished Item
```

- `Ctrl+c Ctrl+c`: 轉換 [ ] 和 [X]
- `Ctrl+c Ctrl+t`: 轉換 TODO 和 DONE

## 列表
例子:

```
1) [ ] Item 1
2) [ ] Item 5
3) [ ] Item 4

1. [ ] Item 1
2. [ ] Item 5
3. [ ] Item 4

- Item 1
- Item 5
- Item 4
```

- `Shift + 左右 `: 轉換不同類型的列表
- `Alt+Enter`: 新增相同層次的 item


## Table

例子:
```
| Student | Age |
|---------+-----|
| Jason   |  20 |
```
- `Tab`: 下一個方格
- `Shift-Table`: 上一個方格
- `Ctrl+c Ctrl+c`: 對齊方格

# 指令
- `SPC`: 一些用空白鍵做 leader key 的 command
-`turn-on-evil-mode`: 切換至 evil mode
-`turn-off-evil-mode`: 切換至 emacs mode


# 常用 emacs 按鍵 
## 一般
- `Ctrl+x Ctrl+f`: 尋找 File
- `Ctrl+g`: 取消 command
- `Ctrl+x 左右 `: 前 / 後一個 buffer
- `Ctrl+x 4 0`: 消除選擇 window 以外的 window

## 文字
- `Alt+w`: 複制
- `Ctrl+w`: 剪下
- `Ctrl+y`: 貼上

- `Ctrl+n`: 下一行
- `Ctrl+p`: 上一行
- `Alt + 左右 ` 或者 `Alter+b 或 f`: 移動 cursor 後 / 前一個字
- `Ctrl + 左右 ` 或者 `Alter+b 或 f`: 移動 cursor 後 / 前一個字元

- `Ctrl+k`:delete cursor 前面全部文字
- `Alt+Backspace`: 刪除 cursor 後一個字 (包括空白和一些符號)
- `Alt+d`: 刪除 cursor 前一個 word
