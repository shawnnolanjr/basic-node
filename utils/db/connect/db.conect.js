const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');
const uri = dbConfig.mongoConfigs.db.uri;
const dbName = dbConfig.mongoConfigs.db.name;

class DbConnect {
	static mongoConnect(callback) {
		if (!mongoose.connection.name) {
			mongoose.connect(uri + dbName);
			const db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error'));
			db.once('open', function (err, resp) {
				if (err) throw Error(err);
				callback();
			});
		} else {
			callback();
		}
	}
}

module.exports = DbConnect;