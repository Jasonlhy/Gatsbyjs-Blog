---
path: '/blog/Note/初試Scala'
title: 初試Scala
date: 2016-01-11 07:39:49
description: 
categories: Note
tags:
- Scala
---

# 感想
很複雜的語言...... 很多 feature(果然是教授的產物)

除了 method 外可以自動估算 data type
`val r = 1`
Object 像一 Java 的 static method, 不用 new object 便可以使用
最後一句預設是回傳值
很多 method 沒有 side effect

# Object type
![Overview](http://docs.scala-lang.org/resources/images/classhierarchy.img_assist_custom.png)
最頂 Any
其次 AnyVal, AnyRef

## AnyVal
AnyVal is primitive datatype in Java
底下有
- Int
- Double
- Flot
- Long
- Short
- Byte
- Char
- Boolean
- Unit (Single Value, ~Void in Java)

## AnyRef
底下有 AnyObject
- List


## Other
Null <- Nothing

# Method

## 定義
method 定義有點像 haskell, 
名在前, data type 在後
= 之後是回傳數值
`def hi(a: String, b: String) = a + b`

** 多種括號 **
`def hi(a: String)(b: String) = a + b`
可以這樣呼叫
`hi("hi")"Jason"`
or 
`hi("hi") {"jason"}`

**Accept an function**
```scala
def goodBye(f: (String) => String, b:String) = f("Jason") + b
goodBye: (f: String => String, b: String)String
```

**functional map on array**
```scala
val a = Array(1,2,3)
a.map(n => n + 10)
res2: Array[Int] = Array(11, 12, 13)
```



```scala
def test(l : String) = l match {
  case r(_, id) => s"It is a youtube with id: $id"
  case _ => "Not youtube"
}
```


## 強大的 pattern matching
相比 java 麻複的 regex......
- r 為 regex
- l 為 testing string
- _ 指不在乎

```
val r = """\[url\]https:\/\/(youtu\.be\/|www\.youtube\.com\/)(.+)\[\/url\]""".r.unanchored // anywhere pattern
val l = "[url]https://www.youtube.com/watch?v=Pt7dTw8pm30[/url]"

def test(l : String) = l match {
  case r(_, id) => s"It is a youtube with id: $id"
  case _ => "Not youtube"
}
```

# Syntactic sugar
() 可以當 { }

```
val echo = Action { request =>
  Ok("Got request [" + request + "]")
}

// is equal to 
val echo = Action.apply(request => {} )
```

還有 implicit
搭少麻煩的 variable passing
e.g. 在 play framework

```
def index = Action { implicit request =>
    val str = sayHi("Jason")
    Ok(views.html.index("Your new application is ready." + str))
  }

  private def sayHi(name: String)(implicit req: Request[AnyContent]) = name + ", you can the following content" + req.body
```

# Eco system
type safe activator 太強大了吧... 懶人傻瓜包，下載了，就可以在瀏覧器上試玩當中 scala 各種應用程式 template

sbt 不只是用來 build, 他還有 sbt-launcher.jar
sbt run 會開一個 local server 測試用...
