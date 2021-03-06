// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!  
  push: {
    ios: [
      {
        pfx: 'cloud/BeautifulDietDev.p12',
        bundleId: 'Is.BeautifulDiet',
        production: false // Dev
      },
      {
        pfx: 'cloud/BeautifulDietPro.p12',
        bundleId: 'Is.BeautifulDiet',  
        production: true // Prod
      }
    ]
  },  
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  fileKey: process.env.FILE_KEY || '',
  restAPIKey: process.env.REST_API_KEY || '',
  facebookAppIds: process.env.FACEBOOK_APP_IDS || '',
  oauth: {
   twitter: {
     consumer_key: process.env.TWITTER_CONSUMER_KEY || '', // REQUIRED
     consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '', // REQUIRED
   },
   facebook: {
     appIds: process.env.FACEBOOK_APP_IDS || ''
   }
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Config static middleware for assets
app.use('/static', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
