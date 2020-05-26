## **Language Samples**

This collection is not exhaustive -- it's just a brief introduction to the language for people who like to learn by example.

### Hello World

Every app has a ***main()*** function. To display text on the console, you can use the top-level ***print()*** function.

```dart
void main() {
  print('Hello, World!');
}
```

### Variables

Even in **type-safe** Dart code, most variables don't need explicit types, thanks to **type inference**.

```dart
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg',
};
```

### Control flow statements

```dart
if (year >= 2001) {
  print('21st century');
} else if (year >= 1901) {
  print('20th century');
}

for (var object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

while (year < 2016) {
  year += 1;
}
```

### Functions

We recommend specifying the types of each function's arguments and return value.

```dart
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

var result = fibonacci(20);
```

**anonymous functions**

* ***=>***: arrow syntax handy for functions that contain a single statement
* especially useful when passed as arguments

```dart
flybyObjects.where((name) => name.contains('turn').forEach(print));
```

You can  also use a function as an argument such as the top-level ***print()***.

### Comments

```dart
// This is a normal, one-line comment.

/// This is a documentation comment, used to document libraries,
/// classes, and their members. Tools like IDEs and dartdoc treat
/// doc comments specially.

/* Comments like these are also supported. */
```

### Imports

```dart
// importing core libraries
import 'dart:math';

// importing libraries from external packages
import 'package:test/test.dart'
   
// import files
import 'path/to/my_other_file.dart';
```

### Classes

What consist of a class? **fields, properties, constructors, methods, getter/setter method.**

```dart
class Spacecraft {
  String name;
  DateTime launchDate;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  int get launchYear =>
      launchDate?.year; // read-only non-final property

  // Method.
  void describe() {
    print('Spacecraft: $name');
    if (launchDate != null) {
      int years =
          DateTime.now().difference(launchDate).inDays ~/
              365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

You might use the Spacecraft class like this.

```dart
var voyager = Spacecraft('Voyager I', DateTime(1977, 9, 5));
voyager.describe();

var voyager3 = Spacecraft.unlaunched('Voyager III');
voyager3.describe();
```

### Inheritance

Dart has single inheritance.

```dart
class Orbiter extends Spacecraft {
  num altitude;
  Orbiter(String name, DateTime launchDate, this.altitude)
      : super(name, launchDate);
}
```

### Mixins

Mixins are a way of reusing code in multiple class hierarchies.

```dart
class Piloted {
  int astronauts = 1;
  void describeCrew() {
    print('Number of astronauts: $astronauts');
  }
}
```

To add a mixin's capabilities to a class, just extend the class with the mixin.

```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ...
}
```

PilotedCraft now has the **astronauts** field as well as the describeCrew() method.

### Interfaces and abstract classes

Dart has no ***interface*** keyword. Instead, all classes implicitly define an interface. Therefore, you can implement any class.

```dart
class MockSpaceship implements Spacecraft {
  // ...
}
```

You can create an abstract class to be extended/implemented by a concrete class. Abstract classes can contain abstract methods with empty bodies.

```dart
abstract class Describable {
  void describe();
  
  void describeWithEmphasis() {
    print('==========');
    describe();
    print('==========');
  }
}
```

### Exceptions

use ***throw*** to raise an exception.

```dart
if (astronauts == 0) {
  throw StateError('No astronauts');
}
```

To catch an exception, use a ***try*** statement with ***on*** or ***catch*** (or both).

```dart
try {
  for (var object in flybyObjects) {
    var description = await File('$object.txt').readAsString();
    print(description);
  }
} on IOException catch (e) {
  print('Could not describe object: $e');
} finally {
  flybyObjects.clear();
}
```

Note that the code above is asynchronous; ***try*** works for both synchronous code and code in an ***async*** function.

### Async

Avoid callback hell and make you code much more readable by using ***async*** and ***await***.

```dart
Future<void> printWithDelay(String message) async {
  await Future.delayed(Duration(seconds: 1));
  print(message);
}
```

The method above is equivalent to:

```dart
Future<void> printWithDelay(String message) {
  return Future.delayed(Duration(seconds: 1)).then((_){
    print(message); 
  });
}
```

As the next example shows, ***async*** and ***await*** help make asynchronous code easy to read.

```dart
Future<void> createDescriptions(Iterable<String> objects) async {
  for (var object in objects) {
    try {
      var file = File('$object.txt');
      if (await file.exists()) {
        var modified = await file.lastModified();
        print(
            'File for $object already exists. It was modified on $modified.');
        continue;
      }
      await file.create();
      await file.writeAsString('Start describing $object in this file.');
    } on IOException catch (e) {
      print('Cannot create description for $object: $e');
    }
  }
}
```

You can also use ***async****, which gives you a nice, readable way to build streams.

```dart
Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (var object in objects) {
    await Future.delayed(oneSecond);
    yield '${craft.name} flies by $object';
  }
}
```
