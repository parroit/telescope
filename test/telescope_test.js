'use strict';

var expect = require("expect.js");
var telescope = require("../lib/telescope");


describe("telescope", function () {
    it("is defined", function () {
        expect(telescope).to.be.an('object');
    });
});
