var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var bodyParser  = require('body-parser');
var _ = require('underscore');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var rjss, sanityChecksArr, sanityChecksApiObj;

var findSanityChecksInResponse = function(){

    sanityChecksApiObj = {
        date:Date.now(),
        sanityChecks:[]
    };

    _.each(sanityChecksArr,function(item){
        var result = {'item':item};
        result.found = rjss.indexOf(item) !== -1;
        sanityChecksApiObj.sanityChecks.push(result)
    });

    console.log(sanityChecksApiObj)

    postResult();

};

function getSanityChecksApiObj(){
    return sanityChecksApiObj;
}

var postResult = function(){

    console.log('---- - - ',getSanityChecksApiObj())
    

    request.post({
        url:     'https://a99.herokuapp.com/canary',
        form:    sanityChecksApiObj
    }, function(error, response, body){
        console.log(body);
    });



};

var runThis = function() {

    request('http://app01/rjss', function(error, response, html){

        rjss = JSON.stringify(response.body);

        if(!error) {

            request('https://a99.herokuapp.com/sanitychecks', function(error, response, html){

                if(!error) {

                    var yo = JSON.parse(response.body)[0]['sanityCheck'];
                    sanityChecksArr = yo.split('@@@')
                    findSanityChecksInResponse()

                }
            });
        }
    });
};

runThis();

var myVar = setInterval(function(){ myTimer() }, 60000);
function myTimer() {
    runThis();
}


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;