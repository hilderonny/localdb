var express = require('express');

var localdb = {

    init: async function (app) {

        app.use('/static/localdb', express.static(__dirname + '/public'));

    }

};

module.exports = localdb;