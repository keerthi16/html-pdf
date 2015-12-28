/**
 * Created by KeerthiNiranjan on 24/12/15.
 */
var app = require('express')(),
    swig = require('swig');

app.engine('html', swig.renderFile);

app.set('views', __dirname);
app.set('view cache', false);
swig.setDefaults({cache: false});

var JSONData = {};

app.get('/', function (req, res) {
    res.render('index.html', JSONData);
});

phantom = require('phantom');


phantom.create(function (ph) {
    ph.createPage(function (page) {

        page.open('http://localhost:1337/', function (status) {
            if (status !== 'success') {
                console.log('Something went wrong');
            } else {
                page.set("paperSize", {format: "A3", orientation: 'portrait'});
                page.render('invoice.pdf');
            }
            ph.exit();
        });
    });
});


app.listen(1337);
console.log('Application Started on http://localhost:1337/');
