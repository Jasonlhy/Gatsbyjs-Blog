---
path: '/blog/Note/Play Testing and Json'
title: Play Testing and Json
date: 2016-05-31 01:27:25
description:
categories: Note
tags:
- Play
- Scala
---

## 版本

個人覺得 Play 的文件比較亂。在這裡先記下簡約 play testing 的用法

十分重要, 因為各個版本的 api 可以差別很大...
- Play version: 2.4.6
- Scala version: 2.1.0

## Override configuration

因為我只預設用一個 database。。。
```scala
trait DAOTrait {
    implicit val fakeApp = new FakeApplication(additionalConfiguration = Map("db.default.username" -> "YOURUSERNAME",
        "db.default.url" -> "jdbc:mysql://URDATABASE",
        "db.default.password" -> "YOURPASSWORD")
    )
}
```

## Unit testing

因為 anorm database 要有 execution context 所以要先用 step 啟動 application

```scala
import play.api.test.PlaySpecification
import DAO.UserDAO

import play.api._
import play.api.test._
import play.api.test.Helpers._

class UserDAOSpec extends PlaySpecification with DAOTrait {


  val testUserEmail = "test@hotmail.com"
  val testUserPassword = "1234"

  step(Play.start(fakeApp))

  "The User DAO" should {
    "register" in {
      val id = UserDAO.register(testUserEmail, testUserPassword);
      (id.get > 0) must beTrue
    }
    "isExist" in {
      UserDAO.isExist(testUserEmail) must beTrue
      UserDAO.isExist("this is not a email") must beFalse
    }
    "validate" in {
      UserDAO.validate(testUserEmail, testUserPassword) must beTrue
      UserDAO.validate(testUserEmail, "9999") must beFalse
    }
    "delete" in {
      UserDAO.delete(testUserEmail) must beTrue
    }

  }

  step(Play.stop(fakeApp))
}
```

## Controller testing

測試 json post request
另外寫法 `val request = FakeRequest(POST, "/").withJsonBody(Json.parse("""{"field":"value"}"""))`
body 請放 JsValue, 不要放 String
`contentType` 和 `contentAsJson` 在 play.api.test.Helpers
如果你只需測試 routing, 你不需要用 step 啟動 applicaton, 整個 controller 的 method 不會執行
return 的可以是 Future[Result]

```scala
import controllers.RecipeController
import play.api.Logger
import play.api.libs.json._

import play.api._
import play.api.test._
import play.api.test.Helpers._

class RecipeControllerSpec extends PlaySpecification with DAOTrait{

  step(Play.start(fakeApp))

  "Example Page#index" should {
    "should be valid" in {

      var jsonHeader = Seq(("Content-Type", "application/json; charset=utf-8"))
      val jsValue = Json.obj("ingredients" -> Json.arr("牛奶", "奶"))
      val controller = new RecipeController()
      val fakeRequest = FakeRequest(Helpers.POST, "api/user/searchIngredient", new FakeHeaders(jsonHeader), jsValue);

      val result  = controller.searchIngredient().apply(fakeRequest)
      val ct = contentType(result)
      ct must equalTo(Some("application/json"))
//      Logger.debug("really content type" + contentAsString(result))
      val jsContent : JsValue = contentAsJson(result)
      jsContent.as[JsArray].value.size must equalTo(6)
    }
  }

  step(Play.stop(fakeApp))
}
```


## JSON Read & Write

play framework 設計 JSON 要 read 進一個 model & 或由一個 model write 成 JSON
如果 json 的數目跟 model attribute 不同比較麻煩

把一個 value 變做 object, 利用 scala 的 map pattern 提取 value
{% codeblock %}
implicit val ingRead: Reads[IngIdWrap] = (JsPath \ "ingId").read[Int].map(IngIdWrap.apply);
{% endcodeblock %}


**Read 的 model attribute 比 JSON value 多**

UserRecipeRating 是 (Int, Int, Int)
read 的 read combinator 會產生 `(Int, Int)`
寫一個 function 接收 `(Int, Int)` 變成 UserRecipeRating

```scala
val applyJson = (recipeId: Int, rating: Int) => UserRecipeRating(0, recipeId, rating);
implicit val read : Reads[UserRecipeRating] = (
    (JsPath \ "recipeId").read[Int] and
    (JsPath \ "rating").read[Int]
  )(applyJson)
```


**Write 的 model attribute 比 JSON value 多**

反過來, 把一個 UserRecipeRating 寫兩個 Int, write combinator 需要 `(Int, Int)`
可以寫一個 function 接收一個 UserRecipeRating 變作 `(Int, Int)`

```scala
val writeJson = (obj: UserRecipeRating) => (obj.recipeId , obj.rating)
implicit val write : Writes[Write] = (
    (JsPath \ "recipeId").write[Int] and
    (JsPath \ "rating").write[Int]
  )(writeJson)
```

## Reference

[JSON Basic](https://www.playframework.com/documentation/2.4.x/ScalaJson#Traversing-a-JsValue-structure)
[Helper Method](https://www.playframework.com/documentation/2.4.x/api/scala/index.html#play.api.test.Helpers$)
