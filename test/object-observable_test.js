var assert = require("assert"),
    expect = require("expect.js"),
    _ = require("lodash"),
    Observable = require("../lib/Observable");

function ConcreteObservable(observed){
    this.init(observed);
}
ConcreteObservable.prototype = new Observable();

describe("Observable", function () {

    it("is defined", function () {
        expect(Observable).to.be.an('function');
    });

    it("emit events", function () {
        var observableFattura = new ConcreteObservable({righe: []});
        expect(observableFattura.events).to.be.an('object');
    });

    it("events are separated between instance", function () {
        var observableFattura1 = new ConcreteObservable({righe: []});
        var observableFattura2 = new ConcreteObservable({righe: []});
        var results = "";
        observableFattura1.events.on('anEvent', function (arg) {
            results += arg;
        });
        observableFattura2.events.on('anEvent', function (arg) {
            results += arg;
        });

        observableFattura1.events.emit('anEvent', 'A');
        observableFattura2.events.emit('anEvent', 'B');


        expect(results).to.be.equal('AB');
    });


    describe("set function", function () {

        it("emit changed event", function (done) {
            var ft = new ConcreteObservable({
                answer: null,
                righe: []
            });
            ft.events.on('changed', function (propertyName, value) {
                expect(propertyName).to.be.equal('answer');
                expect(value).to.be.equal(42);
                expect(ft.observed.answer).to.be.equal(42);
                done();
            });
            ft.answer= 42;

        });

    });

    describe("get function", function () {

        it("return property value", function () {
            var ft = new ConcreteObservable({
                answer: 42

            });


            expect(ft.observed.answer).to.be.equal(42);
            expect(ft.answer).to.be.equal(42);

        });

    });


});
