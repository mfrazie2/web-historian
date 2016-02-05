var fs = require('fs');
var path = require('path');

var _ = require('underscore');
var request = require('request');
var uuid = require('node-uuid');

var httpHelpers = require('../web/http-helpers.js');

var storage = {};

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(callback){
  var result = '';
  fs.readFile(paths.list, 'utf-8', function(err, data) {
    callback(data);
  });
};

exports.isUrlInList = isUrlInList = function(url, callback){
  // readListOfUrls
  readListOfUrls(function(data) {
    var list = data.split('\n');
    var bool = list.indexOf(url) >= 0 ? true : false;
    callback(bool);
  });
};


exports.addUrlToList = addUrlToList = function(url, callback){
  fs.appendFile(paths.list, url + '\n', 'utf-8', function(err) {
    if (err) {
      console.log('Could not append to file: ', err);
      return;
    }
    if(!!callback) {
      callback();
    }
  })
};

exports.isUrlArchived = isUrlArchived = function(url){
  if (storage[url]) {
    return true;
  }
  return false;
};

exports.downloadUrls = downloadUrls = function(urls){
  _.each(urls, function(url){
    request(url, function(err, res, data) {
      var fileName = uuid.v4();
      storage[url] = fileName;
      if (!err && res.statusCode === 200) {
        fs.writeFile(paths.archivedSites + '/' + fileName, data, 'utf-8', function(err, written, string) {
          if (err) {
            console.log('Could not write: ', err);
          }
          console.log(written);
          console.log(string);
        })
      } else if (err) {
        console.log('REQUEST FAILED: ', err);
      }
    });
  });
};

exports.serveAsset = serveAsset = function(res, url, callback) {
  var fileName = storage[url];
  httpHelpers.serveAssets(res, '/' + fileName, 'archivedSites', function(content) {
    callback(content);
  });
};
