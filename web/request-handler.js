var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var qs = require('querystring');

exports.handleGet = function (req, res) {
  httpHelpers.serveAssets(res, req.url);
};

exports.handlePost = function(req, res) {
  httpHelpers.gatherData(req, function(data) {
    var results = qs.parse(data);
    var url = results.url;

    archive.isUrlInList(url, function(bool) {
      if(bool) {
        //serve up page
      } else {
        //add to list
        archive.addUrlToList(url);
        archive.downloadUrls(url);
      }
    })
  });
};
