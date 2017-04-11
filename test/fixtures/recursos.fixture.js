
// require('pow-mongodb-fixtures').connect('dbname');
var fixtures = require('pow-mongodb-fixtures').connect('recursos-jklpq-dev', {
  host: 'mongodb://localhost/',
  port: 27017
});

var id = require('pow-mongodb-fixtures').createObjectId;

/**
 * Create fake recursos
 * @param  integer n of recursos
 * @return list 
 */
function makeRecursos(n){
    var recursos = [];
    var recurso;
    var cats = ['sanitario', 'formativo', 'juventud', 'ocio', 'social', 'laboral']

    // create n products
    for (var i = 1; i <= n; i++) {
        recurso = {
            "_id": id(),
            "image": "http://placehold.it/1920x640",
            "name": "Demo recurso " + i,
            "shortDescription": "Short Description " + i,
            "longDescription": "Long Description " + i,
            "category": cats[i % cats.length],
            "street": "Calle , 40",
            "state": "Córdoba",
            "city": "Córdoba",
            "phone": "678493201",
            "email": "email" + i + "@gmail.com",
            "website": "www.site" + i + ".com",
            "loc": { 
                "type": "Point",
                "coordinates": [n - i, i]
            },
            "status": "pending"
        }
        // add to list
        recursos.push(recurso);
    }

    return recursos;
}

//Objects
fixtures.clearAndLoad({
    recursos : makeRecursos(1)
}, function(){
    console.log('Recursos created');
});
