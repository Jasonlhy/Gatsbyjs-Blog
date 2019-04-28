---
path: '/blog/Language/Dart Comment'
title: 對 Dart 的感想
date: 2019-04-29 12:29:00
description:
categories: Language
tags:
- Dart
- Java
- JavaScript
---

# 對 Dart 的感想

感覺 Dart 介乎 JavaScript 和 Java 之間

## 對比 Java

```dart
    void main() {
      var person = new Person();
      person.firstName = 'Jason';
      person.printName();
    }


    class Person {
      String firstName;

      Person(name){
        firstName = name;
      }

      printName() {
        print(firstName);
      }
    }
```


和 Java 相似:

- class

    ```dart
    class Person
    ```

- constructor

    ```dart
    Person(name)
    ```

和 Java 不同:

- 語化對比 Java 有所簡化, 沒有 public, protected, private. If an identifier starts with an underscore (_), it’s private to its library. For details, see Libraries and visibility.
- 一個 dart file 可以有不同 public class, simplify file structure

## 對比 JavaScript

```dart
    class Deck {
        List<Card> cards = [];

        Deck() {
        var ranks = ['Ace', 'Two', 'Three', 'Four'];
        var suits = ['Diamonds', 'Hearts'];

        for (var suit in suits) {
            for (var rank in ranks) {
            var card = new Card(
                suit: suit,
                rank: rank
            );
            cards.add(card);
            }
        }
        }

        toString() {
        return cards.toString();
        }

        shuffle() {
        cards.shuffle();
        }

        cardsWithSuit(String suit) {
        return cards.where((card) => card.suit == suit);
        }

        deal(int size){
        var hand = cards.sublist(0, size);
        cards = cards.sublist(size);
        return hand;
        }

        removeCard(String suit, String rank){
        cards.removeWhere((card) => (card.suit == suit) && (card.rank == rank));
        }
    }

    class Card {
        String suit;
        String rank;

        Card({this.suit, this.rank});

        toString() {
        return "$rank of ${suit}";
        }
    }
```

和 JavaScript 相似:

- Simple syntax & expression

    ```dart
    var ranks = ['Ace', 'Two', 'Three', 'Four'];
    ```

- String template

    ```dart
    return "$rank of ${suit}";
    ```

- Arrow function

    ```dart
    cards.removeWhere((card) => (card.suit == suit) && (card.rank == rank));
    ```

和 JavaScript 不同:

- Named constructor

    ```dart
    Card({this.suit, this.rank});
    ```

- 有 Standard library
- 有 Strong type, 但有 type inference
- 有 Generic

## 其他特點

- 內置格式化工具 dmf