var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


    url = 'http://app01/rjss';



    //reuest 1:
        // - req get list of sanity check words

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        console.log('r',response);

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
        }
    })

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;