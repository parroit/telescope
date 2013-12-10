var _ = require("lodash"),
    Observable = require("./Observable"),
    EventEmitter = require("events").EventEmitter;

function makeArrayObservable() {
    /*Object.defineProperty(this,"length",{
        get: function(){
            return this.observed.length;
        },
        enumerable: true,
        configurable: false
    })*/
    return enhancheArray([]);
}

module.exports = makeArrayObservable;

function enhancheArray(array){

    //noinspection JSAccessibilityCheck
    array.init = function (observed) {
        var _this = this;
        _this.observed = observed;
        observed.forEach(function(item){
            _this.originalPush(_this.buildObservableRow(item));
        });

        _this.events = new EventEmitter();
    };


    array.originalPush = array.push;
    array.push = function (row) {
        var observableRow = this.buildObservableRow(row);
        this.originalPush(observableRow);
        this.observed.push(row);
        this.events.emit("changed");
        return observableRow;
    };


    array.remove = function (idx) {
        this.observed.splice(idx,1);
        this.splice(idx,1);
        this.events.emit("changed");
    };




    array.get = function (idx) {
        return this[idx];
    };


    array.buildObservableRow = function (row) {
        var observable = new Observable();
        observable.init(row);
        return observable;
    };

    return array;
}

