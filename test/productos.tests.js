var assert = require("assert");
var request = require("request");

//require("./bin/www");
var app = require("../app");

var server = app.listen(0);
var port = server.address().port;

describe("Server", function() {
    it("responds with JSON message 'Hello, World!' at the root", function(done) {
        request("http://localhost:" + port + "/", function(err, response, body) {
            if (err) done(err);

            var payload = JSON.parse(body);
            assert.equal(payload.message, "Hello, World!");

            done();
        });
    });
});

describe("My feature", function() {
    describe("subfeature 1", function() {
        it("does one thing", function() {
        });

        it("does another thing", function() {
        });
    });

    describe("subfeature 2", function() {
        it("does one thing", function() {
        });

        it("does another thing", function() {
        });
    });
});