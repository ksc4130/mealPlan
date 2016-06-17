var express = require('express'),
    bodyParser = require('body-parser');
var http = require('http');
var port = process.env.NODE_ENV == 'p' ? 80 : 8080;

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

var foods = [];

app.get('/food', function (req, res) {
    res.json(foods.filter(function (item) {
        return !item.isDeleted;
    }));
});

app.post('/food', function (req, res) {
    console.log(req.body);
    req.body.id = foods.length + 1;
    foods.push(req.body);
    res.json(req.body);
});

app.put('/food', function (req, res) {
    var found = foods.filter(function (item) {
        return item.id === req.body.id;
    })[0];
    if(found) {
        for(var prop in req.body) {
            if(found.hasOwnProperty(prop))
                found[prop] = req.body[prop];
        }
    }
    res.end(found);
});

app.delete('/food/:foodId', function (req, res) {
    var found = foods.filter(function (item) {
        return item.id === req.params.foodId;
    })[0];
    if(found)
        found.isDeleted = true;
    res.end(200);
});

app.get('*', function (req, res) {
    res.render('layout', {
        title: 'The Club | Meal Plan App'
    });
});

app.listen(port, function () {
    console.log('server listening on port', port);
});