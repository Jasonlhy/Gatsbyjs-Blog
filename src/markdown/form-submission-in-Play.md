---
path: '/blog/Note/Play framework 表格提交'
title: Play framework 表格提交
date: 2016-01-21 01:46:46
description:
categories: Note
tags:
- Play
---

# 環境設定

- PlayFramework: v2.4.6
- scala : 2.11.6

先 import 以下
```scala
import play.api.data._
import play.api.data.Forms._
import play.api.data.format.Formats._
```

# 先定義一個 case class
case class 的作用是用來 encapsulate 提交的資料為一個 object, 正式名稱為 [Algebraic data type](https://en.wikipedia.org/wiki/Algebraic_data_type), 將 data 定義為不同結溝和不同 value，以下例子為 Haskell
- `data Bool = False | True`
- `data Maybe a = Nothing | Just a`

{% quote %}
an algebraic data type is a kind of composite type, i.e. a type formed by combining other types
{% endquote %}

回到 play 中，加入 `case class User(name: String, password: String)`
這定義 User 有兩個 String field, 當中有當中有 name 和 password，是否很像 c 中的 struct, 但 scala 中的 Algebraic data type 不只 case class, `Option` 也是其中一種


# 然後定義一個 Form 
定義一個 form 實現如何把 form 的 parameter blind to the case class

```scala
  val userForm = Form(
    mapping(
      "name" -> of[String],
      "password" -> of[String]
    )(User.apply)(User.unapply)
  )
```

- 表格中的 "name" 為 String
- 表格中的 "password" 為 String

## apply 和 unapply 的作用

```scala
scala> User("jason", "password")
res6: User = User(jason,password)

scala> :t User.unapply _
User => Option[(String, String)]

scala> User.unapply(User("jason", "password"))
res8: Option[(String, String)] = Some((jason,password))
```

`User.apply` 是用作創建新 instance of the User
`User.unapply` 是用作 extract 資料，用作 patten matching (match & case)

```scala
// when u is a User
// u is User(jason,password)
// User(name, password) actually calls `User.unapply(u)` which extract the data inside with return value: Some(name, password)
// therefore unapply method is called extractor pattern
u match {
  case User(name, password) => println(s"u is consist of $name and $password") 
  case _ => println("not matched")
}

// when o is Option
// o: Option[(String, String)] = Some((jason,password))
o match {
  case Some((name, password)) => println(s"u is consist of $name and $password") 
  case None => println("no user is found")
}
```

# GET Request
```scala
  def login = Action(parse.form(userForm)) { request =>
    Logger.debug("User logining")
    val user = request.body;
    Ok("Got:" + s"User name: ${user.name}, User password: ${user.password}");
  }
```

request.body 裡就是 User 了
Result (content type: text/plain)
Got: request.body.class: class controllers.UserController$User User name: jason, User password: text
## Test with Curl
```bash
curl --data http://localhost:9000/api/user/login2 \
      name=jason&password=password
```

# POST Request
```scala
 def login2 = Action(parse.urlFormEncoded) { implicit request =>
    /* Approach 1
    val body : Map[String, Seq[String]]= request.body;
    val mapping : Map[String, String] = body.mapValues(_.mkString)

    val user = userForm.bind(mapping).get;
    */

    /* Approach 2
    val user = userForm.bindFromRequest().get;
    */
    
    /* Approach 3*/
    val user = userForm.bindFromRequest(request.body).get

    // var user = userForm..get;
    Ok(s"Got User name: ${user.name}, User password: ${user.password}");
  }
```
比較麻煩 需要把 mapping 轉做 form 然後再 map 做 base class

## Test with curl
```bash
curl -H "Content-Type:application/x-www-form-urlencoded" \
 -d 'name=jason&password=password' \
http://localhost:9000/api/user/login2
```

# Nested field
可以定義一個 field 作為 `list` or `seq`
但需要跟隨一定規則定義 html `name` field

例如在文件中
```scala
val contactForm: Form[Contact] = Form(

  // Defines a mapping that will handle Contact values
  mapping(
    "firstname" -> nonEmptyText,
    "lastname" -> nonEmptyText,
    "company" -> optional(text),

    // Defines a repeated mapping
    "informations" -> seq(
      mapping(
        "label" -> nonEmptyText,
        "email" -> optional(email),
        "phones" -> list(
          text verifying pattern("""[0-9.+]+""".r, error="A valid phone number is required")
        )
      ),
      "mynickname" -> mapping(
        "primaryscl" -> text,
        "secondaryscl" -> text
      )
      (ContactInformation.apply)(ContactInformation.unapply)
    )
  )(Contact.apply)(Contact.unapply)
)
```

`phones` 在 html 的 `name` 為 informations[0].phones
```html
<input type="text" name="informations[0].phones">
(省略........)
<input type="text" name="informations[1].phones">
```

`primaryscl` 在 html 的 `name` 為 mynickname.primaryscl
```html
<input type="text" name="mynickname.primaryscl">
<input type="text" name="mynickname.secondaryscl">
```


# Reference

- [Introudction of algebraic data In Haskell  types](http://chris-taylor.github.io/blog/2013/02/10/the-algebra-of-algebraic-data-types/)
- [Introduction of Extractor patern](http://danielwestheide.com/blog/2012/11/21/the-neophytes-guide-to-scala-part-1-extractors.html)
- [Introduction of Option](http://danielwestheide.com/blog/2012/12/19/the-neophytes-guide-to-scala-part-5-the-option-type.html)