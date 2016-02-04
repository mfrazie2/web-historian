var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

// serve static assets from a directory
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // if it's asking for a .ico...screw it
  if (path.extname(asset) === '.ico') {
    res.end();
    return;
  }

  // referenced: http://ericsowell.com/blog/2011/5/6/serving-static-files-from-node-js
  var filePath = asset === '/' ? '/index.html' : asset;
  // decide content type ( use path.extname )
  var contentType = 'text/html';
  var extname = path.extname(filePath);

  if (extname === '.js') {
    contentType = 'text/javascript';
  } else if (extname === '.css') {
    contentType = 'text/css';
  }
  fs.readFile(archive.paths.siteAssets + filePath, function(err, content) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf-8');
    }
  });

};

exports.sendResponse = function(res, data, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(data);
};

// As you progress, keep thinking about what helper functions you can put here!
