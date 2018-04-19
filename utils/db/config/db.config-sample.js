'use strict';
let app = require('../../../app');
let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 3001;
app.mongoConfigs = {
    name: 'rest-api',
    version: '0.0.1',
    env: env,
    port: port,
    db: {
        uri: 'mongodb://127.0.0.1:27017/',
        name: env,
        collection: env
    }
};
module.exports = app;