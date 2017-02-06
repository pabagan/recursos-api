# Express REST API starter

## Development

App and browser reload Hot reloading with:

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
* [MongoDB](http://mongodb.org).
* [Mongoose](http://mongoosejs.com).

### Create

```bash
# handlebars views
express express-api
```

## Deploy Heroku

* Install [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

```bash
# Create heroku app
heroku create appName
# Open folder of local git and run
git push heroku master
# Check logs
heroku logs --tail
# Run Heroku local
heroku local web
# Install addons
heroku addons:create papertrail
# List APP Addons
heroku addons
# Enter console
heroku run node
# Define env variables
heroku config:set TIMES=2
heroku config # view config
```

#### MongoLab Heroku
Integrate [MongoLab with Heroku](https://devcenter.heroku.com/articles/mongolab) guide.

```bash
heroku addons:create mongolab
```

#### Deploy Heroku
```bash
# update local repo 
git add .
git commit -m "Demo"

# deploy to Heroku
git push heroku master
heroku open cool
```

## Testing
At `/tests` some TDD modules using:

* [Mocha](https://mochajs.org/).
* [Chai](http://chaijs.com/).
* [Chai Http](https://github.com/chaijs/chai-http). to test REST endpoints.

```bash
# Test all
NODE_ENV=test mocha --recursive
# Test single file
NODE_ENV=test mocha test/users.tests.js 
```
