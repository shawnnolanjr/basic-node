'use strict';
let app = require('../../../app');
let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 3001;
app.mongoConfigs = {
    name: '',
    version: '0',
    env: env,
    port: port,
    db: {
        uri: '',
        name: env,
        collection: env
    }
};
module.exports = app;