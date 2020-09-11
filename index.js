require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const response = require("./helpers/response");
const logger = require("./helpers/logger");
const routes = require('./routes');
const middleware = require('./routes/middleware');
var zip = require('express-zip');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization, Session-ID, accesstoken, userid');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.get('/download', function (req, res) {    
    res.zip([
      { path: process.env.TEMPCSVDIR + '/' + req.query.filename, name: req.query.filename }
    ], req.query.filetype);
  
  });

app.all('/api/*/protected/*', [middleware.auth]);
app.all('/api/*/au/*', [middleware.adminauth]);
// app.all('/api/*/admin/*', [middleware.auth]);
// app.all('/api/*/protected/*', [middleware.auth]);

app.use('/', routes);

app.use((req, res) => {
    response.fail(req, res, response.message.invalid_url);
    return;
});

http.listen(process.env.API_PORT, () => {
    logger.info("APIs Started", { API_PORT: process.env.API_PORT });
});
