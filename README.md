# telescope
[![Build Status](https://secure.travis-ci.org/parroit/telescope.png?branch=master)](http://travis-ci.org/parroit/telescope)  [![Npm module](https://badge.fury.io/js/telescope.png)](https://npmjs.org/package/telescope) [![Code Climate](https://codeclimate.com/github/parroit/telescope.png)](https://codeclimate.com/github/parroit/telescope)

An observable module for objects and arrays

## Getting Started
Install the module with: `npm install telescope --save`

### To create an array observable:

```javascript
makeArrayObservable = require("telescope").array;

var tabs = [],
    observableTabs = makeArrayObservable();

observableTabs.init(tabs);
```

`observableTabs` is an array that emits events on push or remove of items.

When you push or remove items to observableTabs, they are pushed or removed from tabs array,
plus a "changed" event is emitted.

Pushing method create also an object observable on pushed item,
that is returned from the function.


### To create an object observable:

```javascript
    var Observable = require("telescope").object;

    function ConcreteObservable(observed){
        this.init(observed);
    }
    ConcreteObservable.prototype = new Observable();

    var anObject = {
       field1:1,
       field2:2
    };
    var observable = new ConcreteObservable(anObject);
```

`observable` is now an object that wrap `anObject` and create a
property for each of its property.

These property set and get values of corresponding `anObject` property,
emitting "changed" events when property values are set.

The init pattern allow to setup derived property that
are set on main property change, e.g. sum, totals, etc.


## Examples
See test folder for more usage exmaples

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.


## License
Copyright (c) 2013 parroit  
Licensed under the MIT license.
