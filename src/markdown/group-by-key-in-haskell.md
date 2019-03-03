---
path: '/blog/Problem/group by key in haskell'
title: group by key in haskell
date: 2016-02-26 01:28:28
description: 
categories: Problem
tags:
- Haskell
- Scala
- Programming
---

# 什麼是 Group By Key
Group By Key 就是把 Element 計算一個 key，相同 key 的 element 就放左一組內
例如 group by key by the reminder equal to 3 in Scala

```scala
val arr = Array(2, 4, 5, 6, 9, 23, 24, 25, 31, 37)
scala> val ans = arr.groupBy { n => n % 3 }
ans: scala.collection.immutable.Map[Int,Array[Int]] = Map(2 -> Array(2, 5, 23), 1 -> Array(4, 25, 31, 37), 0 -> Array(6, 9, 24))
```

# 問題
Haskell 中把 List 中的 element Group By Key 是麻煩的一件事
因為 `Data.List.groupBy` 是 linear scan 每兩個 element, 然後比較他們是否相同

```haskell
import Data.List
Prelude Data.List> groupBy (==) [1, 1, 2, 3, 1] 
[[1,1],[2],[3],[1]]
```

## 解決方法 1

List 事前需要被 sorted by key 
Scala 的例子在 Haskell 可以寫成這樣
值得注意 `sortBy` 要求 data `Ordering`, 需要用 `compare`, 不是 Bool 結果的 `>` `==` `<` 

```haskell
Prelude Data.List> let allInOne = groupBy (\x y -> (x `mod` 3) == (y `mod` 3)) . sortBy (\x y -> compare (x `mod` 3) (y `mod` 3))
Prelude Data.List> allInOne [2, 4, 5, 6, 9, 23, 24, 25, 31, 37]
[[6,9,24],[4,25,31,37],[2,5,23]]
```

## 解決方法 2

[一個 package](https://hackage.haskell.org/package/utility-ht-0.0.11/docs/Data-List-Key.html) 解決這個問題, 當中的 `groupBy` 是 scala 中的 `groupByKey 但 return 一個 List

**安裝**

```bash
> cabal install utility-ht
> ......
> ghci
```

**例子**

```haskell
Prelude> import Data.List.HT
Prelude Data.List.HT> let a = [2, 4, 5, 6, 9, 23, 24, 25, 31, 37]
Prelude Data.List.HT> groupBy (\x y -> x `mod` 3 == y `mod` 3 )
[[2],[4],[5],[6,9],[23],[24],[25,31,37]]
```
