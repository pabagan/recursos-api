# TDD Express REST API

## Development

App with hot reloading with:
* [Nodemon](https://nodemon.io/).
* [Browsersync](https://browsersync.io/).
* [Gulp](http://gulpjs.com/).

```bash
# start with 
gulp
```


## Server side
* [ExpressJS](http://expressjs.com/es/).
* [Express Generator](http://expressjs.com/es/starter/generator.html) scaffolding.
* [Pug(previous JADE)](https://pugjs.org/api/getting-started.html).
* [MongoDB](http://mongodb.org).
* [Mongoose](http://mongoosejs.com).

### Create

```bash
# handlebars views
express express-api
```

## Testing
At `/tests` some TDD modules using:

* [Mocha](https://mochajs.org/).
* [Chai](http://chaijs.com/).
* [Chai Http](https://github.com/chaijs/chai-http) to test REST endpoints.

```bash
# Test all
NODE_ENV=test mocha --recursive
# Test single file
NODE_ENV=test mocha test/users.tests.js 

# better with npm
npm test
```
