let mongo = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let dbConfig = require('../db.config');
let url = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;
let UserSchema = require('../schemas/UsersSchema');

class User {
	static mongoConnect(callback) {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			let dbo = db.db(dbName);
			const collection = dbo.collection('users');
			callback(err, UserSchema);
		});
	}
	static CreateUser(data, callback) {
		this.mongoConnect(function(err, UserSchema){
			if (err) throw err;
            UserSchema.create(data, function(err, resp){
				callback(err, resp);
			});
		});
	};
}

module.exports = User;
