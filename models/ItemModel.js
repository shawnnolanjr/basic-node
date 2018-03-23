let mongo = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let dbConfig = require('../db.config');
let url = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;
let dbCollection = dbConfig.mongoConfigs.db.collection;

class Item {
	static mongoConnect(callback) {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			let dbo = db.db(dbName);
			const collection = dbo.collection(dbCollection);
			callback(err, collection);
		});
	}
	static findDocument(id, callback) {
		let oId = new mongo.ObjectID(id);
		this.mongoConnect(function(err, collection){
			if (err) throw err;
			collection.findOne({_id: oId}, function(err, docs){
				if(err) throw err;
				callback(err, docs);
			});
		});
	};
}

module.exports = Item;
