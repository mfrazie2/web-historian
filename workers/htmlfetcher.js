// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// var archive = require('../archive-helpers');

// archive.readListOfUrls(function(data) {
//   var storage = data.split('\n');
//   archive.downloadUrls(storage);
// });

var fs = require('fs');
fs.appendFile(__dirname + '/log.txt', 'cron job executed at' + new Date() + '\n', function(err, written, string) {})


// crontab -e
// * * * * * /working directory





// * * * * * /usr/local/bin/node ~/development/hackreactor/floobits/2016-01-web-historian-gordon-mikef/workers/htmlfetcher.js
