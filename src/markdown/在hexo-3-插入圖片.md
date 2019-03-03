---
path: '/blog/Problem/在hexo 3 插入圖片'
title: 在hexo 3 插入圖片
date: 2015-10-20 05:33:40
description: 在hexo 3 利用asset folder 插入圖片遇到的問題
categories: Problem
tags:
- Hexo
---

# 首要條件
hexo 3 支持 asset folder
只要把圖片放左 post 同層的同名字 folder, 然用利用 asset_img 就能連結到圖片。

文件結構如下圖：
{% asset_img 'show.png' %}

在 post 中加入以下程式碼：
```
{% asset_img 'messy.png' %}
{% asset_img 'source.png' %}
```

------

# 遇到的問題
[官方文件](https://hexo.io/docs/asset-folders.html) 有少許誤導，post_asset_folder 作用為開新 post 時自動開同名 folder
但如果_config.yml 中的 post_asset_folder 設定為 false, 一定會插入圖片失敗。
因為 hexo generate 不會把圖片和 post 一起放在 public 的 folder 內

# 解決方法
在_config.yml 把 post_asset_folder 設定為 true
